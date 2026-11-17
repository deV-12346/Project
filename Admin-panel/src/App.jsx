import { Route , Routes} from "react-router-dom";
import Seller_page from "./Pages/Sellerpage"
import UploadProducts from "./Pages/UploadProduts";
import Login from "./Components/Login"
import AdminPanel from "./Pages/Users";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Payment from "./pages/Payment"
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {  
  return (
    <div>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/"  element={<Login />}/>
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admindashboard" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/sellers" 
          element={
            <ProtectedRoute>
              <Seller_page/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/upload"  
          element={
            <ProtectedRoute>
              <UploadProducts/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute>
              <Products/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute>
              <Orders/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/payments" 
          element={
            <ProtectedRoute>
              <Payment/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App