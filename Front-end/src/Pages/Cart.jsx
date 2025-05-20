import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../Context/AppContext';
import { assets} from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartitems,
    updateCartitems,
    removecartitems,
    getcartamount,
    getcartcount,
    addresses,
    selectedAddress,
    setselectedAddress,
    fetchaddress
  } = UseAppContext();

  const [cartArray, setcartarray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState('COD');

  const getcart = () => {
    let tempArray = [];
    for (const key in cartitems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartitems[key],
        });
      }
    }
    setcartarray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartitems) {
      getcart();
    }
  }, [products, cartitems]);

  const placeOrder = async () => {
    console.log('Placing order...', {
      items: cartArray,
      address: selectedAddress,
      payment: paymentOption,
    });
  };

  if (products.length > 0 && Object.keys(cartitems).length === 0) {
    return (
      <p className="text-center mt-20 text-lg">
        Your cart is empty.{' '}
        <span
          className="text-indigo-600 cursor-pointer flex justify-center"
          onClick={() => navigate('/')}
        >
            <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt=""
          />
          Continue shopping
        </span>
        .
      </p>
    );
  }

  return products.length > 0 && cartitems ? (
    <div className="flex flex-col md:flex-row mt-16 m-10">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{' '}
          <span className="text-sm text-indigo-500">{getcartcount()} items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() =>
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                }
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                   src={product.images?.[0]?.url}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartitems(product._id, Number(e.target.value))
                      }
                      value={cartitems[product._id]}
                      className="outline-none"
                    >
                      {Array.from(
                        { length: Math.max(cartitems[product._id], 9) },
                        (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              Rs {product.offerPrice * product.quantity}
            </p>
            <button className="cursor-pointer mx-auto">
              <img
                onClick={() => removecartitems(product._id)}
                src={assets.remove_icon}
                alt=""
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
          onClick={() => navigate('/')}
        >
          <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt=""
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street} ${selectedAddress.city} ${selectedAddress.state}`
                : 'No Address Found'}
            </p>
           <button 
              onClick={() =>{ setShowAddress(!showAddress)}}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button> 
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setselectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state}
                  </p>
                ))}
                <p
                  onClick={() => navigate('/address')}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>Rs {getcartamount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>Rs {getcartamount() * 0.02}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>Rs {getcartamount() * 1.02}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentOption === 'COD' ? 'Place Order' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;