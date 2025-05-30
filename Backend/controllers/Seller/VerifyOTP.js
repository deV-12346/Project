const User = require("../../Models/Otp.Model")

const verifyOTP =  async (req,res,next)=>{
      try{
         const {email,otp} = req.body
         console.log(email,otp)
         const selleremail = await User.findOne({email:email})
         if(!selleremail){
            return res.status(400).json({
            success:false,
            message:"OTP not found"
         })
         }
         if(otp !==selleremail.otp){
             return res.status(400).json({
            success:false,
            message:"OTP Invalid"
         })
         }
         const expirationTime = 60000
         const currentTime = Date.now()
         const timeDifference = currentTime-selleremail.timestamp
         if(timeDifference > expirationTime){
            await User.deleteOne({email})
            return res.status(400).json({
                  success:false,
                  message:"OTP Expired"
            })
         }
         await User.deleteOne({email})
         return res.status(200).json({
            success:true,
            message:"OTP Verified"
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = verifyOTP