export type Movie = {
  id: number
  title: string
  release_date?: string
  vote_average: number
  poster_path: string | null
  genre_ids: number[]
  overview: string
backdrop_path: string | null
}

type MoviesResponse = {
  results: Movie[]
}

export async function getTrendingMovies(
  signal?: AbortSignal,
): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN

  if (!token) {
    throw new Error('Missing TMDB token. Check .env.local.')
  }

  const response = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      signal,
    },
  )

  if (!response.ok) {
    throw new Error(`Could not load movies (${response.status}).`)
  }

  const data: MoviesResponse = await response.json()

  return data.results
}