const Product = require("../../Models/Products")
const {upload} = require("../../Middleware/Multer")
const products = (req,res,next) =>{
      upload(req, res,async (err) => {
            if (err) {
                  return res.status(400).json({
                        message: err.message
                  })
            }
            if (!req.files) {
                  return res.status(400).json({
                        success: false,
                        message: "failed to upload file"
                  })
            }
      try{
      const {productName , productDescription, category , productPrice, offerPrice } = req.body
      const imgurl = req.files.map(file=>({
            url: `uploads/${file.filename}`     
      }))

      const newProduct = new Product ({
            images:imgurl,
            productName , 
            productDescription, 
            category ,
            productPrice,
            offerPrice,
            uploadedBy:"Admin"
      })
      await newProduct.save()
      res.status(200).json({
            success:true,
            message:"Product Uploaded",
            data: newProduct,
      })
      }
      catch(error){
           console.log(error)
           next(error)
      }
})
}
module.exports = {products}