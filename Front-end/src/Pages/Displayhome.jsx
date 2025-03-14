import React from "react";
import { products } from "../assets/assets";
import { Link } from "react-router-dom";

const Displayhome = () => {
  return (
    <div>
      <div className="bg-amber-100 md: w-full h-auto pb-5 mb-5">
        <h1 className="ml-5 py-3 font-bold text-2xl text-center md:text-left">
          Featured Products
        </h1>
        <div className=" ml-5 mr-5  grid justify-evenly grid-cols-2 md:grid-cols-4 gap-4 ">
          {products.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md flex-shrink-0 cursor-pointer mb-4 md:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-42 rounded-md object-cover hover:grayscale-100"
                />
                <h2 className="mt-2 font-semibold text-sm text-center hover:underline">
                  {item.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Displayhome;