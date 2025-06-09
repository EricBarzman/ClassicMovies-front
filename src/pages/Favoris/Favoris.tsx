import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieComponents/MovieCard/MovieCard'
import { IMovie } from '../../types/movie.type'
import { useMovies } from '../../firebase/movies/movieHooks';
import { useTypedSelector } from '../../redux/redux.type';
import MoviesList from '../../components/MovieComponents/MoviesList/MoviesList';

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
      <h2 className='text-2xl m-4'>Mes favoris</h2>
      {favoriteMovies.length > 0 && <MoviesList movies={favoriteMovies} />}
      {favoriteMovies.length === 0 && (<h2 className='mt-20 text-xl'>Vous n'avez pas de favoris !</h2>)}
    </main>
  )
}

export default Favoris