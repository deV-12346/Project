const Cart = require("../../Models/Cart")

const UpdateCart = async (req,res,next)=>{
      try{
            const {productId,quantity} = req.body
            const userId = req.user?.id
            let cart  = await Cart.findOne({userId})  
                  if(!cart){
                  return res.status(400).json({
                        success:false,
                        message:"Product not found"
                  })
             }
            
            const existingItem = cart.CartItems.find(item => item.productId.toString() === productId)   //check product
            if(existingItem){
                        existingItem.quantity = quantity
            }
            await cart.save()
            return res.status(200).json({
                  success:true,
                  message:"Cart Updated Sucessfully",
                  product : cart
            })
      }
      catch(err){
            next(err)
      }
}
module.exports= {UpdateCart}