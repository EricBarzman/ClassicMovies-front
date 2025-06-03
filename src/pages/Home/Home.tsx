import { useEffect, useState } from "react"

import { useTypedSelector } from "../../redux/redux.type"

import type { IMovie } from "../../types/movie.type"
import { useMovies } from "../../firebase/movies/movieHooks"

import MovieVideo from "../../components/MovieComponents/MovieVideo/MovieVideo"
import MovieCard from "../../components/MovieComponents/MovieCard/MovieCard"

function Home() {

  const user = useTypedSelector((state) => state.user)
  const [randomMovie, setRandomMovie] = useState<IMovie>({
    id: 0,
    title: "",
    slug: "",
    genreId: "",
    decadeChoice: "",
    get_image: "",
    keywords: [],
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
  
  const [movies, setMovies] = useState<IMovie[]>([{
    id: 0,
    title: "",
    slug: "",
    genreId: "",
    decadeChoice: "",
    get_image: "",
    keywords: [],
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
  }]);

  /* C'est ici qu'on voit les limites de Firebase
  /  Impossible de sortir une entrée random de la base
  */
  function pickRandomMovie() {
    const index = 
    console.log(index);
    
    return movies[index];
  }

  const { getMoviesWithDirectorInfo } = useMovies();

  useEffect(() => {
    document.title = 'Home | Classic Movies';
    getMoviesWithDirectorInfo()
      .then(response => {
        setMovies(response);
        // Pick a random index then a random film in the movies array
        const newIndex = Math.round(Math.random() * response.length)
        setRandomMovie(movies[newIndex]);
      })
  }, []);

  return (
    <main className='text-white px-10 py-4'>

      <h2 className='mt-6 ml-10 mb-20 capitalize text-4xl font-semibold'>
        Welcome back, {user.email}!
      </h2>

      {randomMovie?.youtube_url && (
        <MovieVideo youtube_id={randomMovie?.youtube_url!} />
      )}
      <MovieVideo youtube_id="zxq60I5RSW8"/>
      

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

export default Home