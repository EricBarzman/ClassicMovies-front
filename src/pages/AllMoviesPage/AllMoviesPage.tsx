import { useEffect, useState } from "react"

import type { IMovie } from "../../types/movie.type"

import { useMovies } from "../../firebase/movies/movieHooks"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function AllMoviesPage() {

  const [movies, setMovies] = useState<IMovie[]>([]);

  const { getMoviesWithDirectorInfo } = useMovies();

  useEffect(() => {
    window.scroll(0, 0);
    document.title = 'Films | Classic Movies';
    getMoviesWithDirectorInfo()
      .then(response => setMovies(response))
  }, []);

  return (
    <main className='text-white px-10 py-4 relative'>

      <h2 className="md:text-2xl text-lg mt-12 ml-4 font-bold">Un catalogue inépuisable !</h2>
      
      {movies.length === 0 && <LoadingSpinner />}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </main>
  )
}

export default AllMoviesPage