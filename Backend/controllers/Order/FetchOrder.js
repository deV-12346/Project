const Orders = require("../../Models/Order")
const Product = require("../../Models/Products")
const FetchOrder = async (req,res,next) =>{
      try{
            const userId = req.user?.id
            if(!userId){
                  return res.status(400).json({
                        sccuess:false,
                        message:"User not found"
                  })
            }
            const orders  = await Orders.find({userId}).populate('items.productId') .sort({ createdAt: -1 }); 
            console.log(JSON.stringify("data",orders, null, 2));
            if(!orders){
                  return res.status(400).json({
                        sccuess:false,
                        message:"Orders not found"
                  })
            }
            return res.status(200).json({
                        success:true,
                        message:"Orders found successfully",
                        orders
                  })
      }
      catch(err){
            next(err)
      }
}
module.exports= {FetchOrder}