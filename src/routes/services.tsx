import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SERVICES } from '../lib/content'

export const Route = createFileRoute('/services')({ component: Services })

function Services() {
  return (
    <div className="section-pad">
      <SectionHeading
        title="Our Services"
        subtitle="A complete, personalized path from diagnosis to sustainable healing."
      />

      <div className="mt-12 space-y-12">
        {SERVICES.map((service, index) => (
          <div
            key={service.slug}
            id={service.slug}
            className={`grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-center ${
              index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <img
              src={service.image}
              alt=""
              className="h-64 w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <div>
              <h2 className="font-display text-2xl font-semibold text-black">
                {service.title}
              </h2>
              <p className="mt-3 text-primary-dark/80">
                {service.longDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to="/book-a-slot" className="btn-primary">
          Book Consultation
        </Link>
      </div>
    </div>
  )
}
