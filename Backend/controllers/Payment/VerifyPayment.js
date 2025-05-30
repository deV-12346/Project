require("dotenv").config()
const crypto = require("crypto")
const verifyPayment = async(req,res,next)=>{
      try{
            const {order_id,payment_id,signature} = req.body
            const secret = process.env.RAZORPAY_SECRET_KEY

            //create hmam object
            const hmac = crypto.createHmac("sha256",secret)

            hmac.update(order_id + "|" + payment_id)

            const generatedSignature = hmac.digest("hex")

            if(generatedSignature === signature){
                  return res.status(200).json({
                        success:true,
                        message:"Payment success"
                  })
            }else{
                 return res.status(400).json({
                        success:false,
                        message:"Payment not verifed"
                  }) 
            }
      }catch(err){
            return res.status(400).json({
                   success:false,
                   meassge:"payment falied"
            })
      }
}
module.exports = {verifyPayment}