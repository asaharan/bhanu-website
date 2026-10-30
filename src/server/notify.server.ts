import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import type { Booking } from './db/schema'

let sesClient: SESClient | undefined

/** Called after persistence, outside the storage retry loop. */
export async function notifyDoctorOfBooking(booking: Booking): Promise<void> {
  const from = process.env.FROM_EMAIL?.trim()
  const to = process.env.NOTIFICATION_EMAIL?.trim()

  if (!from || !to) {
    throw new Error(
      'Booking notifications require FROM_EMAIL and NOTIFICATION_EMAIL',
    )
  }

  sesClient ??= new SESClient({ region: process.env.AWS_REGION })

  await sesClient.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: `New booking #${booking.id}: ${booking.patientName.replace(/[\r\n]+/g, ' ')} — ${booking.appointmentDate} ${booking.slotStart}`,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: [
              `Booking ID: ${booking.id}`,
              `Patient: ${booking.patientName}`,
              `Phone: ${booking.phone}`,
              booking.email ? `Email: ${booking.email}` : null,
              `Reason: ${booking.reason}`,
              `Category: ${booking.conditionCategory}`,
              `Date: ${booking.appointmentDate}`,
              `Time: ${booking.slotStart} - ${booking.slotEnd} (Asia/Kolkata)`,
            ]
              .filter(Boolean)
              .join('\n'),
          },
        },
      },
    }),
    { abortSignal: AbortSignal.timeout(10_000) },
  )
}
