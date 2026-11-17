import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingBag, FaChevronDown, FaHeart, FaBox, FaSignInAlt, FaUser, FaTimes, FaCartPlus, FaSearch } from "react-icons/fa"; 
import { IoCloseCircle } from "react-icons/io5";
import { UseAppContext } from "../Context/AppContext";
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenL, setDropdownOpenL] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  const context = UseAppContext();
  if (!context) {
    return <div className="loading">Loading...</div>;
  }
  const { user, logout, setsearchqurey } = context;
  const navigate = useNavigate();
  const location = useLocation(); 

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setsearchqurey(searchInput);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchInput, setsearchqurey]);

  // Clear search when navigating away from product pages
  useEffect(() => {
    const productPages = ['/products', '/oldproducts'];
    const isProductPage = productPages.some(page => location.pathname.startsWith(page));
    
    if (!isProductPage && searchInput) {
      setSearchInput("");
      setsearchqurey("");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login"); 
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setsearchqurey("");
  };

  // Show search bar only on product pages
  const showSearchBar = location.pathname === '/products' || location.pathname === '/oldproducts';

  return (
    <>
      <nav className="bg-[#263238] shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Sidebar Button */}
          <div className="md:hidden">
            <button 
              className="text-3xl text-white cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              &#8801;
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="h-16 w-36 md:h-20 md:w-40 object-contain" src="/logo1.png" alt="Logo" />
          </Link>

          {/* Main Nav Links */}
          <ul className="md:flex items-center hidden font-medium gap-6 lg:gap-8 text-base lg:text-lg text-white">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                <FaHome className="text-xl" />
                <span className="hidden lg:inline">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                <FaShoppingBag className="text-xl" />
                <span className="hidden lg:inline">Shop</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/oldproducts" 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                <FaHeart className="text-xl" />
                <span className="hidden lg:inline">Used</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                <FaCartPlus className="text-xl" />
                <span className="hidden lg:inline">Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/myorders" 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                <FaBox className="text-xl" />
                <span className="hidden lg:inline">Orders</span>
              </NavLink>
            </li>
          </ul>

          {/* User Section */}
          <div className="relative text-white flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="cursor-pointer font-semibold flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <FaUser className="text-lg" />
                  <span className="hidden md:inline max-w-[100px] truncate">{user.username}</span>
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 z-50">
                    <Link 
                      to='/changepassword' 
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Change Password
                    </Link>
                    <Link 
                      to='/wishlist' 
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors border-t border-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Wish List
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpenL(!dropdownOpenL)} 
                  className="flex items-center gap-2 bg-primary px-4 py-2 text-white rounded-lg hover:bg-primary/80 transition-all duration-200 font-medium shadow-md"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Login</span>
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${dropdownOpenL ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Login Dropdown */}
                {dropdownOpenL && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 z-50">
                    <NavLink 
                      to="/login" 
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setDropdownOpenL(false)}
                    >
                      Login as Buyer
                    </NavLink>
                    <NavLink 
                      to="/Sellerlogin" 
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors border-t border-gray-100"
                      onClick={() => setDropdownOpenL(false)}
                    >
                      Login as Seller
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - Shows only on product pages */}
        {showSearchBar && (
          <div className="px-4 pb-3 md:px-6">
            <div className="max-w-2xl mx-auto relative">
              <div className="relative flex items-center">
                <FaSearch className="absolute left-4 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products by name..."
                  className="w-full pl-12 pr-12 py-3 rounded-lg text-gray-700 bg-white border-2 border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-gray-400"
                />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Clear search"
                  >
                    <IoCloseCircle className="text-2xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar for Small Screens */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-transform duration-300 transform z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden shadow-2xl`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <span className="text-xl font-bold">Menu</span>
          <button 
            className="text-2xl hover:text-primary transition-colors" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <ul className="p-4 space-y-2 text-base">
          <li>
            <NavLink 
              to="/" 
              onClick={() => setIsSidebarOpen(false)} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaHome className="text-xl" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              onClick={() => setIsSidebarOpen(false)} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaShoppingBag className="text-xl" /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/oldproducts" 
              onClick={() => setIsSidebarOpen(false)} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaHeart className="text-xl" /> Used Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cart" 
              onClick={() => setIsSidebarOpen(false)} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaCartPlus className="text-xl" /> Cart
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/myorders" 
              onClick={() => setIsSidebarOpen(false)} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaBox className="text-xl" /> My Orders
            </NavLink>
          </li>
          <li className="pt-4 border-t border-gray-700 mt-4">
            {user ? (
              <>
                <div className="px-4 py-2 mb-2 text-sm text-gray-300">
                  <FaUser className="inline mr-2" />
                  {user.username}
                </div>
                <NavLink 
                  to="/wishlist" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaHeart className="text-xl" /> Wishlist
                </NavLink>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsSidebarOpen(false);
                  }} 
                  className="flex items-center gap-3 bg-red-500 px-4 py-3 rounded-lg w-full text-left hover:bg-red-600 transition-colors mt-2"
                >
                  <FaSignInAlt className="text-xl" /> Logout
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                onClick={() => setIsSidebarOpen(false)} 
                className="flex items-center gap-3 bg-primary px-4 py-3 rounded-lg w-full text-left hover:bg-primary/80 transition-colors"
              >
                <FaSignInAlt className="text-xl" /> Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;