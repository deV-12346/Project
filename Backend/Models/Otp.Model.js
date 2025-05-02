const {Schema,model} = require("mongoose")
const otpSchema = new Schema({
      email:
      {
            type: String,
            required: true,
      },
      otp:
      {
            type: String,
            required: true
      },
      timestamp:
      {
            type: Date,
            required: true,
            default: Date.now,
      }
});
otpSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 });
module.exports=model("OTP",otpSchema,"OTP")