import { useTypedSelector } from "../../redux/redux.type"
import { useEffect, useState } from "react";
import MovieCard from "../MovieComponents/MovieCard/MovieCard"
import { IMovie } from "../../types/movie.type";

function Search() {

  const searchInput = useTypedSelector((state) => state.search.searchInput)
  const [movies, setMovies] = useState<IMovie[]>([]);
  
  useEffect(()=> {
    
      // .post('movies/search/', { 'searchInput': searchInput})
      // .then(response => setMovies(response.data))
  }, [searchInput])

  return (
    <main className="text-white px-10 py-4">
      
      <h2 className="text-3xl font-semibold mb-6">Searching for: {searchInput}</h2>
      {movies.length > 0 && <p>{movies.length} results found.</p>}
      <section className="flex flex-row flex-wrap mt-6">
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {movies.length == 0 && (
          <p className="h-screen">No result found.</p>
        )}
      </section>

    </main>
  )
}

export default Search