const Product = require("../../Models/Products")
const GetProducts = async (req,res,next)=>{
      try{
            const Products = await Product.find()
            if(!Products){
                  res.status(400).json({
                        success:false,
                        message:"Products not found"
                  })
            }
            res.status(200).json({
                  success:true,
                  message:"Successfully Fetching Product",
                  data: Products
            })
      }
      catch(error){
            next(error)
      }
}
module.exports = {GetProducts}