const User = require("../../Models/user.model")
const GoogleUser = require("../../Models/Google.user.model")
const Cart = require('../../Models/Cart')
const AddToCart = async (req,res,next) =>{
      try{
      const userId = req.user?.id
      const {productId} = req.body 
      const quantity = 1

      const user = await User.findById(userId)
      const googleuser = await GoogleUser.findById(userId)
      if(!user && !googleuser){
            return res.status(400).json({
                  success:false,
                  message:"User Not Found"
            })
      }

      let cart  = await Cart.findOne({userId})     //if cart not exits then create cart
      if(!cart){
            cart = new Cart({ userId, cartItems: [] }) 
      }

      const existingItem = cart.CartItems.find(item => item.productId.toString() === productId)   //check product
      if(existingItem){
            existingItem.quantity += 1
      }
      else{
           cart.CartItems.push({productId,quantity}) 
      }

      await cart.save()

      return res.status(200).json({
            success:true,
            message:"Product Addded to Cart",
            product:cart
      })
      }
      catch(err){
            next(err)
      }
}
module.exports = {AddToCart}