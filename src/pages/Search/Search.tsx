import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useMovies } from "../../firebase/movies/movieHooks";
import { IMovie } from "../../types/movie.type";

import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList";
import searchMoviesFromInput from "../../utils/searchMovies";


function Search() {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [foundMovies, setFoundMovies] = useState<IMovie[]>([]);
  const [searchParams, _] = useSearchParams()

  const { getMoviesWithDirectorInfo } = useMovies();

  useEffect(() => {
    getMoviesWithDirectorInfo().then(movies => setMovies(movies));
  }, [])

  useEffect(() => {
    const input = searchParams.get("input");
    if (!input || input === "") return;
    
    setFoundMovies(searchMoviesFromInput(input, movies));
  }, [searchParams])

  return (
    <main className="text-white px-10 py-4">

      <h2 className="text-3xl font-semibold mb-6">
        Searching for: {searchParams.get("input")}
      </h2>

      {foundMovies.length > 0 && <p className="mb-4">{foundMovies.length} results found.</p>}

      {foundMovies.length > 0 && <MoviesList movies={foundMovies} />}

      {foundMovies.length == 0 && (<p className="h-screen">No result found.</p>)}

    </main>
  )
}

export default Search