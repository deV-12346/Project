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
import Cart from "./Pages/Cart";
import AddAddress from "./Components/AddAddress";
import WishList from "./Pages/WishList";
import ChangePassword from "./Seller_Panel/ChangePassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import SellerProtectedRoute from "./Components/SellerProtectedRoute";

function App() {
  const router = createBrowserRouter([
    // Public Routes (accessible to all)
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
      element: (
        <div>
          <Navbar />
          <ProductDetails />
          <Footer />
        </div>
      )
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
      element: (
        <div>
          <Navbar />
          <OldproductDeatils />
          <Footer />
        </div>
      )
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

    // Auth Routes (accessible only to non-authenticated users)
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/sellerlogin",
      element: (
        <PublicRoute>
          <Sellerlogin />
        </PublicRoute>
      ),
    },
    {
      path: "/sellerregister",
      element: (
        <PublicRoute>
          <Selleregister />
        </PublicRoute>
      ),
    },
    {
      path: "/changepassword",
      element: <Chnagepassword />,
    },

    // Protected User Routes (requires authentication)
    {
      path:"/cart",
      element: (
        <ProtectedRoute>
          <div>
            <Navbar/>
            <Cart />
            <Footer/>
          </div>
        </ProtectedRoute>
      )
    },
    {
      path: "/myorders",
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <Orders />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <WishList />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/address",
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <AddAddress />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },

    // Protected Seller Routes (requires seller authentication)
    {
      path:"/changesellerpassword",
      element: (
        <SellerProtectedRoute>
          <ChangePassword/>
        </SellerProtectedRoute>
      )
    },
    {
      path:"/seller/orders",
      element: (
        <SellerProtectedRoute>
          <ManageOrders/>
        </SellerProtectedRoute>
      )
    },
    {
      path:"/seller/upload",
      element: (
        <SellerProtectedRoute>
          <UploadProducts/>
        </SellerProtectedRoute>
      )
    },
    {
      path:"/seller/products",
      element: (
        <SellerProtectedRoute>
          <ManageSellerProducts/>
        </SellerProtectedRoute>
      )
    },

    // 404 Not Found
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