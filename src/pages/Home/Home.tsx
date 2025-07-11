import { useEffect, useState } from "react"

import { useTypedSelector } from "../../redux/redux.type"

import type { IMovie } from "../../types/movie.type"
import { useMovies } from "../../firebase/movies/movieHooks"
import { shuffleArr } from "../../utils/shuffleArray";

import MovieVideo from "../../components/MovieComponents/MovieVideo/MovieVideo"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList";

import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { useLocation } from "react-router-dom";

function Home() {

  const user = useTypedSelector((state) => state.user);
  const location = useLocation();

  const [randomMovie, setRandomMovie] = useState<IMovie>({
    id: "",
    title: "",
    slug: "",
    genreId: "",
    decadeChoice: "",
    get_image: "",
    keywords: [],
    keywordsList: [],
    shortDescription: "",
    year: 0,
    directorId: "",
    director: {
      id: "",
      firstName: "",
      lastName: "",
      countryId: ""
    },
    youtube_url: ""
  });

  const [movies, setMovies] = useState<IMovie[]>([]);

  const { getMoviesWithDirectorInfo } = useMovies();

  useEffect(() => {
    window.scroll(0, 0);
    document.title = 'Accueil | Classic Movies';
    getMoviesWithDirectorInfo()
      .then(response => {
        shuffleArr(response);
        setMovies(response.slice(0, 5))
      })
  }, []);

  useEffect(() => {
    // Pick a random index then a random film in the movies array
    const newIndex = Math.round(Math.random() * movies.length);
    setRandomMovie(movies[newIndex]);
  }, [movies, location])

  return (
    <main className='text-white px-10 py-4 relative'>

      {user.username && (
        <h2 className='mt-6 ml-10 mb-20 text-xl md:text-4xl font-semibold'>
          Content de vous revoir, {user.username} !
        </h2>
      )}

      {!user.username && (
        <h2 className='mt-6 ml-10 mb-20 text-xl md:text-4xl font-semibold'>
          Un catalogue sans fond !
        </h2>
      )}

      {randomMovie?.youtube_url && (
        <MovieVideo youtube_id={randomMovie?.youtube_url!} />
      )}

      {movies.length === 0 && <LoadingSpinner />}
      <MoviesList movies={movies} />

    </main>
  )
}

export default Home