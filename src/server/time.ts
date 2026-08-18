import { CLINIC_TIMEZONE } from './db/clinic-hours'

/** Current wall-clock date/time in the clinic's timezone, never the server's raw UTC or the client's local time. */
export function nowInClinicTimezone(): {
  date: string
  time: string
  weekday: number
} {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
    weekday: weekdayMap[get('weekday')] ?? 0,
  }
}

export function dateToWeekday(dateStr: string): number {
  // Parse as a plain calendar date (no timezone conversion) by anchoring at noon UTC.
  const d = new Date(`${dateStr}T12:00:00Z`)
  return d.getUTCDay()
}

export function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function compareDates(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0
}
