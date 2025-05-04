const Product = require("../../Models/Products")
const fs = require("fs")
const path = require("path")

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
            
            for(let img of DeletedProduct.images){
                  const filename = img.url
                  const imgpath = path.join(__dirname,"../../Middleware/",filename)
                  if(fs.existsSync(imgpath)){
                        fs.unlinkSync(imgpath)
                        console.log("img deleted")
                  }
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