const Seller = require("../../Models/seller.model")

const Deleteseller = async (req,res,next)=>{
      const {id}= req.body
      try{
      const deleteUser = await Seller.findByIdAndDelete(id)
      if(!deleteUser){
            return res.status(400).json({
                  success:false,
                  message:"User not found"
            })
      }
      return res.status(200).json({
                success:true,
                message:"Seller sucessfully Removed"
      })
      }
      catch(error){
            next(error)
      }
}
module.exports = {Deleteseller}