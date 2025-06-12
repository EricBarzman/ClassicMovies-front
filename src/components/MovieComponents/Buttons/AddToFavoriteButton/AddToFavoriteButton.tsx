import { useDispatch } from 'react-redux';
import { useFavorites } from '../../../../firebase/users/userHook';
import { useTypedSelector } from '../../../../redux/redux.type';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from "react-icons/io";


function AddToFavoriteButton({ movieId } : { movieId : string}) {

  const { addToFavorites } = useFavorites();
  const dispatch = useDispatch();
  const user = useTypedSelector(state => state.user);

  async function addToMyFavorites() {
    try {
      await addToFavorites({
        movieId: movieId,
        userId: user.userId,
      });
      dispatch({ type: 'FETCH_FAVORITES' });
      toast.success("Ajouté à vos favoris !");

    } catch (error) {
      toast.error("Une erreur s'est produite. Réessayez")
      console.error("Impossible d'ajouter aux favoris: ", error);
    }
  }

  return (
    <button className='hover:text-gray-400 text-3xl hover:cursor-pointer' onClick={addToMyFavorites}>
      <IoIosAddCircleOutline />
    </button>
  )
}

export default AddToFavoriteButton