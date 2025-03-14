import React from 'react'
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='md:py-10 flex  justify-evenly bg-[#263238] sm:flex flex-wrap' >
      <div>
            <img className="h-20 w-50" src="../src/logo/logo1.png" alt="Logo" />
                <h1 className='ml-14 text-white  font-extrabold'>Follow us on</h1>
             <div className='flex items-center justify-between w-35 text-3xl gap-6 text-amber-100'>
                  <Link to={'https://www.facebook.com/'} className=' hover:text-red-500'><FaInstagram/></Link>
                  <Link to={'https://www.instagram.com/'} className=' hover:text-red-500'><FaFacebookF/></Link>
                  <Link to={'www/twitter.com'} className=' hover:text-red-500'><FaTwitter/></Link>
                  <Link to={'https://www.youtube.com/'} className=' hover:text-red-500'><FaYoutube/></Link>
             </div>
      </div>
      <div className='text-white  w-40 text-center'>
            <h1 className='text-3xl font-extrabold'>Services</h1>
            <ul className='flex flex-col text-[18px]'>
              <Link to={`/product/0`} className=' hover:text-red-500'>Buy Laptop</Link>
              <Link to={`/product/1`} className=' hover:text-red-500'>Buy Mobile</Link>
              <Link to={`/product/2`} className=' hover:text-red-500'>Buy Car</Link>
              <Link to={`/product/3`} className=' hover:text-red-500'>Buy Headphone</Link>
            </ul>
      </div>
      <div className='text-white  w-40 text-center'>
           <h1  className='text-3xl  font-extrabold'>Company</h1>
           <Link to={`/About`} className='text-[18px] hover:text-red-500'>About us</Link>
      </div>
      <div className='text-white  w-40 text-center'>
           <h1  className='text-3xl  font-extrabold'>Contact us </h1>
           <p>Email : <a className='text-[18px] hover:text-red-500 ' href="mailto:dr395108@gmail.com">dr395108@gmail.com</a></p>
           <p>Mobile no : <a className='text-[18px] hover:text-red-500' href="telephoneto:7018674227">+917018674227</a></p>
      </div>
    </div>
  )
}

export default Footer