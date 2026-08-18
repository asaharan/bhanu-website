import { CLINIC_WINDOWS, SLOT_DURATION_MINUTES } from './db/clinic-hours'

export interface SlotCandidate {
  start: string
  end: string
}

function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(':').map(Number)
  const total = h * 60 + m + minutes
  const hh = Math.floor(total / 60) % 24
  const mm = total % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

/** All candidate slots for a day, independent of existing bookings or the current time. */
export function generateSlotCandidates(): SlotCandidate[] {
  const slots: SlotCandidate[] = []
  for (const window of CLINIC_WINDOWS) {
    let cursor = window.start
    while (cursor < window.end) {
      const end = addMinutes(cursor, SLOT_DURATION_MINUTES)
      if (end > window.end) break
      slots.push({ start: cursor, end })
      cursor = end
    }
  }
  return slots
}
