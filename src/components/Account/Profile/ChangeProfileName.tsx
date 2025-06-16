import { useState } from "react";
import { useTypedSelector } from "../../../redux/redux.type";
import { useUsersCollection } from "../../../firebase/users/userHook";
import { useDispatch } from "react-redux";

import { Button } from "@heroui/button";
import { toast } from 'react-hot-toast';

function ChangeProfileName() {

  const user = useTypedSelector(state => state.user);

  const [editUsername, setEditUsername] = useState(false);
  const [newUserName, setNewUsername] = useState(user.username);

  const dispatch = useDispatch();
  const { updateUser, getUserByFirebaseId } = useUsersCollection();


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let firebaseUser = await getUserByFirebaseId(user.userId);
      if (!firebaseUser) throw new Error("Impossible de trouver l'utilisateur");

      await updateUser(firebaseUser.id, {
        username: newUserName,
      })
      dispatch({ type: 'UPDATE_USER_INFO' });

    } catch (error) {
      toast.error("Echec mise à jour, veuillez réessayer");
      console.error("Impossible de mettre à jour l'utilisateur: ", error);
    }

    setEditUsername(false);
  }

  return (
    <div className='p-4 mt-6'>
      <h3 className="font-bold text-xl mb-6">Nom utilisateur</h3>
      {!editUsername && <button
        className="text-xl hover:cursor-pointer p-2"
        onClick={() => setEditUsername(true)}
      >
        {user.username}
      </button>}
      {editUsername && (
        <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setNewUsername(e.target.value)}
            value={newUserName}
            placeholder={user.username}
            className="border-1 border-gray-300 p-2 mb-4"
          />
          <Button type="submit" className='mt-4 rounded-xl px-6 py-3 bg-teal-700 text-white hover:bg-teal-800 transition-all'>Envoyer les changements</Button>
        </form>
      )}
    </div>
  )
}

export default ChangeProfileName