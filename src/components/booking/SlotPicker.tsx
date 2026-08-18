import type { AvailableSlot } from '../../server/bookings'

export function SlotPicker({
  slots,
  selected,
  onSelect,
  loading,
}: {
  slots: AvailableSlot[]
  selected: string | null
  onSelect: (start: string) => void
  loading: boolean
}) {
  if (loading) {
    return (
      <p className="text-sm text-primary-dark/60">
        Loading available slots&hellip;
      </p>
    )
  }

  if (slots.length === 0) {
    return (
      <p className="text-sm text-primary-dark/60">
        No slots available on this date. Please pick another day.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => (
        <button
          key={slot.start}
          type="button"
          onClick={() => onSelect(slot.start)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            selected === slot.start
              ? 'border-primary bg-primary text-cream'
              : 'border-primary/20 text-primary-dark hover:border-primary'
          }`}
        >
          {slot.start}
        </button>
      ))}
    </div>
  )
}
