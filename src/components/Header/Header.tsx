import { useEffect, useState } from "react";

import BurgerMenu from "./BurgerMenu/BurgerMenu";
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import SearchField from "./SearchField/SearchField";
import { useTypedSelector } from "../../redux/redux.type";

import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Header() {

  const [isMobile, setIsMobile] = useState(false);

  const user = useTypedSelector(state => state.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Met à jour l'état isMobile en fonction de la largeur de l'écran
    };
    window.addEventListener('resize', handleResize); // Ajoute un écouteur d'événements pour le redimensionnement de la fenêtre

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="max-w-screen z-2 bg-primary-bg py-2 px-8 sticky top-0 w-full">
      <nav className="flex flex-wrap md:flex-nowrap items-center justify-between">

        {/* Desktop */}
        {!isMobile && (<DesktopMenu />)}

        {/* Mobile */}
        {isMobile && (<MobileMenu />)}

        <div className="flex items-center">
          
          <SearchField />
          
           {/* Menu utilisateur */}
          {user.logged && <BurgerMenu />}

          {/* Connexion */}
          {!user.logged && (
            <Link to="/connexion">
              <VscAccount className="text-4xl hover:text-gray-500 duration-200"/>
            </Link>
          )}

        </div>

      </nav>
    </header>
  )
}

export default Header