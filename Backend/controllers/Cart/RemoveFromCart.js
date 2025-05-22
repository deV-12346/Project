const User = require("../../Models/user.model")
const Cart = require("../../Models/Cart")
const GoogleUser = require("../../Models/Google.user.model")

const RemoveFromCart = async(req,res,next)=>{
      try{
         const userId = req.user?.id
         const {productId} = req.body
         const quantity=1
         console.log(productId)

         const user = await User.findById(userId)
         const googleuser = await GoogleUser.findById(userId)
         if(!user && !googleuser){
            return res.status(400).json({
                  success:false,
                  message:"User Not Found"
            })
         }
         const cart = await Cart.findOne({userId})
         if(!cart){
            return res.status(400).json({
                  success:false,
                  message:"Cart Not Found"
            })
         }

         const item = cart.CartItems.find(item => item.productId.toString() === productId)
         if(item.quantity > 1){
            item.quantity -= quantity
         }
         else{
            cart.CartItems = cart.CartItems.filter(item => item.productId.toString() !== productId)
         }
         await cart.save()
          return res.status(200).json({
                  success:true,
                  message:"Removed From Cart"
            })
      }
      catch(err){
            next(err)
      }
}
module.exports = {RemoveFromCart}