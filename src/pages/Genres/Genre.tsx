import { useEffect, useState } from 'react'
import { IGenre, IMovie } from '../../types/movie.type'
import { useGenres } from '../../firebase/movies/genreHooks';
import { useMovies } from '../../firebase/movies/movieHooks';

import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

function Genre() {

  const [movies, setMovies] = useState<IMovie[]>([])
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [chosenGenre, setChosenGenre] = useState<IGenre>();

  const { getGenres } = useGenres();
  const { getMoviesWithDirectorInfo } = useMovies();

  useEffect(() => {
    getGenres().then(res => {
      setGenres(res);
      setChosenGenre(res[0]);
    });
  }, [])

  useEffect(() => {
    getMoviesWithDirectorInfo().then(list => {
      const filteredList = list.filter(item => item.genreId === chosenGenre?.id)
      setMovies(filteredList);
    });
  }, [chosenGenre])

  function searchMoviesByGenre(e) {
    setChosenGenre(genres.find(genre => genre.id === e.target.value));
  };

  if (genres.length === 0) return <LoadingSpinner />

  return (
    <main className='px-10 py-4 relative'>

      <div className="mt-12 ml-4 flex items-center">

        <h2 className="text-2xl font-bold mr-8">Chercher par genre</h2>

        <select
          onChange={searchMoviesByGenre}
          className="bg-black p-3 rounded-lg flex flex-wrap text-gray-600"
          name="genre"
        >
          <option disabled>- Genre -</option>
          {genres.map((genre) => (
            <option key={genre.slug} value={genre.id}>
              {genre.label}
            </option>
          ))}
        </select>

        {/* <h3 className="ml-4">OR by</h3>
        <select
          onChange={searchMoviesByCriteria}
          className="bg-black p-3 rounded-lg flex flex-wrap text-gray-600"
          name="country"
        >
          <option selected>- Country -</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select> */}
      </div>
      {movies.length === 0 && <LoadingSpinner />}
      <MoviesList movies={movies} />
    </main>
  )
}

export default Genre