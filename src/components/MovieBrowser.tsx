import { useState } from 'react'
import GenreFilter from './GenreFilter'
import MovieSection from './MovieSection'

function MovieBrowser() {
  const [selectedGenre, setSelectedGenre] =
    useState<number | null>(null)

  return (
    <>
      <GenreFilter
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <MovieSection selectedGenre={selectedGenre} />
    </>
  )
}

export default MovieBrowser