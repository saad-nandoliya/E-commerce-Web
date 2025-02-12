import { FaSearch } from "react-icons/fa";

const SearchbarSmall = () => {
  return (
    <form className=" md:hidden sm:flex flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md w-full my-2">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none w-full"
      />
      <button className="cursor-pointer">
        <FaSearch className="" />
      </button>
    </form>
  );
}

export default SearchbarSmall;