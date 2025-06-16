import { useState } from "react";
import { useTypedSelector } from "../../../redux/redux.type";
import { useUsersCollection } from "../../../firebase/users/userHook";
import { useDispatch } from "react-redux";

import { Button } from "@heroui/button";
import { toast } from 'react-hot-toast';
import { useAuth } from "../../../firebase/auth";

function ChangeEmailAddress() {

  const user = useTypedSelector(state => state.user);
  const { updateEmailInFirebaseAuth } = useAuth();

  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);

  const dispatch = useDispatch();
  const { updateUser, getUserByFirebaseId } = useUsersCollection();


  async function handleSubmit(e) {
    e.preventDefault();

    // A vérifier : le changement a-t-il été fait sur Authentication ET bdd ?

    try {
      // Update l'utilisateur dans l'authentication firebase
      await updateEmailInFirebaseAuth(newEmail);

      // Update l'utilisateur dans la BDD firestore
      let firebaseUser = await getUserByFirebaseId(user.userId);
      if (!firebaseUser) throw new Error("Impossible de trouver l'utilisateur");
      
      await updateUser(firebaseUser.id, {
        email: newEmail
      });

      // Met à jour Redux
      dispatch({ type: 'UPDATE_USER_INFO' });

      toast.success("Email mis à jour !");

    } catch (error) {
      toast.error("Echec mise à jour, veuillez réessayer");
      console.error("Impossible de mettre à jour l'utilisateur: ", error);
    }

    setEditEmail(false);
  }

  return (
    <div className='p-4 mt-6'>
      <h3 className="font-bold text-xl mb-6">Email</h3>
      {!editEmail && <button
        className="text-xl hover:cursor-pointer p-2"
        onClick={() => setEditEmail(true)}
      >
        {user.email}
      </button>}
      {editEmail && (
        <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            placeholder={user.email}
            className="border-1 border-gray-300 p-2 mb-4"
          />
          <Button type="submit" className='mt-4 rounded-xl px-6 py-3 bg-teal-700 text-white hover:bg-teal-800 transition-all'>Envoyer les changements</Button>
        </form>
      )}
    </div>
  )
}

export default ChangeEmailAddress