export function ServiceCard({
  image,
  title,
  description,
  href,
}: {
  image: string
  title: string
  description: string
  href?: string
}) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <img
        src={image}
        alt=""
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-black">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-primary-dark/70">
          {description}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Learn More &rarr;
          </a>
        ) : null}
      </div>
    </article>
  )
}
