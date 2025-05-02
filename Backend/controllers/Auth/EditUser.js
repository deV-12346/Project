const User = require("../../Models/user.model")
const EditUser = async (req,res,next)=>{
      const {id,username,email,mobileno,role} = req.body
    try{   
           const user = await User.findById(id)
           if(!user){
            return res.status(401).json({
                  success:false,
                  message:"User id not found"
            })
           }
            const existinguser = await User.findOneAndUpdate(
                  {_id: id},
                  {
                   username,
                   mobileno,
                   email,
                   role
                  },
                  {new:true}
            )    
            return res.status(200).json({
                  sucess:true,
                  message:"User Updated Sucessfully",
                  data:existinguser,
            })
      }
            catch(error){
                  next(error)
            }
}
module.exports = {EditUser}