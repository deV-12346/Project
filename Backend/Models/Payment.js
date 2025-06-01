const {model,Schema} = require("mongoose")
const paymentSchema  = new Schema ({
      amount:{
            type:Number,
            required:true,
      },
      razorpay_order_id:{
            type:String,
            required:true,
      },
      razorpay_payment_id:{
            type:String,
            required:true
      },
      razorpay_signature:{
            type:String,
            required:true
      },
      status:{
            type:String,
            enun:["Paid","Refund"],
            default:"Paid"
      }
},{ timestamps: true })
module.exports = model("Payment",paymentSchema)