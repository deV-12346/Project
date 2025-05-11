const Product = require("../../Models/Products")
const {ProductValidation} = require("../../Services/Validatiion_schema")
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
            console.log("Before validation :",req.body)
            req.body.inStock = req.body.inStock === 'true';
  req.body.productPrice = Number(req.body.productPrice);
  req.body.offerPrice = Number(req.body.offerPrice);
      try{
       console.log("Before validation :",req.body)
      const {productName , productDescription,inStock, category , productPrice, offerPrice } = await ProductValidation.validateAsync(req.body)
      console.log(req.body)
      const imgurl = req.files.map(file=>({
            url: `uploads/${file.filename}`     
      }))

      const newProduct = new Product ({
            images:imgurl,
            productName , 
            productDescription, 
            category ,
            inStock,
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