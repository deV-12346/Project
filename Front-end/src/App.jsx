import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login ";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import './App.css';
import Notfound from "./Pages/Notfound";
import { AuthProvider, useAuth } from './Context/authcontext';  // Import auth context
import ProductDetail from "./Pages/Productdeatils";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Sellerlogin from "./Pages/Sellerlogin";
import Selleregister from "./Pages/Sellerregister";
import SellerHome from "./Pages/SellerHome";  // New page for sellers
import LoadingSpinner from "./Components/Loadingspinner";
import BestofElectronicsHome from "./Components/BestofElectronicsHome";
import Chnagepassword from "./Components/Chnagepassword";
function App() {
  const { user} = useAuth();  // Get user from context
    
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          {user?.sellername ? <SellerHome/> : <Home/>}
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
      path: "/product/:id",
      element: (
        <div>
          <Navbar />
          <ProductDetail />
          <Footer />
        </div>
      ),
    },
    {
      path: "/electronicsitems/:id",
      element: (
        <div>
          <Navbar />
          <BestofElectronicsHome />
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
      path: "/sellerhome",  // Seller's homepage
      element: user?.sellername ? (
        <div>
          <Navbar />
          <SellerHome />
          <Footer />
        </div>
      ) : (
        <Navigate to="/" />
      ),
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;