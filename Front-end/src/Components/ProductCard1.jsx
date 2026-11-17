import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ProductCard = ({product}) => {
  const navigate = useNavigate()
  const {user, toggleWishlistItem, wishlistItems} = UseAppContext()
  const isWishlisted = wishlistItems.some(id => id.toString() === product._id.toString());
  
  return product && (
    <div 
      onClick={() => navigate(`/oldproducts/${product.category}/${product._id}`)} 
      className="border border-gray-900/20 rounded-md bg-white cursor-pointer flex flex-col h-full w-full hover:shadow-lg transition-shadow duration-200"
    >
      <Toaster />
      
      {/* Fixed Image Container */}
      <div className="relative group w-full h-48 flex items-center justify-center p-4 bg-gray-50">
        <img
          className="group-hover:scale-105 transition duration-300 max-h-full max-w-full object-contain"
          src={product.images?.[0]?.url}
          alt={product.productName}
        />
        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlistItem(product._id);
            }}
            className="absolute top-2 right-2 text-2xl z-10 hover:scale-110 transition-transform"
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        )}
      </div>

      {/* Content Container with flex-grow to push button to bottom */}
      <div className="flex flex-col flex-grow p-3 text-sm">
        {/* Category */}
        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">{product.category}</p>
        
        {/* Product Name - Fixed 2 lines */}
        <h3 className="text-gray-800 font-medium text-base leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.productName}
        </h3>
        
        {/* Address - Fixed 2 lines with ellipsis */}
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 min-h-[2rem]">
          📍 {product.address}
        </p>

        {/* Spacer to push price and button to bottom */}
        <div className="flex-grow"></div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-lg font-semibold text-primary">
            ₹{product.price}
          </p>
          <p className="text-xs text-gray-400">
            Second-hand product
          </p>
        </div>

        {/* Buy Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/oldproducts/${product.category}/${product._id}`);
          }}
          className="w-full bg-primary text-white py-2 px-3 rounded font-medium hover:bg-primary/80 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard