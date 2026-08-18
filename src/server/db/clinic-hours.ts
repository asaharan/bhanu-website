export const CLINIC_TIMEZONE = 'Asia/Kolkata'
export const SLOT_DURATION_MINUTES = 30

export interface ClinicWindow {
  start: string
  end: string
}

export const CLINIC_WINDOWS: ClinicWindow[] = [
  { start: '10:00', end: '13:00' },
  { start: '17:00', end: '20:00' },
]

/** 0 = Sunday ... 6 = Saturday (IST calendar weekday) */
export const CLOSED_WEEKDAYS: number[] = [0]

export const MAX_BOOKING_DAYS_AHEAD = 30
