const Payment = require("../../Models/Payment")
const {createRazorpayInstance} = require("../../Config/Razorpay.Config")
const {CancelOrderMail} = require("../../Services/MailService/CancelOrder")
const razorPayInstance = createRazorpayInstance  ()
const refundPayment = async (req,res,next)=>{
      try{
         const payment_id = req.params.id
         const username = req.user?.username
         const email = req.user?.email
         const refundpayment = await Payment.findById(payment_id)
         if(!refundpayment){
          return res.status(400).json({
            success:false,
            message:"Payment not found"
         })
         }
         const razorpay_payment_id = refundpayment.razorpay_payment_id
         const amount = refundpayment.amount*100

         const refund  = await razorPayInstance.payments.refund(razorpay_payment_id,{amount})

         refundpayment.status="Refund"
         await CancelOrderMail(username,email)
         await refundpayment.save()

         return res.status(200).json({
            success:true,
            message:"Amount will be credited in your within 5-7 days",
            refund
         })
      }
      catch(err){
            next(err)
      }
}
module.exports = {refundPayment}