import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const {
    user,
    addtocart,
    removecartitems,
    cartitems,
    toggleWishlistItem,
    wishlistItems,
  } = UseAppContext();

  const navigate = useNavigate();
  const isWishlisted = wishlistItems.some(id => id.toString() === product._id.toString());

  return product && (
    <div
      onClick={() => navigate(`/products/${product.category}/${product._id}`,scrollTo(0,0))}
      className="border border-gray-900/20 rounded-md bg-white cursor-pointer flex flex-col h-full w-full hover:shadow-lg transition-shadow duration-200"
    >
      <Toaster/>
      
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
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array(4).fill('').map((_, i) => (
            <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="rating" className="w-3 h-3" />
          ))}
          <span className="text-xs text-gray-500">(1505)</span>
        </div>

        {/* Spacer to push price and button to bottom */}
        <div className="flex-grow"></div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-lg font-semibold text-primary">
            ₹{product.offerPrice}
          </p>
          <p className="text-xs text-gray-400 line-through">
            ₹{product.productPrice}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="w-full">
          {!cartitems[product._id] ? (
            <button
              className="flex items-center justify-center gap-2 w-full bg-primary/10 border border-primary/40 py-2 px-3 rounded text-primary font-medium hover:bg-primary/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                addtocart(product._id);
              }}
            >
              <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
              <span className="text-sm">Add to Cart</span>
            </button>
          ) : (
            <div
              className="flex items-center justify-center gap-3 w-full bg-primary/10 py-2 px-3 rounded select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => removecartitems(product._id)}
                className="cursor-pointer text-lg font-semibold text-primary hover:text-primary/70 px-2"
              >
                -
              </button>
              <span className="text-base font-medium text-primary min-w-[20px] text-center">{cartitems[product._id]}</span>
              <button
                onClick={() => addtocart(product._id)}
                className="cursor-pointer text-lg font-semibold text-primary hover:text-primary/70 px-2"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;