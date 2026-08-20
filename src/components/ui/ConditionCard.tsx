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
        <h3 className="font-semibold text-black">{title}</h3>
        <p className="mt-1 text-sm text-primary-dark/70">{description}</p>
      </div>
    </article>
  )
}
