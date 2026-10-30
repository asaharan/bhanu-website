import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { getAdminSession, adminLogout } from '../server/auth'
import { listBookings } from '../server/bookings'
import { nowInClinicTimezone } from '../server/time'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { isAdmin } = await getAdminSession()
    if (!isAdmin) throw redirect({ to: '/admin/login' })
  },
  loader: async () => listBookings(),
  component: AdminBookings,
})

function AdminBookings() {
  const bookings = [...Route.useLoaderData()].sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id,
  )
  const today = nowInClinicTimezone().date
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selectedMessage, setSelectedMessage] = useState<{
    patientName: string
    reason: string
  } | null>(null)

  async function handleLogout() {
    await adminLogout()
    await navigate({ to: '/admin/login' })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-black">
          Bookings
        </h1>
        <button type="button" onClick={handleLogout} className="btn-secondary">
          Log out
        </button>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-dark/60 text-primary-dark/70">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-primary-dark/50"
                >
                  No bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-primary/10">
                  <td className="px-4 py-3">
                    <AppointmentDate
                      date={booking.appointmentDate}
                      today={today}
                    />
                  </td>
                  <td className="px-4 py-3">{booking.slotStart}</td>
                  <td className="px-4 py-3">{booking.patientName}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">{booking.conditionCategory}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="block max-w-48 truncate text-left text-primary underline underline-offset-2 hover:text-primary-dark"
                      onClick={() => {
                        setSelectedMessage({
                          patientName: booking.patientName,
                          reason: booking.reason,
                        })
                        dialogRef.current?.showModal()
                      }}
                    >
                      {booking.reason}
                    </button>
                  </td>
                  <td className="px-4 py-3">{booking.status}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        booking.userHasConfirmedPayment
                          ? 'font-medium text-green-700'
                          : 'text-primary-dark/50'
                      }
                    >
                      {booking.userHasConfirmedPayment
                        ? 'Confirmed by patient'
                        : 'Not confirmed'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="message-title"
        className="m-auto w-[min(90vw,32rem)] rounded-xl bg-white p-6 text-primary-dark shadow-xl backdrop:bg-black/50"
        onClose={() => setSelectedMessage(null)}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="message-title" className="font-display text-xl font-semibold">
            Message from {selectedMessage?.patientName}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
        <p className="mt-4 whitespace-pre-wrap break-words">
          {selectedMessage?.reason}
        </p>
      </dialog>
    </div>
  )
}

function AppointmentDate({ date, today }: { date: string; today: string }) {
  const days = Math.round(
    (Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) /
      86_400_000,
  )
  const label =
    days === 0
      ? 'Today'
      : days === 1
        ? 'Tomorrow'
        : days === -1
          ? 'Yesterday'
          : null

  return (
    <>
      {label && <span className="block font-medium">{label}</span>}
      <span>{date}</span>
    </>
  )
}
