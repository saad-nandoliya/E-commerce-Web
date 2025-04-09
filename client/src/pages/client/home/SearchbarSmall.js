import { FaSearch } from "react-icons/fa";

const SearchbarSmall = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <form className=" md:hidden sm:flex flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md w-full my-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="bg-transparent outline-none w-full"
      />
      <button
        onClick={onSearch}
        className="cursor-pointer">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchbarSmall;