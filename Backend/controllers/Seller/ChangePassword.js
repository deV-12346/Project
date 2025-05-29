const Seller = require("../../Models/seller.model")
const {Confirmation_Email} = require("../../Services/PasswordConfirmation")
const ChangePassword = async (req, res, next) => {
      try {
            const { email, new_password, confirm_password } = req.body
            console.log(email, new_password, confirm_password)
            const seller = await Seller.findOne({email:email})
            if (!seller) {
                  return res.status(400).json({
                        success: false,
                        message: "seller not found"
                  })
            }
            if (new_password !== confirm_password) {
                  return res.status(400).json({
                        success: false,
                        message: "password not matched"
                  })
            }
            seller.password = new_password
            await seller.save()
            await Confirmation_Email(seller.sellername,email,)
            return res.status(200).json({
                  success: true,
                  message: "Password changed succesfully"
            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = ChangePassword