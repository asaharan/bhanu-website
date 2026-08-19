import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { getAdminSession, adminLogout } from '../server/auth'
import { listBookings } from '../server/bookings'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { isAdmin } = await getAdminSession()
    if (!isAdmin) throw redirect({ to: '/admin/login' })
  },
  loader: async () => listBookings(),
  component: AdminBookings,
})

function AdminBookings() {
  const bookings = Route.useLoaderData()
  const navigate = useNavigate()

  async function handleLogout() {
    await adminLogout()
    await navigate({ to: '/admin/login' })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-primary">
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
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-primary-dark/50"
                >
                  No bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-primary/10">
                  <td className="px-4 py-3">{booking.appointmentDate}</td>
                  <td className="px-4 py-3">{booking.slotStart}</td>
                  <td className="px-4 py-3">{booking.patientName}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">{booking.conditionCategory}</td>
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
    </div>
  )
}
