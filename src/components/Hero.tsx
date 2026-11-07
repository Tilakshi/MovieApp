import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/tmdb'
import type { Movie } from '../services/tmdb'

function Hero() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadFeaturedMovie() {
      try {
        const movies = await getTrendingMovies(controller.signal)

        if (!controller.signal.aborted) {
          setMovie(movies[0] ?? null)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Could not load the featured movie.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadFeaturedMovie()

    return () => controller.abort()
  }, [])

  if (loading || error || !movie) {
    return (
      <section className="flex min-h-[calc(100dvh-100px)] items-center justify-center bg-charcoal px-6 text-cream">
        <p role={error ? 'alert' : 'status'}>
          {loading
            ? 'Loading featured movie...'
            : error || 'No featured movie available.'}
        </p>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="featured-title"
      className="grid min-h-[calc(100dvh-100px)] bg-charcoal text-cream md:grid-cols-2"
    >
      <div className="flex flex-col items-start justify-center px-6 py-12 md:p-12">
        <p className="text-xs font-bold uppercase tracking-widest text-peach">
          Featured movie
        </p>

        <h1
          id="featured-title"
          className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          {movie.title}
        </h1>

        <p className="mt-5 text-sm text-cream/75">
          {movie.release_date?.slice(0, 4) || 'Release date unknown'}
          {' · '}★ {movie.vote_average.toFixed(1)}
        </p>

        <p className="mt-5 max-w-lg leading-relaxed text-cream/80">
          {movie.overview || 'No description available.'}
        </p>

        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 rounded-lg bg-burnt-orange px-5 py-3
                     font-semibold hover:brightness-110
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-peach"
        >
          View details on TMDB ↗
        </a>
      </div>

      <div className="relative min-h-72 bg-burnt-orange/30">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full min-h-72 items-center justify-center">
            No backdrop available
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero