const product = require("../../Models/UsedProduct")
const DeleteUsedProduct = async (req,res,next)=>{
      try{
            const {id} = req.body
            const existingproduct = await product.findByIdAndDelete(id)
            if(!id) {
                  return res.status(400).json({
                        success:false,
                        messgae:"Product ID not found"
                  })
            }
            return res.status(200).json({
                        success:true,
                        message:"Product successfully deleted",
            }) 
      }
      catch(error){
            next(error)
      }
}
module.exports= {DeleteUsedProduct}