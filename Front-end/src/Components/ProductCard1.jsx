import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const ProductCard = ({product}) => {
      const navigate = useNavigate()
      const {user,toggleWishlistItem,wishlistItems} = UseAppContext()
      const isWishlisted = wishlistItems.some(id => id.toString() === product._id.toString());
      return product &&  (
          <div onClick={()=> navigate(`/oldproducts/${product.category}/${product._id}`)} className="border border-gray-900/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-50 max-w-50 w-full">
              <Toaster />
              <div className="relative group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-38"
            src={product.images?.[0]?.url}
            alt={product.productName}
          />
          {user && <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlistItem(product._id);
            }}
            className="absolute bottom-2 right-2 text-2xl"
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>}
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