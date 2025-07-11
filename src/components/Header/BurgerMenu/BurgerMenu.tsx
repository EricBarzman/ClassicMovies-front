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

// import { GoArrowUp } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
// import { useState } from "react";



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
    <div className="md:mr-6 flex items-center">

      <Dropdown className="text-gray-300 bg-black opacity-75 border-1 px-1 py-2">

        <DropdownTrigger>
          <img src={`/avatars/${avatarPath}`} className="w-[70px] h-[60px] hover:cursor-pointer" alt="avatar" />
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

      {/* <GoArrowUp className={`text-2xl transition-all duration-200 rotate-${!isOpen ? '180' : '0'} text-white font-bold`} /> */}

    </div>
  )
}

export default BurgerMenu