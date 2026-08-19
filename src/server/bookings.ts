import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { bookings } from './db/schema'
import { CLOSED_WEEKDAYS, MAX_BOOKING_DAYS_AHEAD } from './db/clinic-hours'
import { generateSlotCandidates } from './slots'
import {
  compareDates,
  dateToWeekday,
  isValidDateString,
  nowInClinicTimezone,
} from './time'

export class SlotAlreadyBookedError extends Error {
  constructor() {
    super('That slot was just taken — please pick another.')
    this.name = 'SlotAlreadyBookedError'
  }
}

function assertBookableDate(date: string) {
  if (!isValidDateString(date)) throw new Error('Invalid date')

  const { date: today } = nowInClinicTimezone()
  if (compareDates(date, today) < 0) throw new Error('That date is in the past')

  const maxDate = new Date(`${today}T12:00:00Z`)
  maxDate.setUTCDate(maxDate.getUTCDate() + MAX_BOOKING_DAYS_AHEAD)
  const maxDateStr = maxDate.toISOString().slice(0, 10)
  if (compareDates(date, maxDateStr) > 0)
    throw new Error('That date is too far in the future')

  if (CLOSED_WEEKDAYS.includes(dateToWeekday(date)))
    throw new Error('The clinic is closed on that day')
}

export interface AvailableSlot {
  start: string
  end: string
}

export const getAvailableSlots = createServerFn({ method: 'GET' })
  .validator(z.object({ date: z.string() }))
  .handler(async ({ data }): Promise<AvailableSlot[]> => {
    assertBookableDate(data.date)

    const { date: today, time: nowTime } = nowInClinicTimezone()
    const candidates = generateSlotCandidates()

    const { readS3Sqlite } = await import('./s3/with-sqlite')
    return readS3Sqlite((db) => {
      const existing = db
        .select({ slotStart: bookings.slotStart })
        .from(bookings)
        .where(
          and(
            eq(bookings.appointmentDate, data.date),
            eq(bookings.status, 'confirmed'),
          ),
        )
        .all()
      const taken = new Set(existing.map((row) => row.slotStart))

      return candidates.filter((slot) => {
        if (taken.has(slot.start)) return false
        if (data.date === today && slot.start <= nowTime) return false
        return true
      })
    })
  })

const CreateBookingInput = z.object({
  patientName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  reason: z.string().trim().min(3).max(500),
  conditionCategory: z.enum([
    'musculoskeletal',
    'skin',
    'psychological',
    'gut_digestive',
    'other',
  ]),
  appointmentDate: z.string(),
  slotStart: z.string(),
})

export const createBooking = createServerFn({ method: 'POST' })
  .validator(CreateBookingInput)
  .handler(async ({ data }) => {
    assertBookableDate(data.appointmentDate)

    const candidate = generateSlotCandidates().find(
      (slot) => slot.start === data.slotStart,
    )
    if (!candidate) throw new Error('Invalid time slot')

    const { date: today, time: nowTime } = nowInClinicTimezone()
    if (data.appointmentDate === today && candidate.start <= nowTime) {
      throw new Error('That time has already passed')
    }

    const { writeS3Sqlite } = await import('./s3/with-sqlite')
    const booking = await writeS3Sqlite((db) => {
      // Re-validated against a freshly-fetched snapshot on every retry —
      // never hoist this check outside writeS3Sqlite's mutate callback.
      const clash = db
        .select({ id: bookings.id })
        .from(bookings)
        .where(
          and(
            eq(bookings.appointmentDate, data.appointmentDate),
            eq(bookings.slotStart, data.slotStart),
            eq(bookings.status, 'confirmed'),
          ),
        )
        .get()
      if (clash) throw new SlotAlreadyBookedError()

      return db
        .insert(bookings)
        .values({
          patientName: data.patientName,
          phone: data.phone,
          email: data.email || null,
          reason: data.reason,
          conditionCategory: data.conditionCategory,
          appointmentDate: data.appointmentDate,
          slotStart: candidate.start,
          slotEnd: candidate.end,
        })
        .returning()
        .get()
    })

    const { notifyDoctorOfBooking } = await import('./notify.server')
    void notifyDoctorOfBooking(booking).catch((err) => {
      console.error('Failed to send booking notification email', err)
    })

    return booking
  })

const ConfirmBookingPaymentInput = z.object({ bookingId: z.number() })

export const confirmBookingPayment = createServerFn({ method: 'POST' })
  .validator(ConfirmBookingPaymentInput)
  .handler(async ({ data }) => {
    const { writeS3Sqlite } = await import('./s3/with-sqlite')
    return writeS3Sqlite((db) => {
      const existing = db
        .select({ id: bookings.id })
        .from(bookings)
        .where(eq(bookings.id, data.bookingId))
        .get()
      if (!existing) throw new Error('Booking not found')

      return db
        .update(bookings)
        .set({ userHasConfirmedPayment: true })
        .where(eq(bookings.id, data.bookingId))
        .returning()
        .get()
    })
  })

export const listBookings = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { readS3Sqlite } = await import('./s3/with-sqlite')
    return readS3Sqlite((db) =>
      db
        .select()
        .from(bookings)
        .orderBy(bookings.appointmentDate, bookings.slotStart)
        .all(),
    )
  },
)
