import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieComponents/MovieCard/MovieCard'
import { IMovie } from '../../types/movie.type'

function Favoris() {

  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);

  useEffect(() => {}, [])

  return (
    <main className='text-white px-10 py-4 relative'>
      <section className="flex flex-row flex-wrap mt-36">

        {favoriteMovies.length > 0 && favoriteMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {favoriteMovies.length == 0 && (
          <p className="h-screen">Aucun favoris trouvé.</p>
        )}

      </section>
    </main>
  )
}

export default Favoris