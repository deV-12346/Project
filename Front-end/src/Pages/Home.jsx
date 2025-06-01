import React from 'react'
import {  FaMapMarkerAlt } from 'react-icons/fa';
import Categories from '../Components/Categories';
import { Link, useNavigate } from "react-router-dom";
import Newslatter from '../Components/Newslatter';
import OurPolicy from '../Components/OurPolicy';
import BestSellers from '../Components/BestSellers';
import { UseAppContext } from '../Context/AppContext';


const Home = () => {
  const {setsearchqurey} = UseAppContext()
  const navigate = useNavigate()
  return (
       <div className='my-5 mx-5 md:my-10 md:mx-15'>
       {/* <div className="mx-18 my-5 w-80 md:hidden"> 
        <input
              type="text"
              onChange={(e)=>setsearchqurey(e.target.value)}
              placeholder="Search products..."
              className="w-full px-5 py-2  font-mono border-2 rounded-3xl text-black outline-none bg-green-100"
            /> 
        </div> */}
        <div className='flex items-center justify-evenly border-b-1-blue-700 m-2 p-3 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] text-black'>
            <button className='cursor-pointer hover:underline' onClick={()=> {navigate(`/Products/laptop`)}}><Link >Buy Laptop</Link></button>
            <button className='cursor-pointer hover:underline'><Link to="/Products/mobile" >Buy Phone</Link></button>
            <button className='cursor-pointer hover:underline'><Link to="/products" >Buy Gadget</Link></button> 
            <button className='flex hover:underline'><FaMapMarkerAlt className='text-2xl'/>My Loaction</button>
        </div>
        <Categories />
         <BestSellers />
        <OurPolicy/> 
        <Newslatter/>
      </div>

  )
}

export default Home