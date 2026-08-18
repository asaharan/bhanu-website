import { MAX_BOOKING_DAYS_AHEAD } from '../../server/db/clinic-hours'

function toDateInputValue(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (date: string) => void
}) {
  const today = new Date()
  const max = new Date(today)
  max.setDate(max.getDate() + MAX_BOOKING_DAYS_AHEAD)

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-dark">
        Choose a date
      </span>
      <input
        type="date"
        className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
        value={value}
        min={toDateInputValue(today)}
        max={toDateInputValue(max)}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
