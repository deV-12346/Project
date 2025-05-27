const Product = require("../../Models/UsedProduct")
const EditUsedProduct  = async (req,res,next)=>{
      try{
            const {id,productName,productDescription,price,category,address,status} = req.body
            console.log(id)
            const product = await Product.findById(id)
            if(!product){
              return res.status(400).json({
                  success:false,
                  message:"Product not found"
              })
            }
            const existingProduct = await Product.findByIdAndUpdate(
                  id,
                  {
                  productName,
                  productDescription,
                  price,
                  category,
                  address,
                  status,
                  },
                  {new:true}
            )
            return res.status(200).json({
                  success:true,
                  message:"Product Updated Sucessfully",
                  data:existingProduct
            })
      }
      catch(error){
            next(error)
      }
}
module.exports = {EditUsedProduct}