const Order = require("../../Models/Order")
const {DeliveredOrderMail} = require("../../Services/MailService/DeliveredOrder")
const {ShippedOrderMail } = require("../../Services/MailService/ShippedOrder")
const {ConfirmOrderMail} = require("../../Services/MailService/ConfirmedOrder")
const {CancelOrderMail} = require("../../Services/MailService/CancelOrder")
const User = require("../../Models/user.model")
const UpdateStatus = async (req,res,next)=>{
      try{
            const {orderId, status} =req.body
            const order = await Order.findById(orderId)
            const user = await User.findById(order.userId) 
            if(!order){
            return res.status(400).json({
                  success:false,
                  message:"Order not found"
            })
            }
            order.status = status;
            await order.save();
            const username = user.username
            const email = user.email
            if(order.status === "Confirmed"){
                  await ConfirmOrderMail(username,email)
            }
            else if(order.status === "Shipped"){
                  await ShippedOrderMail(username,email)
            }
            else if(order.status === "Delivered"){
                  await DeliveredOrderMail(username,email)
            }
            else{
                  await CancelOrderMail(username,email)
            }
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