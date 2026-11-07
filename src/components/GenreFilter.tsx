const genres = [
  { id: null, name: 'All genres' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
]

type GenreFilterProps = {
  selectedGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

function GenreFilter({
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) {
  return (
    <section
      aria-label="Browse by genre"
      className="bg-cream px-6 py-8 md:px-12"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/60">
        Browse by genre
      </h2>

      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id ?? 'all'}
            type="button"
            aria-pressed={selectedGenre === genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`cursor-pointer rounded-full px-5 py-2
              text-sm font-medium transition-colors
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-burnt-orange ${
                selectedGenre === genre.id
                  ? 'bg-burnt-orange text-cream'
                  : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
              }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default GenreFilter