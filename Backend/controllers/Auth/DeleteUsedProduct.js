const product = require("../../Models/UsedProduct")
const fs = require("fs")
const path = require("path")

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
            for (let img of existingproduct.images){
                  const filename = img.url
                  const imgpath = path.join(__dirname,"../../Middleware/",filename)
                  if(fs.existsSync(imgpath)){
                       fs.unlinkSync(imgpath)
                       console.log("File deleted")
                  }
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