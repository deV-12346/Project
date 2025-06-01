import { Route , Routes} from "react-router-dom";
import Seller_page from "./Pages/Sellerpage"
import UploadProducts from "./Pages/UploadProduts";
import Login from "./Components/Login"
import AdminPanel from "./Pages/Users";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Payment from "./pages/Payment"
function App() {  
  return (
    <div>
          <Routes>
          <Route path="/"  element={<Login />}/>
          <Route path="/admindashboard" element={<AdminPanel />}/>
          <Route path="/admin/sellers" element={<Seller_page/>}/>
          <Route path="/admin/upload"  element={<UploadProducts/>}/>
          <Route path="/admin/products" element={<Products/>}/>
          <Route path="/admin/orders" element={<Orders/>}/>
          <Route path="/admin/payments" element={<Payment/>}/>
          </Routes>
    </div>
  )
}

export default App