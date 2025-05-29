const Seller = require("../../Models/seller.model")
const {SendOTP} = require("../../Services/SendOTP")
const sentOtp = async (req, res, next) => {
      try {
            const {email} = req.body
            console.log("email:",email)
            const selleremail = await Seller.findOne({email:email})
            if (!selleremail) {
                  return res.status(400).json({
                        success: false,
                        message: "Email does not exits"
                  })
            }
            await SendOTP(email)
            return res.status(200).json({
                  success: true,
                  message: "Otp sent successfully"
            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = sentOtp