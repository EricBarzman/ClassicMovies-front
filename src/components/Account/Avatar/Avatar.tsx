import React, { useEffect, useState } from 'react'
import { useAvatars, useUsersCollection } from '../../../firebase/users/userHook'
import { IAvatar } from '../../../types/user.type';
import toast from 'react-hot-toast';
import { useTypedSelector } from '../../../redux/redux.type';
import { useDispatch } from 'react-redux';

function Avatar() {

  const [avatars, setAvatars] = useState<IAvatar[]>([]);
  const { getAvatars } = useAvatars();

  const user = useTypedSelector(state => state.user);
  const { updateUser, getUserByFirebaseId } = useUsersCollection();

  const dispatch = useDispatch();

  // Charger les avatars
  useEffect(() => {
    getAvatars().then(res => {
      setAvatars(res);
    });
  }, [])

  // Changer d'avatar
  async function handleAvatarClick(e: any) {
    const confirmation = confirm("Voulez-vous changer d'avatar ?");
    if (!confirmation) return

    try {
      const chosenAvatar = avatars.find(av => av.avatarId === parseInt(e.currentTarget.id));
      let firebaseUser = await getUserByFirebaseId(user.userId);
      if (!firebaseUser) throw new Error("Impossible de trouver l'utilisateur");
      await updateUser(firebaseUser.id, {
        avatar: chosenAvatar,
      })
      toast.success("Avatar mis à jour !");
      dispatch({ type: 'UPDATE_USER_INFO' });

    } catch (error) {
      toast.error("Erreur");
      console.error(error);
    }
  }

  return (
    <section>
      <h3 className='fond-bold mb-4'>Changez votre avatar</h3>
      <div className='mb-6'>
        <h3>Votre avatar</h3>
        <img
          className="w-[250px] h-[150px]"
          src={`/avatars/${user.avatar}`}
          alt="avatar"
        />
      </div>

      <div>
        <div className='grid grid-cols-3'>
          {avatars.map((avatar) => (
            <div
              id={avatar.avatarId.toString()}
              key={avatar.avatarId}
              onClick={handleAvatarClick}
              className="m-4 p-2 cursor-pointer border-white hover:border-gray-500 border-1"
            >
              <img
                className="w-[250px] h-[120px]"
                src={`/avatars/${avatar.get_image}`}
                alt="avatar"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Avatar