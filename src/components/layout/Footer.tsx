import { Link } from '@tanstack/react-router'
import { LeafIcon } from '../icons/LeafIcon'
import {
  CONDITION_CATEGORIES,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  NAV_LINKS,
  WHATSAPP_HREF,
} from '../../lib/nav'

export function Footer() {
  return (
    <footer className="mt-20 bg-primary-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <LeafIcon className="h-8 w-8" />
            <span className="font-display text-xl font-semibold">
              AyurGarima
            </span>
          </div>
          <p className="mt-3 text-sm text-cream/70">
            Rooted in Ayurveda, Focused on You.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cream/60">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[...NAV_LINKS, { label: 'Contact Us', to: '/contact' }].map(
              (link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cream/60">
            Conditions We Treat
          </h4>
          <ul className="space-y-2 text-sm">
            {CONDITION_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/conditions"
                  hash={category.slug}
                  className="hover:underline"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cream/60">
            Get In Touch
          </h4>
          <a
            href={`tel:${CONTACT_PHONE_HREF}`}
            className="block text-sm hover:underline"
          >
            {CONTACT_PHONE}
          </a>
          <a
            href={WHATSAPP_HREF}
            className="mt-2 inline-block text-sm hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60">
        <p>
          &copy; {new Date().getFullYear()} AyurGarima &mdash; Dr. Bhanu K
          Panchal, M.D. (Ayu)
        </p>
        <p className="mt-1">
          Vitiligo &amp; urticaria reference photos via Wikimedia Commons, CC
          BY-SA 4.0.
        </p>
      </div>
    </footer>
  )
}
