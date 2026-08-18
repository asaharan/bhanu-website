import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionHeading } from '../components/ui/SectionHeading'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="section-pad">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <img
          src="/images/doctor-portrait.webp"
          alt="Dr. Bhanu K Panchal"
          className="mx-auto h-64 w-64 rounded-full border-4 border-primary/15 object-cover lg:mx-0"
        />
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
            Dr. Bhanu K Panchal
          </h1>
          <p className="mt-1 text-primary-dark/60">M.D. (Ayu)</p>

          <p className="mt-6 text-primary-dark/80">
            Dr. Bhanu K Panchal is the founder of AyurGarima, dedicated to
            helping patients discover the root cause of their health concerns
            through classical Ayurvedic principles. With a Prakriti-first
            approach, every treatment plan is personalized to the
            individual&apos;s unique body-mind constitution rather than a
            one-size-fits-all protocol.
          </p>
          <p className="mt-4 text-primary-dark/80">
            Over 15+ years of practice, Dr. Panchal has helped over a thousand
            patients manage musculoskeletal, skin, psychological, and digestive
            conditions through natural, holistic Ayurvedic care &mdash; treating
            the body, mind, and soul together for sustainable, long-term
            wellness.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book-a-slot" className="btn-primary">
              Book My Slot
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          title="Our Philosophy"
          subtitle="Ayurveda for Body, Mind, Soul, Lifestyle & Longevity"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-primary-dark/80">
          <p>
            AyurGarima is built on the belief that true healing begins with
            understanding your unique constitution, or Prakriti. Rather than
            suppressing symptoms, we work to identify and address the root cause
            of imbalance &mdash; through diet, lifestyle, herbal medicine, and
            therapeutic treatments tailored specifically to you.
          </p>
          <p>
            Our goal isn&apos;t just relief &mdash; it&apos;s sustainable
            health: preventing recurrence and helping you achieve lasting
            balance across body, mind, and soul.
          </p>
        </div>
      </div>
    </div>
  )
}
