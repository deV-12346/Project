import React from "react";
import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Toaster } from "react-hot-toast";
const ProductCard = ({product}) => {
      const navigate = useNavigate()
      return product &&  (
          <div onClick={()=> navigate(`/oldproducts/${product.category}/${product._id}`)} className="border border-gray-900/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-50 max-w-50 w-full">
              <Toaster />
              <div className="group cursor-pointer flex items-center justify-center px-2">
              <img
                className="group-hover:scale-105 transition max-w-26 md:max-w-38"
                   src={product.images?.[0]?.url}
              />
              </div>
              <div className="text-gray-500/60 text-sm">
                  <p>{product.category}</p>
                  <p className="text-gray-700 font-medium text-lg truncate w-full">{product.productName}</p>

                  <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium text-primary ">
                        Rs {product.price}{" "} 
                      </p>
                  </div>
                  <div className="flex items-start justify-between mt-3">
                  <p className="md:text-[14px] text-base font-medium text-black ">
                        {product.address}{" "} 
                      </p>
                  <button className="bg-primary cursor-pointer text-black px-5 py-3 rounded-xl hover:bg-primary/50">Buy</button>    
                  </div>
              </div>
          </div>
      );
  };

export default ProductCard