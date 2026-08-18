export function SectionHeading({
  title,
  subtitle,
  id,
}: {
  title: string
  subtitle?: string
  id?: string
}) {
  return (
    <div id={id} className="mx-auto max-w-2xl scroll-mt-28 text-center">
      <h2 className="section-heading">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-primary-dark/70">{subtitle}</p>
      ) : null}
    </div>
  )
}
