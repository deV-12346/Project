import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Login from "./Components/Login ";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Notfound from "./Pages/Notfound";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Sellerlogin from "./Seller_Panel/Sellerlogin";
import Selleregister from "./Seller_Panel/Sellerregister";
import SellerHome from "./Seller_Panel/SellerHome"; 
import Chnagepassword from "./Components/Chnagepassword";
import ManageOrders from "./Seller_Panel/ManageOrder";
import UploadProducts from "./Seller_Panel/UploadProducts";
import ManageSellerProducts from "./Seller_Panel/ManageProducts";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home/>
          <Footer />
        </div>
      ),
    },
    {
      path: "/shop",
      element: (
        <div>
          <Navbar />
          <Shop />
          <Footer />
        </div>
      ),
    },
    {
      path: "/mywishlist",
      element: (
        <div>
          <Navbar />
          <Wishlist />
          <Footer />
        </div>
      ),
    },
    {
      path: "/myorders",
      element: (
        <div>
          <Navbar />
          <Orders />
          <Footer />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <About />
          <Footer />
        </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/sellerlogin",
      element: <Sellerlogin />,
    },
    {
      path: "/changepassword",
      element: <Chnagepassword />,
    },
    {
      path: "/sellerregister",
      element: <Selleregister />,
    },
    {
      path:"/sellerhome",
      element:<SellerHome/>
    },
    {
      path:"/seller/orders",
      element:<ManageOrders/>
    },
    {
      path:"/seller/upload",
      element:<UploadProducts/>
    },
    {
      path:"/seller/products",
      element:<ManageSellerProducts/>
    },
    {
      path: "*",
      element: (
        <div>
          <Notfound />
        </div>
      ),
    },
  ]);

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;