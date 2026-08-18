export interface NavLink {
  label: string
  to: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services' },
]

export interface ConditionCategory {
  slug: string
  label: string
}

export const CONDITION_CATEGORIES: ConditionCategory[] = [
  { slug: 'musculoskeletal', label: 'Musculoskeletal Disorders' },
  { slug: 'skin', label: 'Skin Disorders' },
  { slug: 'psychological', label: 'Psychological Disorders' },
  { slug: 'gut-digestive', label: 'Gut & Digestive Issues' },
]

export const CONTACT_PHONE = '9350028551'
export const CONTACT_PHONE_HREF = '+919350028551'
export const WHATSAPP_HREF = 'https://wa.me/919350028551'
