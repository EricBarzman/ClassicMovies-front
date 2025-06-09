import { useEffect, useState } from "react"

import type { IMovie } from "../../types/movie.type"

import { useMovies } from "../../firebase/movies/movieHooks"
import MovieCard from "../../components/MovieComponents/MovieCard/MovieCard"

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
      <section className="flex flex-row flex-wrap mt-36">

        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {movies.length == 0 && (
          <p className="h-screen">Aucun résult trouvé.</p>
        )}

      </section>
    </main>
  )
}

export default AllMoviesPage