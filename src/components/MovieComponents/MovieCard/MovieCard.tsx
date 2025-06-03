import { Link } from "react-router-dom";
import type { IMovie } from "../../../types/movie.type";
import { FaPlay, } from "react-icons/fa";

function MovieCard({ movie }: { movie: IMovie }) {
  
  return (
    <article className='w-[245px] mx-1 mb-6'>

      <Link to={'/movies/' + movie.slug}>
        <img className='rounded-lg' src={`./assets/${movie.get_image}`} alt="movie image" />
      </Link>

      <h2 className='font-semibold'>{movie.title}</h2>

      <p className='text-gray-700 mt-3'>{movie.year}</p>

      <p className='text-sm text-gray-400'>
        Dir. by <span className='font-semibold'>{movie.director.firstName} {movie.director.lastName}</span>
      </p>

      <div className='ml-4 mr-10 mt-4 flex flex-row justify-between'>
        <button>
          <Link to={'/movies/' + movie.slug}><FaPlay /></Link>
        </button>

        {/* {!isFavorite && (
          <button onClick={addToMyFavorites}>
            <MdFavoriteBorder />
          </button>
        )} */}

        {/* {isFavorite && (
          <button onClick={removeFromMyFavorites}>
            <MdFavorite className='fill-primary' />
          </button>
        )} */}

      </div>

    </article>
  )
}

export default MovieCard