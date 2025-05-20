const Address = require("../../Models/Address")
const User =  require("../../Models/user.model")
const googleuser = require("../../Models/Google.user.model")
const UserAddress = async (req,res,next)=>{
      try{
         const {userId,firstName,lastName,email,street,city,state,country,pincode,phone} = req.body
         console.log(userId)
         const userid = await User.findById(userId);
         const googleuserid = await googleuser.findById(userId)
         console.log("Normal User:", userid);
        console.log("Google User:", googleuserid);
         if(!userid && !googleuserid){
            return res.status(400).json({
                  success:false,
                  message:"User not found Please login"
            })
         }
         const newAddress = new Address({
             userId,
             firstName,
             lastName,
             email,
             street,
             city,
             state,
             country,
             pincode: Number(pincode),
             phone: Number(phone),
         })
         await newAddress.save()
         return res.status(200).json({
            success:true,
            message:"Address added"
         })
      }
      catch(err){
            next(err)
      }
}
module.exports= {UserAddress }