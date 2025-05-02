const User = require("../../Models/user.model");
const { SendOTP } = require("../../Services/SendOTP")
const { passwordvalidation } = require("../../Services/Validatiion_schema");
const OTP = require("../../Models/Otp.Model")
const {Confirmation_Email} = require("../../Services/PasswordConfirmation")
const bcrypt = require("bcryptjs")
const getotp = async (req, res) => {

const { email, new_password, confirm_password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found"
    });
  }
   const isMatch = await bcrypt.compare(new_password, user.password);
      if (isMatch) {
        return res.status(400).json({
          success: false,
          message: "Don't use previous Password",
        });
      }
  if (new_password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Password do not match"
    });
  }
  await SendOTP(email);

  return res.status(200).json({
    success: true,
    message: "OTP sent to your email"
  });
};

const Changepassword = async (req, res) => {
  try {
    const { email, new_password, confirm_password, otp } = await passwordvalidation.validateAsync(req.body);

    console.log("User OTP:", otp);
    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password do not match"
      });
    }

    const user = await OTP.findOne({ email });
    console.log("User data in db", user);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired"
      });
    }
    const { otp: Otp, timestamp } = user;

    if (otp !== Otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const currentTime = Date.now();
    const expirationTime = 60000;  
    const timeDifference = currentTime - timestamp;

    if (timeDifference > expirationTime) {
      await OTP.deleteOne({ email });
      console.log("OTP Expired");
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }
    const existinguser = await User.findOne({email})
    existinguser.password = new_password;
    await existinguser.save();

    await OTP.deleteOne({ email });
    await Confirmation_Email(existinguser.username,email)
    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getotp, Changepassword };       