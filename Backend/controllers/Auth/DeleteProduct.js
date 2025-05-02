const Product = require("../../Models/Products")
const DeleteProduct = async (req,res,next)=> {
      try{
            const {id} = req.body
            const DeletedProduct = await Product.findByIdAndDelete(id)
            if(!DeletedProduct){
                  return res.status(404).json({
                        success:false,
                        message:"Product id is not there"
                  })
            }
            res.status(200).json({
                  success:true,
                  message:"Product successfully deleted"
            })
      }
      catch(error){
            next(error)
      }
}
module.exports = {DeleteProduct}