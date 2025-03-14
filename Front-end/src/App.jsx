import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login ";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import './App.css';
import Notfound from "./Pages/Notfound";
import { AuthProvider } from './Context/authcontext';
import ProductDetail from "./Pages/Productdeatils";
import Footer from "./Components/Footer";
import About from "./Components/About";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
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
      element:
      <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "*",
      element: (
        <div>
          <Notfound/>
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