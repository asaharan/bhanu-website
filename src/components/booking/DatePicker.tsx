import { useState } from 'react'
import { CLOSED_WEEKDAYS, MAX_BOOKING_DAYS_AHEAD } from '../../server/db/clinic-hours'
import { nowInClinicTimezone } from '../../server/time'

const QUICK_OPTION_COUNT = 5

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function weekdayOf(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay()
}

function chipLabel(dateStr: string, offset: number): string {
  if (offset === 0) return 'Today'
  if (offset === 1) return 'Tomorrow'
  return new Date(`${dateStr}T12:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (date: string) => void
}) {
  const [showCustom, setShowCustom] = useState(false)
  const { date: today } = nowInClinicTimezone()

  const quickDates: Array<{ date: string; offset: number }> = []
  for (let offset = 0; quickDates.length < QUICK_OPTION_COUNT; offset++) {
    const date = addDays(today, offset)
    if (CLOSED_WEEKDAYS.includes(weekdayOf(date))) continue
    quickDates.push({ date, offset })
  }

  const isCustomValue = value !== '' && !quickDates.some((q) => q.date === value)
  const customOpen = showCustom || isCustomValue
  const max = addDays(today, MAX_BOOKING_DAYS_AHEAD)

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-primary-dark">
        Choose a date
      </span>
      <div className="flex flex-wrap gap-2">
        {quickDates.map(({ date, offset }) => (
          <button
            key={date}
            type="button"
            onClick={() => {
              setShowCustom(false)
              onChange(date)
            }}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              value === date && !customOpen
                ? 'border-primary bg-primary text-cream'
                : 'border-primary/20 text-primary-dark hover:border-primary'
            }`}
          >
            {chipLabel(date, offset)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustom((s) => !s)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            customOpen
              ? 'border-primary bg-primary text-cream'
              : 'border-primary/20 text-primary-dark hover:border-primary'
          }`}
        >
          Other date
        </button>
      </div>

      {customOpen ? (
        <input
          type="date"
          className="mt-3 w-full rounded-lg border border-primary/20 bg-surface px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
          value={value}
          min={today}
          max={max}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}
    </div>
  )
}
