import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CLINIC_WINDOWS } from '../server/db/clinic-hours'
import { CONTACT_PHONE, CONTACT_PHONE_HREF, WHATSAPP_HREF } from '../lib/nav'

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
  return (
    <div className="section-pad">
      <SectionHeading
        title="Contact Us"
        subtitle="We are here to help you on your journey to better health."
      />

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-black">Call Us</h3>
          <a
            href={`tel:${CONTACT_PHONE_HREF}`}
            className="mt-2 block text-lg font-semibold text-primary-dark"
          >
            {CONTACT_PHONE}
          </a>
        </div>
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-black">WhatsApp</h3>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-lg font-semibold text-primary-dark"
          >
            Chat with us
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl card p-6">
        <h3 className="font-semibold text-black">Clinic Hours</h3>
        <ul className="mt-2 space-y-1 text-sm text-primary-dark/80">
          {CLINIC_WINDOWS.map((window) => (
            <li key={window.start}>
              {window.start} &ndash; {window.end}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-primary-dark/50">Closed on Sundays.</p>
      </div>

      <div className="mt-10 text-center">
        <Link to="/book-a-slot" className="btn-primary">
          Book Consultation
        </Link>
      </div>
    </div>
  )
}
