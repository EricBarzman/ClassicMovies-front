import { useUsersCollection } from "../../firebase/users/userHook";
import { updateUser } from "./user";

/**
 * 
 * Récupère les infos utilisateur
 */
const userMiddleware = (store) => (next) => (action) => {
  if (action.type === 'UPDATE_USER_INFO') {
    const firebaseId = store.getState().user.userId
    useUsersCollection().getUserByFirebaseId(firebaseId)
      .then((res) => store.dispatch(updateUser({
        email: res?.email,
        username: res?.username,
        avatar: res?.avatar.get_image,
        userId: firebaseId,
      })))
      .catch(err => console.error(err));
  }
  next(action);
};

export default userMiddleware;
