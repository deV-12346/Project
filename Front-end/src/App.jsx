import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Orders from "./Pages/Orders";
import Login from "./Components/Login ";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Notfound from "./Pages/Notfound";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Sellerlogin from "./Seller_Panel/Sellerlogin";
import Selleregister from "./Seller_Panel/Sellerregister";
import Chnagepassword from "./Components/Chnagepassword";
import ManageOrders from "./Seller_Panel/ManageOrder";
import UploadProducts from "./Seller_Panel/UploadProducts";
import ManageSellerProducts from "./Seller_Panel/ManageProducts";
import ProductCategories from "./Pages/ProductCategories";
import ProductDetails from "./Pages/ProductDetails";
import UsedProduct from "./Pages/UsedProduct";
import OldproductDeatils from "./Pages/OldproductDeatils";
import Card from "antd/es/card/Card";
import Cart from "./Pages/Cart";
import AddAddress from "./Components/AddAddress";
import WishList from "./Pages/WishList";
import ChangePassword from "./Seller_Panel/ChangePassword";
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
      path: "/products",
      element: (
        <div>
          <Navbar />
          <Shop />
          <Footer />
        </div>
      ),
    },
    {
      path: "/products/:category",
      element: (
        <div>
          <Navbar />
          <ProductCategories />
          <Footer />
        </div>
      ),
    },
    {
      path:"/products/:category/:id",
      element: <div>
       <Navbar />
        <ProductDetails />
        <Footer />
      </div>
    },
    {
      path: "/oldproducts",
      element: (
        <div>
          <Navbar />
          <UsedProduct />
          <Footer />
        </div>
      ),
    },
      {
      path: "/oldproducts/:category",
      element: (
        <div>
          <Navbar />
          <ProductCategories />
          <Footer />
        </div>
      ),
    },
    {
      path:"/oldproducts/:category/:id",
      element: <div>
       <Navbar />
        <OldproductDeatils />
        <Footer />
      </div>
    },
    {
      path:"/cart",
      element: <div>
        <Navbar/>
        <Cart />
        <Footer/>
      </div>
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
      path: "/wishlist",
      element: (
        <div>
          <Navbar />
          <WishList />
          <Footer />
        </div>
      ),
    },
     {
      path: "/address",
      element: (
        <div>
          <Navbar />
          <AddAddress />
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
      path:"/changesellerpassword",
      element:<ChangePassword/>
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