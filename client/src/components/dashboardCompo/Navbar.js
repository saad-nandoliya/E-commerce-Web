import React, { useState, useEffect } from "react";
import "../../assets/css/dashboardCSS/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSearchForm = (e) => {
    e.preventDefault();
    setSearchFormVisible(!isSearchFormVisible);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <section id="content">
        <nav className="flex justify-between">
          <div>
            <i className="bx bx-menu" onClick={toggleSidebar}></i>
          </div>
          <div>
            <form>
              <div className="form-input">
                <input type="search" placeholder="Search..." />
                <button
                  type="submit"
                  className="search-btn"
                  onClick={toggleSearchForm}
                >
                  <i
                    className={`hidden sm:block bx ${isSearchFormVisible ? "bx-x" : "bx-search"}`}
                  ></i>
                </button>
              </div>
            </form>
          </div>

          <div>
            <NavLink to="/admin/dashboard" className="profile">
              <img
                src={require("../../assets/images/shopping.png")}
                alt="user"
              />
            </NavLink>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
