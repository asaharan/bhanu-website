import { createFileRoute, Link } from '@tanstack/react-router'
import { LeafIcon } from '../components/icons/LeafIcon'
import { IconBadge } from '../components/ui/IconBadge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceCard } from '../components/ui/ServiceCard'
import { StatBanner } from '../components/ui/StatBanner'
import {
  APPROACH_STEPS,
  FEATURE_HIGHLIGHTS,
  SERVICES,
  WHY_CHOOSE_US,
} from '../lib/content'
import { CONTACT_PHONE, CONTACT_PHONE_HREF, WHATSAPP_HREF } from '../lib/nav'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div>
      <section className="section-pad grid gap-10 pb-10 pt-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Personalized Ayurveda for a Healthier You
          </h1>
          <p className="mt-5 max-w-lg text-primary-dark/75">
            Discover your Prakriti, find the root cause of your health concerns,
            and receive a personalized treatment plan for body, mind & soul.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2 text-center text-xs font-medium text-primary-dark/80 sm:text-sm"
              >
                <IconBadge>{item.icon}</IconBadge>
                {item.title}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book-a-slot" className="btn-primary">
              Book My Slot
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/hero-ayurveda-herbs.webp"
            alt="Ayurvedic herbs, powders and a mortar and pestle"
            className="h-full max-h-[420px] w-full rounded-3xl object-cover"
          />
          <div className="absolute -left-6 top-6 hidden max-w-[220px] rounded-full border border-primary/15 bg-cream p-6 text-center shadow-lg sm:block">
            <LeafIcon className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 font-display text-sm font-semibold text-primary">
              Ayurveda for Body &bull; Mind &bull; Soul &bull; Lifestyle &bull;
              Longevity
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <SectionHeading title="Our Unique Approach" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {APPROACH_STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 text-center"
            >
              <IconBadge size="lg">{step.icon}</IconBadge>
              <h3 className="font-semibold text-primary">{step.title}</h3>
              <p className="text-sm text-primary-dark/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream-dark/40">
        <SectionHeading title="Services We Provide" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.slug}
              image={service.image}
              title={service.title}
              description={service.description}
              href={`/services#${service.slug}`}
            />
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="grid gap-8 rounded-3xl bg-primary/5 p-8 sm:grid-cols-[1.2fr_1fr] sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">
              Why Choose AyurGarima?
            </h2>
            <ul className="mt-5 space-y-3">
              {WHY_CHOOSE_US.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-primary-dark/80"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 13 4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/images/why-choose-us.webp"
            alt=""
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-pad">
        <StatBanner />
      </section>

      <section className="section-pad grid gap-6 rounded-3xl bg-primary-light/10 p-8 sm:grid-cols-2 sm:items-center sm:p-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary">
            Take the First Step Towards Natural Healing
          </h2>
          <p className="mt-2 text-primary-dark/75">
            Book your consultation today and begin your journey towards a
            balanced & healthy life.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Link to="/book-a-slot" className="btn-primary">
            Book My Slot Now
          </Link>
          <div className="flex gap-4 text-sm text-primary-dark/70">
            <a href={`tel:${CONTACT_PHONE_HREF}`} className="hover:underline">
              Call {CONTACT_PHONE}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
