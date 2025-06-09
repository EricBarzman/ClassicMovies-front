import { Link } from 'react-router-dom'

function DesktopMenu() {
  return (
    <div className="flex">
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

    </div>
  )
}

export default DesktopMenu