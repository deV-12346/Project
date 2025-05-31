require("dotenv").config()
const crypto = require("crypto")
const Payment = require("../../Models/Payment.js")
const verifyPayment = async(req,res,next)=>{
      try{
            const {order_id,payment_id,signature,amount} = req.body
            const secret = process.env.RAZORPAY_SECRET_KEY

            //create hmam object
            const hmac = crypto.createHmac("sha256",secret)

            hmac.update(order_id + "|" + payment_id)

            const generatedSignature = hmac.digest("hex")

            if(generatedSignature === signature){
                  const payment = new Payment({
                        amount,
                        razorpay_order_id:order_id,
                        razorpay_payment_id:payment_id,
                        razorpay_signature:signature,
                  })
                  await payment.save()
                  return res.status(200).json({
                        success:true,
                        message:"Payment success",
                        payment
                  })
            }else
            {
                 return res.status(400).json({
                        success:false,
                        message:"Payment not verifed",
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