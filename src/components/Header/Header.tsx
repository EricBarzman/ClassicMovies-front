import { Link } from "react-router-dom"
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu/MobileMenu";

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
        {!isMobile && (<div className="flex">     
          {/* Logo */}
          <Link to="/">
            <img src="/logo.jpeg" alt="Logo" width={80} height={80} />
          </Link>

          {/* Options */}
          <ul className="hidden font-light text-white md:flex ml-6 leading-tight md:text-sm items-center justify-between">

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/'>Accueil</Link>
            </li>
            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/parcourir/films'>Films</Link>
            </li>

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/parcourir/genres'>Genres</Link>
            </li>

            {/* <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/parcourir/populaires'>Populaires</Link>
            </li> */}

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/mes-favoris'>Favoris</Link>
            </li>
          </ul>

        </div>)}

        {/* Mobile */}
        {isMobile && (
          <MobileMenu />
        )}

        <div className="flex items-center">
          {/* <div className="mr-8">Chercher...</div> */}
          <BurgerMenu />


        </div>

      </nav>
    </header>
  )
}

export default Header