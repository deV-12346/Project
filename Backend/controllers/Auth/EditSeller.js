const Seller = require("../../Models/seller.model")

const EditSeller = async (req,res,next)=>{
      const {id,sellername,email,mobileno} = req.body
      const seller = await Seller.findById(id)
      try{
      if(!seller)
      {
            return res.status(400).json({
                  success:false,
                  message:"Seller id not found"
            })
      }
      const existingseller = await Seller.findByIdAndUpdate(
            {_id:id},
            {
                  sellername,
                  email,
                  mobileno,
            },
            {new:true}
      )
      return res.status(200).json({
            success:true,
            message:"Seller Updated",
            data:existingseller
      })
}    catch(error){
      next(error)
}
}
module.exports = {EditSeller}