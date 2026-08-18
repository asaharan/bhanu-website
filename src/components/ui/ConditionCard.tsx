import type { ReactNode } from 'react'

export function ConditionCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="card flex flex-col items-center gap-2 p-5 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/15 text-primary [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
      <h3 className="font-semibold text-primary">{title}</h3>
      {description ? (
        <p className="text-sm text-primary-dark/70">{description}</p>
      ) : null}
    </div>
  )
}

export function ConditionPhotoCard({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) {
  return (
    <article className="card overflow-hidden">
      <img
        src={image}
        alt=""
        className="h-36 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold text-primary">{title}</h3>
        <p className="mt-1 text-sm text-primary-dark/70">{description}</p>
      </div>
    </article>
  )
}
