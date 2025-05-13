const OldProducts = require("../../Models/UsedProduct")
const AllOldProducts = async (req,res,next)=>{
       try{
            const oldProduct = await OldProducts.find()
            if(!oldProduct){
                  return res.status(400).json({
                        sucees:false,
                        message:"Product not found"
                  })
            }
            return res.status(200).json({
                  success:true,
                  message:"Product successfully fetched",
                  data:oldProduct,
            })
      }
       catch(error){
            next(error)
      }
}
module.exports = {AllOldProducts}