import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LeafIcon } from '../icons/LeafIcon'
import { CONDITION_CATEGORIES, NAV_LINKS } from '../../lib/nav'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [conditionsOpen, setConditionsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/doctor-portrait.webp"
            alt="Dr. Bhanu K Panchal"
            className="h-14 w-14 rounded-full border-2 border-primary/30 object-cover"
          />
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-primary">
              Dr. Bhanu K Panchal
            </div>
            <div className="text-xs text-primary-dark/60">M.D. (Ayu)</div>
          </div>
        </Link>

        <Link to="/" className="hidden items-center gap-2 sm:flex">
          <LeafIcon className="h-9 w-9 text-primary" />
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-primary">
              AyurGarima
            </div>
            <div className="text-[11px] text-primary-dark/60">
              Rooted in Ayurveda, Focused on You
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-md border border-primary/30 p-2 text-primary lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="hidden border-t border-primary/10 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-4 py-2.5 text-sm font-medium text-primary-dark sm:px-6 lg:px-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-primary [&.active]:text-primary [&.active]:font-semibold"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setConditionsOpen(true)}
            onMouseLeave={() => setConditionsOpen(false)}
          >
            <Link
              to="/conditions"
              className="flex items-center gap-1 hover:text-primary"
            >
              Conditions We Treat
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </Link>
            {conditionsOpen ? (
              <div className="absolute right-0 top-full w-56 rounded-xl border border-primary/10 bg-surface py-2 shadow-lg">
                {CONDITION_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    to="/conditions"
                    hash={category.slug}
                    className="block px-4 py-2 text-sm hover:bg-cream hover:text-primary"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            to="/contact"
            className="hover:text-primary [&.active]:text-primary [&.active]:font-semibold"
          >
            Contact Us
          </Link>

          <Link
            to="/book-a-slot"
            className="rounded-lg bg-primary px-4 py-2 text-cream hover:bg-primary-dark"
          >
            Book My Slot
          </Link>
        </div>
      </nav>

      {mobileOpen ? (
        <nav className="border-t border-primary/10 px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2 text-sm font-medium text-primary-dark">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-2 py-2 hover:bg-cream-dark"
              >
                {link.label}
              </Link>
            ))}
            <span className="px-2 pt-2 text-xs font-semibold uppercase text-primary-dark/50">
              Conditions We Treat
            </span>
            {CONDITION_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to="/conditions"
                hash={category.slug}
                className="rounded-md px-4 py-1.5 hover:bg-cream-dark"
              >
                {category.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="rounded-md px-2 py-2 hover:bg-cream-dark"
            >
              Contact Us
            </Link>
            <Link
              to="/book-a-slot"
              className="mt-2 rounded-lg bg-primary px-4 py-2 text-center text-cream hover:bg-primary-dark"
            >
              Book My Slot
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
