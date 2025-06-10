import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../redux/redux.type";

function RequireAuth({ children }) {

  const { userId } = useTypedSelector(state => state.user);
  const location = useLocation();

  return userId ? (
    children
  ) : (
    <Navigate to="/connexion" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth