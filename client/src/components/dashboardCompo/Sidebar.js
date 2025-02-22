import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/dashboardCSS/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  return (
    <>
      <section id="sidebar" className={isOpen ? "" : "hide"}>
        <NavLink to="/admin/dashboard" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </NavLink>
        <ul className="side-menu top">
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <NavLink to="/admin/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/admin/allproducts" ? "active" : ""}>
            <NavLink to="/admin/allproducts">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Product</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/admin/allcategories" ? "active" : ""}>
            <NavLink to="/admin/allcategories">
              <i className='bx bxs-category'></i>
              <span className='text'>Categories</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/admin/alladminusers" ? "active" : ""}>
            <NavLink to="/admin/alladminusers">
            <i className='bx bxs-user-badge'></i>  
              <span className="text">Admin Users</span>
            </NavLink>
          </li>
        </ul>

        <ul className="side-menu">
          <li className={location.pathname === "/admin/dashboard4" ? "active" : ""}>
            <NavLink to="/admin/dashboard">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/admin/dashboard5" ? "active" : ""}>
            <NavLink to="/admin/dashboard" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
