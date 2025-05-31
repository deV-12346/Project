require("dotenv").config()
const razorpay = require("razorpay")
exports.createRazorpayInstance = () =>{
      return new razorpay({
            key_id : process.env.RAZORPAY_ID_KEY,
            key_secret:process.env.RAZORPAY_SECRET_KEY
      })
}