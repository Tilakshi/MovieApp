import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { getTrendingMovies } from '../services/tmdb'
import type { Movie } from '../services/tmdb'

type MovieSectionProps = {
  selectedGenre: number | null

}



function MovieSection({ selectedGenre }: MovieSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadMovies() {
      try {
        const results = await getTrendingMovies(controller.signal)

        if (!controller.signal.aborted) {
          setMovies(results)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Something went wrong.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

        loadMovies()

    return () => controller.abort()
  }, [])

  const filteredMovies =
    selectedGenre === null
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.includes(selectedGenre),
        )

  return (
    <section
      id="movies"
      aria-labelledby="movies-heading"
      className="bg-cream px-6 pb-12 md:px-12"
    >
      <div className="mb-6">
        <h2
          id="movies-heading"
          className="text-2xl font-bold tracking-tight text-charcoal md:text-3xl"
        >
          Trending movies
        </h2>

        <p className="mt-2 text-sm text-charcoal/60">
          Find your next movie-night favorite.
        </p>
      </div>

      {loading && <p role="status">Loading movies...</p>}

      {error && <p role="alert">{error}</p>}

     {!loading && !error && filteredMovies.length === 0 && (
  <p>No trending movies match this genre.</p>
)}

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.release_date?.slice(0, 4) || 'Release date unknown'}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </section>
  )
}

export default MovieSection