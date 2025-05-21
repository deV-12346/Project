import React from 'react';
import { UseAppContext } from '../Context/AppContext';
import ProductCard from '../Components/ProductCard';
import ProductCard1 from '../Components/ProductCard1';
const WishList = () => {
  const {oldproducts, products, wishlistItems } = UseAppContext();

  const NewProductwishlist = products.filter(product =>
    wishlistItems.includes(product._id)
  );
  const OldproductsWishList  = oldproducts.filter(product=>
      wishlistItems.includes(product._id)
  ) 
  return (
    <div className='mt-16 mx-10 my-10 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>My Wish List</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div> 
      </div>
      <div className='my-5'>
      <p  className='text-xl text-primary font-mono text-center'>New Products WishList</p>
      {NewProductwishlist.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Your wishlist is empty.
        </div>
      ) : (
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5'>
          {NewProductwishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      </div>

      
      <div className='mb-5'>
      <p className='text-xl text-primary font-mono text-center'>Old  Products WishList</p>
      {OldproductsWishList.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Your wishlist is empty.
        </div>
      ) : (
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5'>
          {OldproductsWishList.map(product => (
            <ProductCard1 key={product._id} product={product} />
          ))}
        </div>
      )}
      </div>
    </div>

  );
};

export default WishList;