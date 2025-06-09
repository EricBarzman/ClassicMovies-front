import { Link } from 'react-router-dom'
import type { IMovie } from '../../../types/movie.type'
import { FaPlay } from 'react-icons/fa'
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { useFavorites } from '../../../firebase/users/userHook';
import { useTypedSelector } from '../../../redux/redux.type';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateFavorites } from '../../../redux/features/favorites';


function MoviePreviewCard({ movie }: { movie: IMovie, isShown: boolean }) {

  const { addToFavorites, deleteFromFavorites } = useFavorites();

  const user = useTypedSelector(state => state.user);
  const favorites = useTypedSelector(state => state.favorites.mesFavoris);
  const favoriteFound = favorites.find(fav => fav.movieId === movie.id); 
  const isFavorite = favoriteFound !== undefined; 

  const dispatch = useDispatch();

  async function addToMyFavorites() {
    try {
      await addToFavorites({
        movieId: movie.id,
        userId: user.userId,
      });
      dispatch({ type: 'FETCH_FAVORITES' });
      toast("Ajouté à vos favoris !");

    } catch (error) {
      toast.error("Une erreur s'est produite. Réessayez")
      console.error("Impossible d'ajouter aux favoris: ", error);
    }
  }

  async function removeFromMyFavorites() {
    await deleteFromFavorites(favoriteFound!.id);
    dispatch({ type: 'FETCH_FAVORITES' });
    toast("Retiré de vos favoris !");
  }


  return (
    <div
      className={`shadow-lg shadow-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1
         bg-primary-bg transition-opacity duration-600 opacity-0 hover:opacity-100 w-[400px]
          rounded-2xl rounded-t-3xl`}
    >

      {/* Video */}
      <Link className='rounded-t-lg' to={'/browse/movies/' + movie.id}>
        <img
          className='w-full rounded-t-3xl'
          src={`/assets/${movie.get_image}`}
          alt="movie image"
        />
      </Link>


      <div className='p-6'>

        {/* Options */}
        <div className='flex justify-between m-6'>

          <div className='flex flex-row justify-between items-center'>

            <Link to={'/parcourir/films/' + movie.id}>
              <FaPlay className='mr-6 text-2xl transition duration-75 hover:text-gray-400' />
            </Link>

            {!isFavorite && (
              <button className='hover:text-gray-400 text-3xl hover:cursor-pointer' onClick={addToMyFavorites}>
                <IoIosAddCircleOutline />
              </button>
            )}

            {isFavorite && (
              <button className='hover:text-gray-400 text-3xl hover:cursor-pointer' onClick={removeFromMyFavorites}>
                <IoIosRemoveCircleOutline />
              </button>
            )}

          </div>

        </div>

        <h2 className='font-semibold'>{movie.title}</h2>
        <p className='text-gray-700 mt-3'>{movie.year}</p>
        <p className='text-sm text-gray-400'>
          Dir. by <span className='font-semibold'>{movie.director.firstName} {movie.director.lastName}</span>
        </p>
        <ul className='m-4 flex'>
          {movie.keywordsList.map((keyword, index, arr) => (
            <li key={index} className=''>
              {keyword.label}{index !== (arr.length - 1) && (<span className='mx-1'>{` - `}</span>)}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default MoviePreviewCard