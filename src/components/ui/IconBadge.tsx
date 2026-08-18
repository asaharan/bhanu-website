import type { ReactNode } from 'react'

export function IconBadge({
  children,
  size = 'md',
}: {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
    md: 'h-14 w-14 [&>svg]:h-7 [&>svg]:w-7',
    lg: 'h-16 w-16 [&>svg]:h-8 [&>svg]:w-8',
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary-light/15 text-primary ${sizes[size]}`}
    >
      {children}
    </span>
  )
}
