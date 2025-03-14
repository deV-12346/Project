import React from 'react'
import {  FaMapMarkerAlt } from 'react-icons/fa';
import Displayhome from './Displayhome';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div >
       <div className="mx-23 my-5 w-80 md:hidden"> 
        <input
              type="text"
              placeholder="Search products..."
              className="w-full px-5 py-2  font-mono border-2 rounded-3xl text-black outline-none bg-green-100"
            /> 
        </div>
        <div className='flex items-center justify-evenly border-b-1-blue-700 m-2 p-3 bg-amber-400 text-blue-900'>
            <button className='cursor-pointer hover:underline'><Link to={`/product/0`}>Buy Laptop</Link></button>
            <button className='cursor-pointer hover:underline'><Link to={`/product/1`}>Buy Phone</Link></button>
            <button className='cursor-pointer hover:underline'><Link to={`/product/2`}>Buy Gadget</Link></button> 
            <button className='flex hover:underline'><FaMapMarkerAlt className='text-2xl'/>My Loaction</button>
        </div>
        <Displayhome />
      </div>
  )
}

export default Home