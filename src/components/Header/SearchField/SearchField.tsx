import { useNavigate, useSearchParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";

function SearchField() {

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchInput.length === 0) navigate("/");

    // Ne rien faire si la recherche fait moins de 2 lettres
    if (searchInput.length < 2) return;

    setSearchParams({ input: searchInput })
    navigate(`/search?input=${searchInput}`);
    
    // const params = new URLSearchParams("search");
    // params.set("input", searchInput);
    // setSearchParams(params, {
    //   preventScrollReset: true,
    // });
  }, [searchInput])

  return (
    <div className="hidden md:flex mr-4 items-center">
      <input
        className='bg-black py-2 px-4 rounded-full w-64'
        type="text"
        name="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
        placeholder="Search..."
      />
      <FaMagnifyingGlass className="cursor-pointer ml-3" />
    </div >
  )
}

export default SearchField;