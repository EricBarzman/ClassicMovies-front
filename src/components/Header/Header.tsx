import { useEffect, useState } from "react";

import BurgerMenu from "./BurgerMenu/BurgerMenu";
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";

function Header() {

  const [isMobile, setIsMobile] = useState(false);

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
          {/* <div className="mr-8">Chercher...</div> */}
          <BurgerMenu />
        </div>

      </nav>
    </header>
  )
}

export default Header