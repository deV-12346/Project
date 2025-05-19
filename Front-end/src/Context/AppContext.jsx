import React, { createContext, useState, useEffect } from "react";
import axiosinstance from "../../Axiosinstance"
import {baseURL} from "../../config"
import toast from "react-hot-toast"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setproducts] = useState([])
  const [cartitems, setcartitems] = useState(() => {
  return JSON.parse(localStorage.getItem("cartitems") || "{}");
   });

  const [searchquery,setsearchqurey] = useState("")

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
  }, [])

    const [oldproducts,SetOldproduct] = useState([])
    const oldProduct = async ()=>{
      try {
        const response = await axiosinstance.get(`${baseURL}/api/product/getoldproducts`)
        if(response.data.success){
          const modifiedoldProducts = response.data.data.map(oldproduct=>({
            ...oldproduct,
            images : oldproduct.images.map(img=>({
                url: `${baseURL}/${img.url}`
            }))
          }))
          SetOldproduct(modifiedoldProducts)
          console.log("old products",modifiedoldProducts)
        }
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }
  useEffect(()=>{
    oldProduct()
  },[])

  //add to cart
  const addtocart = (itemId) => {
    const cartData =  structuredClone(cartitems)
    if (cartData[itemId]) {
      cartData[itemId] += 1
    }
    else {
      cartData[itemId] = 1
    }
    setcartitems(cartData)
    toast.success("Added to cart")
  }
  // update card item quantity
  const updateCartitems = (itemId, quantity) => {
    let cartData = structuredClone(cartitems)
    cartData[itemId] = quantity
    setcartitems(cartData)
    toast.success("Cart updated")
  }
  // remove from cart 
  const removecartitems = (itemId) => {
    let cartData = structuredClone(cartitems)
    if (cartData[itemId]) {
      cartData[itemId] -= 1
    }
    if (cartData[itemId] === 0) {
      delete cartData[itemId]
    }
    toast.success("Removed from cart")
    setcartitems(cartData)
  }
   //get the cart items count
      const getcartcount = ()=>{
            let totalcartcount  = 0
            for(const item in cartitems ){
                  totalcartcount += cartitems[item] 
            }
            return totalcartcount
      }
      // get cart items amount 
      const getcartamount = () => {
            let totalamount = 0 
            for(const items in cartitems){
                  let iteminfo = products.find((product)=>product._id===items)
                  if(cartitems[items] >0 ){
                        totalamount +=iteminfo.offerPrice * cartitems[items]
                  }
            }
            return Math.floor(totalamount *100) / 100
      }

   useEffect(() => {
  localStorage.setItem("cartitems", JSON.stringify(cartitems));
}, [cartitems]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
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
  const value = {
    user, setUser,
    products, oldproducts , addtocart, updateCartitems, removecartitems,
    cartitems, login, logout ,searchquery ,setsearchqurey, getcartcount,getcartamount
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAppContext = () => React.useContext(AuthContext);