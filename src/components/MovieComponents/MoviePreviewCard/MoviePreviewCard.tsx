import { Link } from 'react-router-dom'
import type { IMovie } from '../../../types/movie.type'
import { FaPlay } from 'react-icons/fa'
import { IoIosAddCircleOutline } from "react-icons/io";


// A supprimer !
const isFavorite = false;

function addToMyFavorites() {
  console.log("added");
}

function MoviePreviewCard({ movie }: { movie: IMovie, isShown: boolean }) {
  return (
    <div
      className={`shadow-lg shadow-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1
         bg-primary-bg transition-opacity duration-600 opacity-0 hover:opacity-100 hover:w-[400px]
          rounded-2xl rounded-t-3xl`}
    >

      {/* Video */}
      <Link className='rounded-t-lg' to={'/browse/movies/' + movie.id}>
        <img
          className='w-full rounded-t-3xl h-3/5'
          src={`/assets/${movie.get_image}`}
          alt="movie image"
        />
      </Link>


      <div className='p-6'>
        
        {/* Options */}
        <div className='flex justify-between m-6'>

          <div className='flex flex-row justify-between items-center'>

            <Link to={'/browse/movies/' + movie.id}>
              <FaPlay className='mr-6 text-2xl transition duration-75 hover:text-gray-400' />
            </Link>

            {!isFavorite && (
              <button className='hover:text-gray-400 text-3xl hover:cursor-pointer' onClick={addToMyFavorites}>
                <IoIosAddCircleOutline />
              </button>
            )}

            {/* {isFavorite && (
              <button onClick={removeFromMyFavorites}>
                <MdFavorite className='fill-primary' />
              </button>
            )} */}
            
          </div>

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

    </div>
  )
}

export default MoviePreviewCard