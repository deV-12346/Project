const Address = require("../../Models/Address")
const FetchAddress = async (req,res,next)=>{
      try{
         const {userId} = req.query
         console.log("hy",userId)
      //    const id = await Address.findById(userId)
      //    if(!id){
      //       return res.status(400).json({
      //             success:false,
      //             message:"User Not Found"
      //       })
      //    } 
         const address = await Address.find({ userId })
         return res.status(200).json({
            success:true,
            message:"Address Fetched",
            address
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = {FetchAddress}