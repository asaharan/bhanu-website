import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function PrakritiIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16 4 4 0 0 1 0-8 4 4 0 0 0 0-8Z" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </Base>
  )
}

export function RootCauseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="10" r="6" />
      <circle cx="12" cy="10" r="2.4" />
      <path d="M12 16v5M9 21h6" />
    </Base>
  )
}

export function TreatmentPlanIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 3v2h6V3" />
      <path d="M8.5 10h7M8.5 13h7M8.5 16h4.5" />
    </Base>
  )
}

export function HolisticIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21c-4-2.5-7-6-7-10a5 5 0 0 1 7-4.6A5 5 0 0 1 19 11c0 4-3 7.5-7 10Z" />
      <path d="M12 6.4V21" />
    </Base>
  )
}

export function CounsellingIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.4" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M14.5 15.4c2.4.3 4 2.1 4 4.6" />
    </Base>
  )
}

export function SustainableIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6Z" />
      <path d="m8.5 12 2.3 2.3L15.5 10" />
    </Base>
  )
}

export function SpineIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2v20" />
      {[4, 7, 10, 13, 16, 19].map((y) => (
        <path key={y} d={`M9 ${y}h6`} />
      ))}
    </Base>
  )
}

export function KneeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3v7l-3 4v7" />
      <path d="M15 3v7l3 4v7" />
      <circle cx="12" cy="12" r="3.2" />
    </Base>
  )
}

export function ShoulderIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 15c0-5 3.5-9 8-9s8 4 8 9" />
      <circle cx="12" cy="6" r="2.4" />
      <path d="M4 15v6M20 15v6" />
    </Base>
  )
}

export function SciaticaIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2v6" />
      <path d="M12 8 8 12l4 2-3 8" />
    </Base>
  )
}

export function SlipDiscIcon(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="7" rx="7" ry="2.4" />
      <ellipse cx="12" cy="12.5" rx="7" ry="2.4" />
      <ellipse cx="13.2" cy="18" rx="7.4" ry="2.4" />
    </Base>
  )
}

export function ArthritisIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 21c0-4 1-6 1-9 0-2-1-3-1-5a2 2 0 1 1 4 0c0 1.5.5 2 .5 3.5" />
      <path d="M9.5 10.5c0-1.6 0-2.8.2-4a2 2 0 1 1 4 .3c0 1.2-.2 2-.2 3.2" />
      <path d="M13.5 10c0-1.3.2-2 .4-3a2 2 0 1 1 4 .6c0 1-.4 1.8-.6 3 1.4.6 2.7 1.8 2.7 4.4 0 3-2 6-2 6" />
    </Base>
  )
}

export function RunningIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="15" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M6 20l3.5-4 2-3-1-4 4-2 2 3.5 3.5 1.5" />
      <path d="M10.5 13 8 16l-3.5 1.5" />
    </Base>
  )
}

export function PersonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M5 21c0-4.2 3.1-7 7-7s7 2.8 7 7" />
    </Base>
  )
}

export function IntestineIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 4v3a3 3 0 0 0 3 3h1a3 3 0 0 1 3 3 3 3 0 0 1-3 3H9a3 3 0 0 0-3 3v2" />
      <path d="M18 4v12a4 4 0 0 1-4 4h-1" />
    </Base>
  )
}

export function LiverIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12c0-4 3.5-7 8-7 5.5 0 8 3 8 6.5 0 4-3 7.5-8.5 7.5-4 0-7.5-2.5-7.5-7Z" />
      <path d="M9 10.5c1-.8 2-.8 3 0s2 .8 3 0" />
    </Base>
  )
}

export function StomachIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 3c0 2-2 3-2 6.5C6 15 9 20 13 20s6-3.5 6-7c0-2.5-1.5-3-3-3s-2-1-2-3" />
      <path d="M14 3c0 1.2.8 2 .8 2" />
    </Base>
  )
}
