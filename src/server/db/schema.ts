import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientName: text('patient_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  reason: text('reason').notNull(),
  conditionCategory: text('condition_category', {
    enum: [
      'musculoskeletal',
      'skin',
      'psychological',
      'gut_digestive',
      'other',
    ],
  }).notNull(),
  /** 'YYYY-MM-DD', IST calendar date — no timezone conversion applied. */
  appointmentDate: text('appointment_date').notNull(),
  /** 'HH:mm', IST wall clock. */
  slotStart: text('slot_start').notNull(),
  slotEnd: text('slot_end').notNull(),
  status: text('status', {
    enum: ['confirmed', 'cancelled', 'completed', 'no_show'],
  })
    .notNull()
    .default('confirmed'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
})

export type Booking = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert

/**
 * Idempotent DDL mirroring the schema above, including the partial unique
 * index that guarantees SQLite itself rejects a double-booked slot even if
 * app-level availability validation ever has a bug. Run on every snapshot
 * open so the very first write against an empty S3 object bootstraps the
 * schema without a separate init step.
 */
export const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  reason TEXT NOT NULL,
  condition_category TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  slot_start TEXT NOT NULL,
  slot_end TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_slot
  ON bookings(appointment_date, slot_start)
  WHERE status = 'confirmed';
`
