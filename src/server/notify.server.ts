import { randomUUID } from 'node:crypto'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import type { Booking } from './db/schema'

let sesClient: SESClient | undefined

function base64Lines(value: string): string {
  return (
    Buffer.from(value, 'utf8')
      .toString('base64')
      .match(/.{1,76}/g)
      ?.join('\r\n') ?? ''
  )
}

function encodedSubject(value: string): string {
  const chunks: string[] = []
  let chunk = ''
  for (const character of value) {
    if (Buffer.byteLength(chunk + character, 'utf8') > 45) {
      chunks.push(chunk)
      chunk = ''
    }
    chunk += character
  }
  if (chunk) chunks.push(chunk)
  return chunks
    .map((part) => `=?UTF-8?B?${Buffer.from(part).toString('base64')}?=`)
    .join('\r\n ')
}

function calendarText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

// Fold content lines by UTF-8 octets, as required by iCalendar.
function foldCalendarLine(line: string): string {
  const lines: string[] = []
  let current = ''
  for (const character of line) {
    if (Buffer.byteLength(current + character, 'utf8') > 75) {
      lines.push(current)
      current = ' '
    }
    current += character
  }
  lines.push(current)
  return lines.join('\r\n')
}

/** Called after persistence, outside the storage retry loop. */
export async function notifyDoctorOfBooking(booking: Booking): Promise<void> {
  const from = process.env.FROM_EMAIL?.trim()
  const to = process.env.NOTIFICATION_EMAIL?.trim()

  if (!from || !to || /[\r\n]/.test(from + to)) {
    throw new Error(
      'Booking notifications require valid FROM_EMAIL and NOTIFICATION_EMAIL',
    )
  }

  const details = [
    `Patient: ${booking.patientName}`,
    `Phone: ${booking.phone}`,
    booking.email ? `Email: ${booking.email}` : null,
    `Category: ${booking.conditionCategory.replace(/_/g, ' ')}`,
    '',
    'Patient’s message:',
    booking.reason,
  ]
    .filter((line) => line !== null)
    .join('\n')
  const date = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${booking.appointmentDate}T12:00:00+05:30`))
  const body = [
    'A new appointment has been booked.',
    '',
    `Booking #${booking.id}`,
    `${date}`,
    `${booking.slotStart}–${booking.slotEnd} (India time)`,
    '',
    details,
    '',
    'The attached calendar invitation contains the appointment details.',
  ].join('\n')
  const utcTime = (time: string) =>
    new Date(`${booking.appointmentDate}T${time}:00+05:30`)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')
  const calendar =
    [
      'BEGIN:VCALENDAR',
      'PRODID:-//Bhanu Website//Booking//EN',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:booking-${booking.id}@${from.split('@').pop()}`,
      `DTSTAMP:${new Date()
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '')}`,
      `DTSTART:${utcTime(booking.slotStart)}`,
      `DTEND:${utcTime(booking.slotEnd)}`,
      `SUMMARY:${calendarText(`Appointment: ${booking.patientName}`)}`,
      `DESCRIPTION:${calendarText(details)}`,
      `ORGANIZER:mailto:${from}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${to}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .map(foldCalendarLine)
      .join('\r\n') + '\r\n'
  const boundary = `booking-${randomUUID()}`
  const alternative = `alternative-${randomUUID()}`
  const subject = `New appointment #${booking.id}: ${booking.patientName.replace(/[\r\n]+/g, ' ')} — ${booking.appointmentDate}`
  const raw = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodedSubject(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: multipart/alternative; boundary="${alternative}"`,
    '',
    `--${alternative}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    base64Lines(body),
    `--${alternative}`,
    'Content-Type: text/calendar; charset=UTF-8; method=REQUEST',
    'Content-Transfer-Encoding: base64',
    '',
    base64Lines(calendar),
    `--${alternative}--`,
    `--${boundary}`,
    'Content-Type: text/calendar; charset=UTF-8; method=REQUEST; name="appointment.ics"',
    'Content-Disposition: attachment; filename="appointment.ics"',
    'Content-Transfer-Encoding: base64',
    '',
    base64Lines(calendar),
    `--${boundary}--`,
    '',
  ].join('\r\n')

  sesClient ??= new SESClient({ region: process.env.AWS_REGION })
  const result = await sesClient.send(
    new SendRawEmailCommand({
      Source: from,
      Destinations: [to],
      RawMessage: { Data: Buffer.from(raw) },
    }),
    { abortSignal: AbortSignal.timeout(10_000) },
  )

  console.info('Booking notification accepted by SES', {
    bookingId: booking.id,
    messageId: result.MessageId,
    region: process.env.AWS_REGION,
  })
}
