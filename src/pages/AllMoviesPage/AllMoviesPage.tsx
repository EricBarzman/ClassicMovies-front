import { useEffect, useState } from "react"

import type { IMovie } from "../../types/movie.type"

import { useMovies } from "../../firebase/movies/movieHooks"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList"
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

import { RESULT_PER_PAGE } from '../../constants/allMovies';


function AllMoviesPage() {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const { getMoviesWithDirectorInfo } = useMovies();

  // Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesOnPage, setMoviesOnPage] = useState<IMovie[]>([]);

  useEffect(() => {
    window.scroll(0, 0);
    document.title = 'Films | Classic Movies';
    getMoviesWithDirectorInfo()
      .then(response => setMovies(response))
  }, []);

  useEffect(() => {
    const nbrPage = Math.ceil(movies.length / RESULT_PER_PAGE);
    setMoviesOnPage(movies.slice((currentPage - 1), RESULT_PER_PAGE * currentPage));
    setTotalPages(nbrPage);
  }, [movies])

  useEffect(() => {
    setMoviesOnPage(movies.slice(RESULT_PER_PAGE * (currentPage - 1), RESULT_PER_PAGE * currentPage));
    window.scroll(0, 0);
  }, [currentPage])

  return (
    <main className='text-white px-10 py-4 relative'>

      <h2 className="md:text-2xl text-lg mt-12 ml-4 font-bold">Un catalogue inépuisable !</h2>

      {/* Loading */}
      {movies.length === 0 && <LoadingSpinner />}
      
      {movies.length > 0 && <MoviesList movies={moviesOnPage} />}

      {/* Pagination */}
      <div className="mt-4 text-center">
        {Array.from({ length: totalPages }).map((it, index) =>
          <button
            className={`mr-0.5 py-1 px-4 cursor-pointer ${index + 1 === currentPage  ? "bg-gray-500" : "bg-gray-700"}`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
          </button>
        )}
      </div>

    </main>
  )
}

export default AllMoviesPage