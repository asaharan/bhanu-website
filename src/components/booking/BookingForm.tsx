import { useState } from 'react'
import type { AvailableSlot } from '../../server/bookings'
import {
  confirmBookingPayment,
  createBooking,
  getAvailableSlots,
} from '../../server/bookings'
import type { Booking } from '../../server/db/schema'
import { DatePicker } from './DatePicker'
import { SlotPicker } from './SlotPicker'

const CONDITION_OPTIONS = [
  { value: 'musculoskeletal', label: 'Musculoskeletal' },
  { value: 'skin', label: 'Skin' },
  { value: 'psychological', label: 'Psychological' },
  { value: 'gut_digestive', label: 'Gut & Digestive' },
  { value: 'other', label: 'Other' },
] as const

const UPI_ID = '9350028551@ptsbi'
const UPI_PAYEE_NAME = 'Dr Bhanu Panchal'

type Status =
  | 'idle'
  | 'loading-slots'
  | 'submitting'
  | 'awaiting-payment'
  | 'confirming-payment'
  | 'success'
  | 'error'

export function BookingForm() {
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [slotStart, setSlotStart] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)

  const [patientName, setPatientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [conditionCategory, setConditionCategory] =
    useState<(typeof CONDITION_OPTIONS)[number]['value']>('other')

  async function handleDateChange(nextDate: string) {
    setDate(nextDate)
    setSlotStart(null)
    setSlots([])
    if (!nextDate) return

    setStatus('loading-slots')
    try {
      const result = await getAvailableSlots({ data: { date: nextDate } })
      setSlots(result)
      setStatus('idle')
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not load slots',
      )
      setStatus('error')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date || !slotStart) return

    setStatus('submitting')
    setErrorMessage(null)
    try {
      const created = await createBooking({
        data: {
          patientName,
          phone,
          email,
          reason,
          conditionCategory,
          appointmentDate: date,
          slotStart,
        },
      })
      setBooking(created)
      setStatus('awaiting-payment')
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong — please try again.',
      )
      setStatus('error')
      // The chosen slot may have just been taken by someone else — refresh the list.
      if (date) {
        const result = await getAvailableSlots({ data: { date } }).catch(
          () => null,
        )
        if (result) {
          setSlots(result)
          setSlotStart(null)
        }
      }
    }
  }

  async function handleConfirmPayment() {
    if (!booking) return

    setStatus('confirming-payment')
    setErrorMessage(null)
    try {
      await confirmBookingPayment({ data: { bookingId: booking.id } })
      setStatus('success')
    } catch {
      setErrorMessage('Could not save your confirmation — please try again.')
      setStatus('awaiting-payment')
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <h3 className="font-display text-2xl font-semibold text-primary">
          Your slot is booked!
        </h3>
        <p className="mt-2 text-primary-dark/75">
          We&apos;ve confirmed your appointment on {date} at {slotStart}.
          We&apos;ll reach out on {phone} if anything changes.
        </p>
      </div>
    )
  }

  if (status === 'awaiting-payment' || status === 'confirming-payment') {
    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&cu=INR&tn=${encodeURIComponent(`Consultation booking - ${patientName}`)}`

    return (
      <div className="card space-y-5 p-6 text-center sm:p-8">
        <h3 className="font-display text-2xl font-semibold text-primary">
          Scan &amp; pay to confirm
        </h3>
        <p className="text-primary-dark/75">
          Your slot on {date} at {slotStart} is held for you. Please complete
          the payment below, then let us know you&apos;ve paid.
        </p>

        <img
          src="/images/bhanu-upi-qr.jpg"
          alt="UPI QR code for payment"
          className="mx-auto w-48 rounded-lg border border-primary/10"
        />
        <p className="text-sm text-primary-dark/60">UPI ID: {UPI_ID}</p>

        <a href={upiLink} className="btn-secondary w-full justify-center">
          Pay via UPI app
        </a>

        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <button
          type="button"
          onClick={handleConfirmPayment}
          disabled={status === 'confirming-payment'}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {status === 'confirming-payment' ? 'Confirming…' : 'I have paid'}
        </button>
        <p className="text-xs text-primary-dark/50">
          This only lets us know you&apos;ve completed the payment step —
          we&apos;ll verify it on our end before your appointment.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 p-6 sm:p-8">
      <DatePicker value={date} onChange={handleDateChange} />

      {date ? (
        <div>
          <span className="mb-2 block text-sm font-medium text-primary-dark">
            Choose a time slot
          </span>
          <SlotPicker
            slots={slots}
            selected={slotStart}
            onSelect={setSlotStart}
            loading={status === 'loading-slots'}
          />
        </div>
      ) : null}

      {slotStart ? (
        <div className="space-y-4 border-t border-primary/10 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-primary-dark">
                Full name
              </span>
              <input
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-primary-dark">
                Phone number
              </span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-primary-dark">
              Email (optional)
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-primary-dark">
              Condition category
            </span>
            <select
              value={conditionCategory}
              onChange={(e) =>
                setConditionCategory(e.target.value as typeof conditionCategory)
              }
              className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
            >
              {CONDITION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-primary-dark">
              Reason for visit
            </span>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
            />
          </label>

          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
          </button>
        </div>
      ) : null}
    </form>
  )
}
