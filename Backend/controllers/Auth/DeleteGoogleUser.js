const GoogleUser = require("../../Models/Google.user.model")
const DeleteGoogleUser = async (req,res,next)=>{
      try{
            const {id} = req.params
            console.log(id)
            const deleteduser = await GoogleUser.findByIdAndDelete(id)
            if(!deleteduser){
                return res.status(400).json({
                  succes:false,
                  message:"User not found"
                })
            }
            return res.status(200).json({
                  success:true,
                  message:"Google User successfully deleted",
            })
      }
      catch(err){
            next(err)
      }
}
module.exports = DeleteGoogleUser