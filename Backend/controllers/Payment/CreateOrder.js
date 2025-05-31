const Product = require("../../Models/Cart")
const {createRazorpayInstance} = require("../../Config/Razorpay.Config")
const razorPayInstance = createRazorpayInstance  ()
const createOrder = async(req,res)=>{
      try{
      const {amount} = req.body
      const user_Id = req?.user.id
      const cart = await Product.findOne({userId:user_Id})
      if(!cart){
            return res.status(400).json({
                  success:false,
                  message:"cart not found"
            })
      }
      const options = {
            amount,
            currency: "INR",
            receipt:`receipt_${Date.now()}`
      }
      razorPayInstance.orders.create(options,(err,order)=>{
        if(err){
            return res.status(500).json({
                  success:false,
                  message:"Something went wrong."
            })
        }
         return res.status(200).json({
                  success:true,
                  message:"Success",
                  order
      })
      })
      }catch(err){
            return res.status(500).json({
                  success:false,
                  message:"Something went wrong..."
            })
      }
}
module.exports = {createOrder}