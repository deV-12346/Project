const Order = require("../../Models/Order")

const AllOrders = async (req,res,next)=>{
      try{
         const orders = await Order.find()
         return res.status(200).json({
            success:true,
            message:"Orders fetched",
            orders
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = {AllOrders}