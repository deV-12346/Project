const User = require("../../Models/user.model")
const Seller = require("../../Models/seller.model")
const Product = require("../../Models/UsedProduct")
const Orders = require("../../Models/OldproductOrder.model")
const GoogleUser = require("../../Models/Google.user.model")
const Order = async (req,res,next)=>{
      try{
         const userId = req.user?.id
         const {productId,sellerId} = req.body 
         const status ="Ordered"
          
         const user = await User.findById(userId)
         const googleUser = await GoogleUser.findById(userId)
         const seller  = await Seller.findById(sellerId)
         const product = await Product.findById(productId)
         if(!product){
            return res.status(400).json({
                  success:false,
                  message:"Product not found"
            })
         }
         if (!user && !googleUser) {
         return res.status(401).json({
         success: false,
         message: "User not found"
         });
         }
         userName= user ?  user.username  : googleUser.username
         productName = product.productName
         sellerName = seller.sellername

         const newOrder = new Orders ({
            userId,
            sellerId,
            productId,
            userName,
            productName,
            sellerName
         })
         await newOrder.save()
          
         product.status =status
         await product.save()
         
         return res.status(200).json({
            success:true,
            message:"Product successfully ordered",
            newOrder
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = {Order}