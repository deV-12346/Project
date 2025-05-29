const GoogleUser = require("../../Models/Google.user.model")
const GetGoogleUser =  async (req,res,next) =>{
      try{
         const googleuser  = await GoogleUser.find()
         if(!googleuser || googleuser.length ===0){
            return res.status(200).json({
                  success:false,
                  message:"Google user not found"
            })
         }
         return res.status(200).json({
            success:true,
               success:true,
               message:"Google user found successfully",
               googleuser
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = {GetGoogleUser}