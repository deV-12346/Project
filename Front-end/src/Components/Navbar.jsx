import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingBag, FaChevronDown, FaHeart, FaBox, FaSignInAlt, FaUser, FaTimes } from "react-icons/fa"; 
import { useAuth } from "../Context/authcontext"; // Import authentication context

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenL, setDropdownOpenL] = useState(false);
  const { user, logout } = useAuth(); // Get user & logout function
  const navigate = useNavigate(); // Navigation hook

  const handleLogout = () => {
    logout(); // Call logout function
    setDropdownOpen(false); // Close dropdown
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    console.log(user);  // Check the user object for debugging purposes
  }, [user]);  // Log user whenever it changes

  return (
    <>
      <nav className="bg-[#263238]">
        <div className="flex items-center justify-between p-3">
          {/* Sidebar Button */}
          <div className="md:hidden">
            <button className="text-4xl text-white cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
              &#8801;
            </button>
          </div>

          {/* Logo */}
          <div>
            <img className="h-20 w-40" src="../src/logo/logo1.png" alt="Logo" />
          </div>

          {/* Main Nav Links */}
          <ul className="md:flex items-center hidden font-medium gap-12 text-2xl text-white">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaHome className="text-2xl" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => isActive ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaShoppingBag className="text-xl" /> Shop
              </NavLink>
            </li>
            <li className="relative flex items-center w-70">
              <input type="text" placeholder="Search products..." className="w-full px-5 py-2 font-mono border-gray-400 rounded-xl text-gray-500 outline-none bg-white" />
            </li>
            <li>
              <NavLink to="/mywishlist" className={({ isActive }) => isActive ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-2" : "hover:text-gray-300 flex items-center gap-2"}>
                <FaHeart className="text-xl" /> Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink to="/myorders" className={({ isActive }) => isActive ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-2" : "hover:text-gray-500 flex items-center gap-2"}>
                <FaBox className="text-xl" /> My Orders
              </NavLink>
            </li>
          </ul>

          {/* User Section */}
          <div className="relative text-red-500">
            {user ? (
              <div className="relative">
                {/* Clickable User Icon with Username */}
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer font-semibold flex items-center gap-2 hover:underline">
                  <FaUser className="text-xl" /> {user.sellername || user.username}  {/* Display sellername or username */}
                  <FaChevronDown />
                </button>

                {/* Dropdown Logout Button */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-42 bg-white rounded-md shadow-lg">
                    <button onClick={handleLogout} className="block rounded bg-amber-200 w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-400">
                      Change Password
                    </button>
                    <button onClick={handleLogout} className="block rounded bg-amber-200 w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-400">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <NavLink onClick={() => setDropdownOpenL(!dropdownOpenL)} className="flex items-center gap-2 text-2xl px-3 py-2 rounded-xl bg-amber-400 text-black hover:bg-amber-200">
                  <FaSignInAlt className="text-xl" /> Login
                </NavLink>
                
                {/* Dropdown for Login Choices */}
                {dropdownOpenL && (
                  <div className="absolute right-0 mt-2 w-42 bg-white rounded-md shadow-lg">
                    <NavLink to="/login" key="buyer-login" className="block rounded bg-amber-200 w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-400">
                      Log in as Buyer
                    </NavLink>
                    <NavLink to="/Sellerlogin" key="seller-login" className="block rounded bg-amber-200 w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-400">
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
            <NavLink to="/shop" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaShoppingBag /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/mywishlist" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 hover:text-gray-400">
              <FaHeart /> Wishlist
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
    </>
  );
};

export default Navbar;