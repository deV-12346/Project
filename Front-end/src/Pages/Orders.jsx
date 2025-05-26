import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config";
import { UseAppContext } from "../Context/AppContext";
import { Toaster } from "react-hot-toast";
const MyOrders = () => {
  const { myOrders, cancelOrder } = UseAppContext();
  const navigate = useNavigate()
  
    if(myOrders.length === 0){
     return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <p>You have not ordered anything yet.</p>
        <p className="mt-2 text-blue-500 underline cursor-pointer" onClick={() => navigate("/products")}>Start shopping now!</p>
      </div>
    );
    }
      
  return (
    <div className="px-10 py-10 md:px-10">
      <Toaster position="top-center" />
      <div className="mb-8">
        <p className="text-3xl font-semibold uppercase ">My Orders</p>
        <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl shadow-sm p-6 mb-8 bg-white md:mx-20"
        >
          <div className="flex justify-between   text-gray-500 text-sm md:text-base mb-4 flex-wrap">
            <span><strong>Order ID:</strong> {order._id}</span>
            <span><strong>Total Amount:</strong> ₹{order.totalAmount}</span>
          </div>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center md:items-center justify-between gap-4 py-4 ${
                order.items.length !== idx + 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex items-start md:items-center gap-4 w-full md:w-1/2">
                <img
                  src={`${baseURL}/${item.productId?.images?.[0]?.url}`}
                  alt="Product"
                  className="w-32 h-32 object-cover border rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.productId.productName}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Category: {item.productId.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm text-gray-600">
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Payment:</strong> {order.payment}</p>
              </div>


              <div className="text-right md:text-left">
                <p className="text-green-600 font-bold text-lg">
                  Amount: ₹{item.productId.offerPrice}
                </p>
              </div>
            </div>
          ))}
        <div className="flex justify-end">
        {order.status !== "Cancelled"  ?  
          <button onClick={()=>cancelOrder(order._id,"Cancelled")}
            className="bg-primary text-white px-4 py-3 hover:bg-primary/20 cursor-pointer ">Cancel Order</button>
            :
            " " }
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;