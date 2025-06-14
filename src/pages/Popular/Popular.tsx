import { useEffect, useState } from "react";
import { useMovies } from "../../firebase/movies/movieHooks";
import { useVotes } from "../../firebase/users/userHook";

import { IMovie, IMovieWithVotes } from "../../types/movie.type";
import { IVote } from "../../types/user.type";

import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import MovieCard from "../../components/MovieComponents/MovieCard/MovieCard";


function Popular() {

  const [votes, setVotes] = useState<IVote[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovieWithVotes[]>([]);

  const { getMoviesWithDirectorInfo } = useMovies();
  const { getAllVotes } = useVotes();

  useEffect(() => {
    // Se placer en haut de la page
    window.scroll(0, 0);
    // Changer le titre
    document.title = 'Populaires | Classic Movies';
    // Charger les films
    getMoviesWithDirectorInfo().then(response => setMovies(response))
    // Charger tous les votes
    getAllVotes().then(res => setVotes(res))
  }, []);

  useEffect(() => {
    // Pour chaque film, retrouver tout ses votes
    const newArrMovies = movies.map(movie => ({
      ...movie,
      // Compte les votes d'un film
      votes: votes
        .filter(vote => vote.movieId === movie.id)
        .reduce(function (a, b) { return a + b.value }, 0)
    }))
    // Trier par ordre de vote
    const filtered = newArrMovies
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 4); // n'en garder que 5

    setFilteredMovies(filtered);
  }, [movies])

  return (
    <main className='text-white px-10 py-4 relative'>

      <h2 className="md:text-2xl text-lg mt-12 mb-12 ml-4 font-bold">Films les plus populaires</h2>

      {filteredMovies.length === 0 && <LoadingSpinner />}
      {filteredMovies.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {filteredMovies.map(movie => (
            <div>
              <h2 className="text-gray-500">Votes : <span className="text-white">{movie.votes}</span> </h2>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Popular