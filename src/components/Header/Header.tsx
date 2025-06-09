import { Link } from "react-router-dom"
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Header() {

  return (
    <header className="max-w-screen z-2 bg-primary-bg py-2 px-8 sticky top-0 w-full">
      <nav className="flex flex-wrap md:flex-nowrap items-center justify-between">

        <div className="flex">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.jpeg" alt="Logo" width={80} height={80} />
          </Link>

          {/* Options */}
          <ul className="flex flex-col font-light text-white sm:flex-row ml-6 leading-tight md:text-sm items-center justify-between">

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

        </div>


        <div className="flex items-center">
          {/* <div className="mr-8">Chercher...</div> */}
          <BurgerMenu />


        </div>

      </nav>
    </header>
  )
}

export default Header