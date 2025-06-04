import { Link } from 'react-router-dom'
import type { IMovie } from '../../../types/movie.type'
import { FaPlay } from 'react-icons/fa'

function MoviePreviewCard({ movie, isShown }: { movie: IMovie, isShown: boolean }) {
  return (
    <div
      className={`w-[400px] absolute z-1 bg-primary-bg transition-all duration-1000 rounded-2xl rounded-t-2xl ${isShown ? 'visible' : 'hidden'}`}
    >

      {/* Video */}
      <Link to={'/movies/' + movie.slug}>
        <img
          className='w-full h-3/5'
          src={`./assets/${movie.get_image}`}
          alt="movie image"
        />
      </Link>


      {/* Options */}
      <div className='flex flex-row justify-between m-6'>
        <Link to={'/movies/' + movie.slug}>
          <FaPlay />
        </Link>

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

      <h2 className='font-semibold'>{movie.title}</h2>

      <p className='text-gray-700 mt-3'>{movie.year}</p>

      <p className='text-sm text-gray-400'>
        Dir. by <span className='font-semibold'>{movie.director.firstName} {movie.director.lastName}</span>
      </p>

      <ul className='m-4 flex'>
        {movie.keywordsList.map((keyword, index, arr) => (
          <li className=''>
            {keyword.label}{index !== (arr.length - 1) && (<span className='mx-1'>{` - `}</span>)}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default MoviePreviewCard