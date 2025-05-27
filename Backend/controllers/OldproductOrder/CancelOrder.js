const Order = require("../../Models/OldproductOrder.model")
const Product = require("../../Models/UsedProduct")
const CancelOrder = async(req,res,next)=>{
      try{
       const {orderId,productId,status} = req.body
       const order = await Order.findById(orderId)
       if(!order){
            return res.status(400).json({
                  success:false,
                  message:"Order not found"
            })
      }
      const productstatus = await Product.findById(productId)

      productstatus.status = status
      await productstatus.save()
      
      return res.status(200).json({
            success:true,
            message:"Order cancalled successfully",
            order,
            productstatus
      })
      }
      catch(err){
            next(err)
      }
}
module.exports = {CancelOrder}