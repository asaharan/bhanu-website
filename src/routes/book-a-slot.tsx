import { createFileRoute } from '@tanstack/react-router'
import { BookingForm } from '../components/booking/BookingForm'
import { SectionHeading } from '../components/ui/SectionHeading'

export const Route = createFileRoute('/book-a-slot')({ component: BookASlot })

function BookASlot() {
  return (
    <div className="section-pad">
      <SectionHeading
        title="Book Consultation"
        subtitle="Pick a date and time that works for you, then complete a quick payment to reserve your consultation."
      />
      <div className="mx-auto mt-10 max-w-xl">
        <BookingForm />
      </div>
    </div>
  )
}
