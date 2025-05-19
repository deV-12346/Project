import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingBag, FaChevronDown, FaHeart, FaBox, FaSignInAlt, FaUser, FaTimes, FaCartPlus } from "react-icons/fa"; 
import { UseAppContext } from "../Context/AppContext"; // Import authentication context
import {Link} from 'react-router-dom'
import Getoffers from "./Getoffers";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenL, setDropdownOpenL] = useState(false);
  const { user, logout ,setsearchqurey } = UseAppContext(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); // Call logout function
    setDropdownOpen(false); // Close dropdown
      navigate("/login"); 
   };

  return (
    <>
      <nav className="bg-[#263238]">
        <div className="flex items-center justify-between p-1">
          {/* Sidebar Button */}
          <div className="md:hidden">
            <button className="text-4xl text-white cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
              &#8801;
            </button>
          </div>

          {/* Logo */}
          <div>
            <img className="h-20 w-40" src="/logo1.png" alt="Logo" />
          </div>

          {/* Main Nav Links */}
          <ul className="md:flex items-center hidden font-medium gap-8 text-xl text-white">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaHome className="text-2xl" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaShoppingBag className="text-xl" /> Shop
              </NavLink>
            </li>
             <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaCartPlus className="text-xl" /> Cart
              </NavLink>
            </li>
            <li className="relative flex items-center w-60">
              <input type="text" onChange={(e)=>setsearchqurey(e.target.value)} placeholder="Search products..." className="w-full px-5 py-2 font-normal border-gray-400 rounded-xl text-gray-500 outline-none bg-white" />
            </li>
            <li>
              <NavLink to="/oldproducts" className={({ isActive }) => isActive ?" text-primary border-b-2 border-primary pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaShoppingBag className="text-xl" />Old Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/myorders" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary pb-1 flex items-center gap-2" : "hover:text-gray-500 flex items-center gap-2"}>
                <FaBox className="text-xl" /> My Orders
              </NavLink>
            </li>
          </ul>

          {/* User Section */}
          <div className="relative text-white">
            {user ? (
              <div className="relative">
                {/* Clickable User Icon with Username */}
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer font-semibold flex items-center gap-2 hover:underline">
                  <FaUser className="text-xl" /> { user.username}  {/* Display sellername or username */}
                  <FaChevronDown />
                </button>

                {/* Dropdown Logout Button */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-42 bg-gray-100 rounded-md shadow-lg">
                    <Link  to='/changepassword' className="block rounded  w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-300">
                      Change Password
                    </Link>
                    <button onClick={handleLogout} className="block rounded w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-300">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <NavLink onClick={() => setDropdownOpenL(!dropdownOpenL)} className="flex items-center gap-2 text-2xl px-6 py-[6px] rounded-xl  bg-primary   hover:bg-primary-dull">
                  <FaSignInAlt className="text-xl" /> Login
                </NavLink>
                
                {/* Dropdown for Login Choices */}
                {dropdownOpenL && (
                  <div className="absolute right-0 mt-2 w-42 bg-gray-100 rounded-md shadow-lg">
                    <NavLink to="/login" key="buyer-login" className="block rounded  w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-300">
                      Log in as Buyer
                    </NavLink>
                    <NavLink to="/Sellerlogin" key="seller-login" className="block rounded  w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-300">
                      Login as Seller
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for Small Screens */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-xl font-semibold">Menu</span>
          <button className="text-2xl" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <ul className="p-4 space-y-4 text-lg">
          <li>
            <NavLink to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaShoppingBag /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/oldproducts" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaHeart /> Old Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaBox /> Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/myorders" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaBox /> My Orders
            </NavLink>
          </li>
          <li>
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-3 bg-red-500 px-3 py-2 rounded-lg w-full text-left hover:bg-red-700">
                <FaSignInAlt /> Logout
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 bg-amber-400 px-3 py-2 rounded-lg text-black hover:bg-amber-300">
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <div>
         <Getoffers />
      </div>
    </>
  );
};

export default Navbar;