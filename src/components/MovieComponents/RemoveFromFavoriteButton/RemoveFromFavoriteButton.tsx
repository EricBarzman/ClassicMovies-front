import { useDispatch } from 'react-redux';
import { useFavorites } from '../../../firebase/users/userHook';
import toast from 'react-hot-toast';
import { IoIosRemoveCircleOutline } from "react-icons/io";


function RemoveFromFavoriteButton({ favoriteId }: { favoriteId: string }) {

  const dispatch = useDispatch();
  const { deleteFromFavorites } = useFavorites();

  async function removeFromMyFavorites() {
    await deleteFromFavorites(favoriteId);
    dispatch({ type: 'FETCH_FAVORITES' });
    toast.success("Retiré de vos favoris !");
  }

  return (
    <button className='hover:text-gray-600 text-gray-500 text-3xl hover:cursor-pointer' onClick={removeFromMyFavorites}>
      <IoIosRemoveCircleOutline />
    </button>
  )
}

export default RemoveFromFavoriteButton