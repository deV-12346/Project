const Orders = require("../../Models/OldproductOrder.model")
const FetchOrders = async(req,res,next)=>{
      try{
           const userId = req.user?.id
           console.log(userId)
           const user  = await Orders.find({userId}).populate("productId").populate("sellerId")
           if(!user){
            return res.status(400).json({
                  success:false,
                  message:"user not found"
            })
           }
           return res.status(200).json({
            success:true,
            message:"Orders found successfully",
            orders:user
           })
      }
      catch(err){
            next(err)
      }
}
module.exports = {FetchOrders}