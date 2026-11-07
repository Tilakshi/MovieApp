type MovieCardProps = {
  title: string
  year: string
  rating: number
  posterPath: string | null
}

function MovieCard({
  title,
  year,
  rating,
  posterPath,
}: MovieCardProps) {
  return (
    <article>
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-charcoal/10">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={`${title} poster`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-charcoal/60">
            No poster available
          </div>
        )}

        <span className="absolute left-3 top-3 rounded bg-charcoal px-2 py-1 text-sm font-semibold text-cream">
          ★ {rating.toFixed(1)}
        </span>
      </div>

      <h3 className="mt-3 font-bold text-charcoal">{title}</h3>
      <p className="mt-1 text-sm text-charcoal/70">{year}</p>
    </article>
  )
}

export default MovieCard