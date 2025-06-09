import { useEffect, useState } from "react"

import { useTypedSelector } from "../../redux/redux.type"

import type { IMovie } from "../../types/movie.type"
import { useMovies } from "../../firebase/movies/movieHooks"
import { shuffleArr } from "../../utils/shuffleArray";

import MovieVideo from "../../components/MovieComponents/MovieVideo/MovieVideo"
import MovieCard from "../../components/MovieComponents/MovieCard/MovieCard"
import MoviesList from "../../components/MovieComponents/MoviesList/MoviesList";

function Home() {

  const user = useTypedSelector((state) => state.user)
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
      id: 0,
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
  }, [movies])

  return (
    <main className='text-white px-10 py-4 relative'>

      <h2 className='mt-6 ml-10 mb-20 text-4xl font-semibold'>
        Content de vous voir, {user.username} !
      </h2>

      {randomMovie?.youtube_url && (
        <MovieVideo youtube_id={randomMovie?.youtube_url!} />
      )}

      <MoviesList movies={movies} />

    </main>
  )
}

export default Home