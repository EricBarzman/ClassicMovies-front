import { useDispatch } from "react-redux";
import { handleLogout } from "../../../redux/features/user";
import { useAuth } from "../../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../redux/redux.type";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { VscAccount } from "react-icons/vsc";



function BurgerMenu() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const user = useTypedSelector(state => state.user);
  // Récupère le path de l'image : parse le state redux avatar
  // qui a été stringified, trouve la prop get_image dans l'objet
  const avatarPath = user.avatar;

  async function handleSignOut() {
    await logout();
    dispatch(handleLogout());
    navigate("/connexion");
  };

  return (
    <div className="md:mr-6 flex">

      <Dropdown className="text-gray-300 bg-black opacity-75 border-1 px-1 py-2">

        <DropdownTrigger>
          <button>
            <img src={`/avatars/${avatarPath}`} className="w-[70px] h-[60px] hover:cursor-pointer" alt="avatar" />
          </button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Static Actions">
          <DropdownItem className="mb-2" key="mon-compte">
            <Link className="flex items-center" to='/mon-compte/profile'>
              <VscAccount /><span className="ml-2">Mon compte</span>
            </Link>
          </DropdownItem>
          <DropdownItem key="sign-out" className="text-danger" color="danger">
            <button
              className="mr-2 hover:cursor-pointer"
              onClick={handleSignOut}>
              Déconnexion
            </button>
          </DropdownItem>
        </DropdownMenu>

      </Dropdown>
    </div>
  )
}

export default BurgerMenu