import { Link } from "react-router-dom";
import Searchbar from "./searchBar";
import NavIcon from "./navIcon";
import SignUpButton from "./SignUpButton";


function Header() {

  return (
    <div className="h-20 bg-[rgba(231,229,229,0.64)] px-4 md:px-8 lg:px-16 xl:px-16 2xl:px-64 fixed top-0 left-0 right-0 z-50 shadow-md backdrop-blur-lg">
      <div className="h-full flex items-center sm:justify-evenly justify-between  w-full">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={require("../../assets/images/e-cartLogo.png")}
              alt="E-kart Logo"
              width={80}
              height={24}
            />
          </Link>
        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-1 justify-center">
            <Searchbar className="" />
          </div>
          <SignUpButton />
          <NavIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
