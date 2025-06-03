import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { handleLogout } from "../../redux/features/user";
import { useAuth } from "../../firebase/auth";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  async function handleSignOut () {
    await logout();
    dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <header className="max-w-screen py-6">
      <nav className="flex flex-wrap md:flex-nowrap items-center justify-between">

        <div className="flex">
          {/* Logo */}
          <Link to="/browse">
            <img src="logo.jpeg" alt="Logo" width={80} height={80} />
          </Link>

          {/* Options */}
          <ul className="hidden font-light text-white md:flex ml-6 leading-tight md:text-sm items-center justify-between">

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/'>Home</Link>
            </li>
            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/movies'>Movies</Link>
            </li>

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/browse/genre'>Genre</Link>
            </li>

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/browse/popular'>Popular</Link>
            </li>

            <li className="mx-2 hover:text-gray-400 duration-500 transition-all">
              <Link to='/my-list'>My List</Link>
            </li>
          </ul>

        </div>


        <div className="flex items-center">
          <div className="mr-8">Search</div>

          <div className="mr-12">
            <button onClick={handleSignOut}>Sign out</button>
            {/* <Link to='/my-account'>
              <img src="" className="w-[50px] h-[50px]" alt="avatar" />
            </Link> */}
          </div>

        </div>

      </nav>
    </header>
  )
}

export default Header