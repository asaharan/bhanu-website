import type { Booking } from './db/schema'

/**
 * Best-effort notification only. Called after a booking's S3 PUT has already
 * durably succeeded — never from inside the write/retry loop — so a failed
 * or slow email can never fail the booking itself or cause a duplicate send
 * on retry.
 */
export async function notifyDoctorOfBooking(booking: Booking): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL_TO

  if (!apiKey || !to) {
    console.log(
      `[booking] New appointment: ${booking.patientName} on ${booking.appointmentDate} at ${booking.slotStart} ` +
        `(set RESEND_API_KEY + NOTIFY_EMAIL_TO to email this instead)`,
    )
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:
        process.env.NOTIFY_EMAIL_FROM ??
        'AyurGarima Bookings <bookings@ayurgarima.example>',
      to,
      subject: `New booking: ${booking.patientName} — ${booking.appointmentDate} ${booking.slotStart}`,
      text: [
        `Patient: ${booking.patientName}`,
        `Phone: ${booking.phone}`,
        booking.email ? `Email: ${booking.email}` : null,
        `Reason: ${booking.reason}`,
        `Category: ${booking.conditionCategory}`,
        `Date: ${booking.appointmentDate}`,
        `Time: ${booking.slotStart} - ${booking.slotEnd}`,
      ]
        .filter(Boolean)
        .join('\n'),
    }),
  })

  if (!res.ok) {
    throw new Error(`Resend API error: ${res.status} ${await res.text()}`)
  }
}
