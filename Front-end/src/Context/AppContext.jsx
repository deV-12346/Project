import React, { createContext, useState, useEffect } from "react";
import axiosinstance from "../../Axiosinstance"
import { baseURL } from "../../config"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setproducts] = useState([])
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartitems, setcartitems] = useState([])
  const [myOrders,setmyOrders] = useState([])
  const [searchquery, setsearchqurey] = useState("")
  const fetchproducts = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/product/getproducts`);
      if (response.data.success) {
        const modifiedProducts = response.data.data.map(product => ({
          ...product,
          images: product.images.map(img => ({
            url: `${baseURL}/${img.url}`
          }))
        }));
        setproducts(modifiedProducts);
        console.log("Fetched Products:", modifiedProducts);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch products');
    }
  }
  useEffect(() => {
    fetchproducts()
    oldProduct()
  }, [])

  const [oldproducts, SetOldproduct] = useState([])
  const oldProduct = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/product/getoldproducts`)
      if (response.data.success) {
        const modifiedoldProducts = response.data.data.map(oldproduct => ({
          ...oldproduct,
          images: oldproduct.images.map(img => ({
            url: `${baseURL}/${img.url}`
          }))
        }))
        SetOldproduct(modifiedoldProducts)
        console.log("old products", modifiedoldProducts)
      }
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  const fetchaddress = async (user) => {
    try {
      const userId = user._id
      console.log(userId)
      const response = await axiosinstance.get(`${baseURL}/api/Address/getaddress`, { params: { userId } })
      if (response.data.success) {
        console.log("address fetched")
        setAddresses(response.data.address)
        setselectedAddress(response.data.address[0])
        console.log(response.data.address)
      }

    }
    catch (err) {
      console.log(err)
    }
  }
   const DeleteAddress = async(id)=>{
     try{
        const response  = await axiosinstance.delete(`${baseURL}/api/Address/deletedaddress`,{data:{id}})
        if(response.data.success){
          toast.success(response.data.message)
          console.log(response.data.message)
        }
        await fetchaddress(user);
     }
     catch(err){
      toast.error(err?.message)
      console.log(err?.message)
     }
  }

  //add to cart
  const addtocart = async (productId) => {
    try {
      const response = await axiosinstance.post(`${baseURL}/api/cart/addtocart`, { productId })
      if (response.data.success) {
        toast.success(response.data.message)
        console.log(response.data.message)
        setcartitems(prev => ({
          ...prev,
          [productId]: (prev[productId] || 0) + 1
        }));
        getmycart()
      }
    } catch (error) {
      console.log(error?.message)
      toast.error(error?.message)
    }
  }


  // update card item quantity
  const updateCartitems = async(productId, quantity) => {
    try{
      const response = await axiosinstance.post(`${baseURL}/api/cart/updatecart`,{productId,quantity})
    if(response.data.success){
       toast.success(response.data.message)
       setcartitems(prev => ({
          ...prev,
          [productId]:  quantity  
        }))
    }
  }
  catch(err){
      console.log(err?.message)
    }
  }

  // remove from cart 
  const removecartitems = async (productId) => {
    console.log(productId)
    try {
      const response = await axiosinstance.put(`${baseURL}/api/cart/removefromcart`, { productId})
      if (response.data.success) {
        toast.success(response.data.message)
        console.log(response.data.message)
         setcartitems(prev => ({
          ...prev,
        [productId]: (prev[productId] || 1) - 1
        }));
        getmycart()
      }
    } catch (error) {
      console.log(error?.message)
    }
  }
  //fetch cart
  const getmycart = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/cart/getmycart`)
      if (response.data.success) {
        console.log(response.data.message)
        const backendCart = {};
        response.data.product.forEach(item => {
          backendCart[item.productId] = item.quantity;
        });
        setcartitems(backendCart);
      }
    }
    catch (err) {
      console.log(err?.message)
    }
  }

  //clear cart selected by user 
  const clearcart = async(productId)=>{
    try{
      const response = await axiosinstance.delete(`${baseURL}/api/cart/clearcart`,{data:{productId}})
     if(response.data.success){
      toast.success(response.data.message)
      const remainingItems = response.data.remainingItems;
      const updatedCartItems = {};
      remainingItems.forEach(item => {
        updatedCartItems[item.productId] = item.quantity;
      });

      setcartitems(updatedCartItems);
     }
    }
    catch(err){
      toast.error(err?.message)
    }
  }
  //get the cart items count
  const getcartcount = () => {
    let totalcartcount = 0
    for (const item in cartitems) {
      totalcartcount += cartitems[item]
    }
    return totalcartcount
  }
  
  // get cart items amount 
  const getcartamount = () => {
    let totalamount = 0
    for (const items in cartitems) {
      let iteminfo = products.find((product) => product._id === items)
      if (cartitems[items] > 0) {
        totalamount += iteminfo.offerPrice * cartitems[items]
      }
    }
    return Math.floor(totalamount * 100) / 100
  }


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(storedUser);
      getmycart()
      fetchaddress(storedUser)
    }
  }, []);



  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  //my wishlist
  const toggleWishlistItem = async (productId) => {
    try {
      const response = await axiosinstance.post(`${baseURL}/api/wishlist/mywishlist`, { productId })
      if (response.data.success) {
        toast.success(response.data.message)
        console.log(response.data.product)
        setWishlistItems(prevItems => {
          if (prevItems.includes(productId)) {
            return prevItems.filter(id => id !== productId);
          } else {
            return [...prevItems, productId];
          }
        });
        await FetchmywishList()
      }
    } catch (error) {
      toast.error(error?.message)
      console.log(error?.message)
    }
  }
  const FetchmywishList = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/wishlist/fetchmywishlist`)
      if (response.data.success) {
        console.log(response.data.message)
        console.log(response.data.product)
        const wishlistIds = response.data.product.map(item => item.product._id.toString());
        setWishlistItems(wishlistIds);
      }
    }
    catch (err) {
      console.log(err?.message)
    }
  }

  //order 
   const placeOrder = async (paymentOption,cartArray) => {
    if(!selectedAddress){
      toast.error("Please enter a address")
      return
    }
    if(!cartArray || cartArray.length===0){
       toast.error("Your cart is empty")
    }
    const orderData =  {
      items: cartArray.map(item=>({
        productId: item._id,
        productName : item.productName,
        category:item.category,
        quantity: item.quantity,
        price: item.offerPrice
      })),
      address: selectedAddress,
      payment: paymentOption,
    };
    console.log('Placing order...',orderData)
    try{
      const response  = await axiosinstance.post(`${baseURL}/api/order/order`,orderData)
        if(response.data.success){
          toast.success(response.data.message)
           fetchOrders()
           getmycart()
          setInterval(()=>{
             setcartitems([])
          },3000)
        }
      }
       catch(err){
          toast.error(err?.message)
          console.log(err?.message)
       }
}

// fetchMyorders 
   const fetchOrders = async ()=>{
    try{
      const response = await axiosinstance.get(`${baseURL}/api/order/myorders`)
      if(response.data.success){
        console.log(response.data.message)
        setmyOrders(response.data.orders)
      }
    }
    catch(err){
      console.log(err?.message)
    }
   }
  //cancel order 
   const cancelOrder = async (orderId, status) => {
        try {
          const response = await axiosinstance.put(`${baseURL}/api/order/updatestatus`, {orderId, status });
          if (response.data.success) {
            toast.success("Order successfully cancalled")
            fetchOrders()
          }
        } catch (err) {
           console.log(err?.message)
        }
      };

  // old product order 
   const handleOldproductOrder = async (productId,sellerId)=>{
     try{
        console.log("product", productId)
        console.log("seller",sellerId)
          const response = await axiosinstance.post(`${baseURL}/api/oldproductorder/order`,{productId,sellerId})
          if(response.data.success){
            toast.success(response.data.message)
             getmyorder()
          }
        }
       catch(err){
       toast.error(err?.message)
     }
   } 
  //oldproduct my orders 
  const [oldproductorders,SetOldproductOrders] = useState([])
  const getmyorder = async()=>{
    try{
      const response = await axiosinstance.get(`${baseURL}/api/oldproductorder/myorders`)
      if(response.data.success){
      console.log(response.data.message)
      SetOldproductOrders(response.data.orders)
      oldProduct()
      }
    }
    catch(err){
      console.log(err?.message)
    }
  }
  //canceloldproductOrder
  const canceloldproductOrder = async(orderId,productId,status)=>{
    console.log(orderId,productId,status)
    try{
      const response = await axiosinstance.put(`${baseURL}/api/oldproductorder/cancelorder`,{orderId,productId,status})
      if(response.data.success){
        toast.success(response.data.message)
        getmyorder()
        oldProduct()
      }
    }
    catch(err){
      toast.error(err?.message)
    }
  }
  useEffect(() => {
    if (user) {
      FetchmywishList();
      getmycart()
      fetchaddress(user)
      fetchOrders()
      getmyorder()
    } else {
      setWishlistItems([]);
      setcartitems([])
      setAddresses([])
    }
  }, [user]);
  const value = {
    user, setUser,
    products, oldproducts, addtocart, updateCartitems, removecartitems, clearcart,
    cartitems, login, logout, searchquery, setsearchqurey, getcartcount, getcartamount
    , addresses, selectedAddress, setselectedAddress, fetchaddress,DeleteAddress, toggleWishlistItem,
     wishlistItems ,placeOrder ,myOrders ,cancelOrder ,handleOldproductOrder , getmyorder ,oldproductorders,
      canceloldproductOrder
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAppContext = () => React.useContext(AuthContext);