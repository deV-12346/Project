const Cart = require("../../Models/Cart")

const GetMyCart = async(req,res,next)=>{
      try{
     const userId = req.user?.id
     const cart = await Cart.findOne({userId})
     if(!cart || cart.CartItems.length === 0 ){
      return res.status(400).json({
            success:false,
            message:"Cart is empty"
      })
     } 
     cartItem = cart.CartItems.map(item=>({
            productId:item.productId._id,
            quantity: item.quantity,
            product: item.productId,
      }))
      return res.status(200).json({
            success:true,
            message:"Successfully fetched",
            product:cartItem
      })
     }
     catch(err){
         next(err)
     }
}
module.exports = {GetMyCart}