import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieComponents/MovieCard/MovieCard'
import { IMovie } from '../../types/movie.type'
import { useMovies } from '../../firebase/movies/movieHooks';
import { useTypedSelector } from '../../redux/redux.type';

function Favoris() {

  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);
  const { getMoviesWithDirectorInfo } = useMovies();
  const favorites = useTypedSelector(state => state.favorites);
  
  useEffect(() => {
    window.scroll(0, 0);
    document.title = 'Favoris | Classic Movies';    
    getMoviesWithDirectorInfo().then(list => {
      const filteredList = list.filter(movie => favorites.mesFavoris.some(fav => fav.movieId === movie.id));
      setFavoriteMovies(filteredList);
    })

  }, [favorites])

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