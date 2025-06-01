import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#263238] text-white">
      <div className="max-w-screen-xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        <div className="text-center md:text-left">
          <img className="h-20 mx-auto md:mx-0" src="/logo1.png" alt="Logo" />
          <h1 className="mt-4 font-extrabold text-lg">Follow us on</h1>
          <div className="flex justify-center md:justify-start gap-5 mt-3 text-2xl text-amber-100">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-red-500"><FaInstagram /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-red-800"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-500"><FaTwitter /></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:text-red-500"><FaYoutube /></a>
          </div>
        </div>


        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-2">Services</h1>
          <ul className="space-y-5 text-[18px]">
            <Link to="/products/laptop" className="hover:text-red-500">Buy Laptop</Link>
            <Link to="/products/mobile" className="hover:text-red-500">Buy Mobile</Link>
            <Link to="/products/headphone" className="hover:text-red-500">Buy Headphone</Link>
            <Link to="/oldproducts" className="hover:text-red-500">Buy Used Products</Link>
          </ul>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-2">Company</h1>
          <Link to="/About" className="text-[18px] hover:text-red-500">About Us</Link>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-2xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-sm">Email:</p>
          <a href="mailto:dr395108@gmail.com" className="text-[15px] hover:text-red-500">dr395108@gmail.com</a>
          <p className="mt-2 text-sm">Mobile No:</p>
          <a href="tel:+917018674227" className="text-[18px] hover:text-red-500">+91 7018674227</a>
        </div>
      </div>

  
      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} ReMarket All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;