import { useFavorites } from "../../firebase/users/userHook";
import { updateFavorites } from "./favorites";

/**
 * 
 * Récupère dans l'API les favoris de l'utilisateur
 */
const favoriteMiddleware = (store) => (next) => (action) => {
    if (action.type === 'FETCH_FAVORITES') {
      useFavorites().getUserFavorites(store.getState().user.userId)
        .then((response) => {
          store.dispatch(updateFavorites(response))
        });
    }
    next(action);
  };
  
  export default favoriteMiddleware;
  