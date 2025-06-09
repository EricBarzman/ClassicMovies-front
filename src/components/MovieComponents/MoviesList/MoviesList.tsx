import { IMovie } from '../../../types/movie.type'
import MovieCard from '../MovieCard/MovieCard'

function MoviesList({ movies } : { movies : IMovie[]}) {
  return (
    <section className="flex flex-row flex-wrap mt-24">

      {movies.length > 0 && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {movies.length == 0 && (
        <p className="h-screen">Aucun film trouvé.</p>
      )}

    </section>
  )
}

export default MoviesList