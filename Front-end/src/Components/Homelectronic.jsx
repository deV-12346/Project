import React from 'react';
import { electroniclist } from "../assets/assets";
import { Link } from 'react-router-dom';

const Homelectronic = () => {
  return (
    <div className='w-full h-174 flex flex-col md:flex-row items-stretch justify-evenly gap-3 '>
      {/* Left Section */}
      <div className="bg-amber-100 md:w-[50%] flex-1 pb-3 mb-5 rounded-2xl">
        <h1 className="ml-5 py-5 font-bold text-2xl text-center md:text-left">
         Best of Electronics
        </h1>
        <div className="ml-5 mr-5 grid justify-evenly grid-cols-2 md:grid-cols-2 gap-4">
          {electroniclist.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md flex-shrink-0 cursor-pointer mb-4 md:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-55 rounded-md object-cover hover:grayscale-100"
                />
                <h2 className="mt-2 font-semibold text-sm text-center hover:underline">
                  {item.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="bg-amber-100 md:w-[50%] flex-1 mb-5 pb-5 pt-10 flex rounded-2xl">
  <div className="w-full h-full flex">
    <div
      className="bg-[url('/src/assets/phone.png')] bg-cover h-[100%] bg-center flex-1 flex flex-col justify-center items-center text-center hover:grayscale-100"
    >
      <h1 className="text-3xl text-red-400 font-bold pt-10">
        Top Selling Smartphones
      </h1>
      <p className="text-xl text-gray-900 font-bold mt-2">Latest Technology, Best Brands</p>
      <button className="mt-30 text-2xl px-11 py-3 bg-transparent border-2 text-red-400 font-sans cursor-pointer  rounded-lg hover:text-red-500">
        Explore
      </button>
    </div>
  </div>
</div>
    </div>
  );
}

export default Homelectronic;