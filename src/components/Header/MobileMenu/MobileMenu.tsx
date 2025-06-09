import { Link, useNavigate } from "react-router-dom";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@heroui/dropdown";



function MobileMenu() {

  const navigate = useNavigate();

  return (
    <div className="mr-12 flex">

      <Dropdown className="text-gray-300 text-xl bg-black opacity-75 border-1 px-4 py-2">

        <DropdownTrigger>
          <img src="/logo.jpeg" alt="Logo" width={80} height={80} />
        </DropdownTrigger>

        <DropdownMenu aria-label="Static Actions">
          <DropdownItem className="mb-3" key="mon-compte">
            <Link to='/'>Accueil</Link>
          </DropdownItem>
          <DropdownItem className="mb-3" key="mon-compte">
            <Link to='/parcourir/films'>Films</Link>
          </DropdownItem>
          <DropdownItem className="mb-3" key="mon-compte">
            <Link to='/parcourir/genres'>Genres</Link>
          </DropdownItem>
          <DropdownItem className="mb-3" key="mon-compte">
            <Link to='/mes-favoris'>Favoris</Link>
          </DropdownItem>
        </DropdownMenu>

      </Dropdown>
    </div>
  )
}

export default MobileMenu