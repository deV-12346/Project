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
      className="border border-gray-900/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-50 max-w-50 w-full"
    >
        <Toaster/>
      <div className="relative group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-38"
          src={product.images?.[0]?.url}
          alt={product.productName}
        />
        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlistItem(product._id);
            }}
            className="absolute bottom-2 right-2 text-2xl"
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        )}
      </div>

      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.productName}</p>
        <div className="flex items-center gap-0.5">
          {Array(4).fill('').map((_, i) => (
            <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="rating" />
          ))}
          <p>(1505)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            Rs{product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              Rs{product.productPrice}
            </span>
          </p>

          <div className="text-primary/20">
            {!cartitems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] 
                w-[64px] h-[34px] rounded text-primary/40 font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  addtocart(product._id);
                }}
              >
                <img src={assets.cart_icon} alt="cart_icon" />
                Add
              </button>
            ) : (
              <div
                className="flex text-primary/100 items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary-dull/10 rounded select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => removecartitems(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{cartitems[product._id]}</span>
                <button
                  onClick={() => addtocart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;