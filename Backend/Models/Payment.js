const {model,Schema} = require("mongoose")
const paymentSchema  = new Schema ({
      order_id:{
            type:Schema.Types.ObjectId,
            ref:"Order"
      },
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
      }
},{ timestamps: true })
module.exports = model("Payment",paymentSchema)