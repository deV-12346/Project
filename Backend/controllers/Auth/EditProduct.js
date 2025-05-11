const Product = require("../../Models/Products")
const EditProduct = async (req,res,next) =>{
      try{
            const {id,productName,productDescription,productPrice,offerPrice,inStock,category} = req.body
            const productid = await Product.findById(id)
            if(!productid){
                  res.status(400).json({
                        success:false,
                        message:("Product id not found")
                  })
            }
            const existingProduct = await Product.findByIdAndUpdate(
                   id,
                  {
                        productName,
                        productDescription,
                        productPrice,
                        offerPrice,
                        inStock,
                        category
                  },
                  {new : true}
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
module.exports = {EditProduct}