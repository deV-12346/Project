const Order = require("../../Models/Order")

const UpdateStatus = async (req,res,next)=>{
      try{
            const {orderId, status} =req.body
            console.log(orderId, status)
            const order = await Order.findById(orderId)
            if(!order){
            return res.status(400).json({
                  success:false,
                  message:"Order not found"
            })
            }
             order.status = status;
             await order.save();
            return res.status(200).json({
                  success:true,
                  message:"Status Updated",
                  order
            })
 }
 catch(err){
      next(err)
 }
}
module.exports={UpdateStatus}