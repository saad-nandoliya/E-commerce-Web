import { FaSearch } from "react-icons/fa";

function Searchbar() {
  return (
    <form className="flex  items-center justify-between gap-4 bg-gray-100 p-2 rounded-md w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]">
      <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" />
      <button className="cursor-pointer">
        <FaSearch className="" />
      </button>
    </form>
  );
}

export default Searchbar;
