const User = require("../../Models/user.model"); 
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../../Services/Validatiion_schema"); // Import your validation schema
const {generatetoken} = require("../../Middleware/Checkauth")
const Login = async (req, res, next) => {
  try {
    
    const { email, password } = await loginValidation.validateAsync(req.body);
    console.log(req.body)
    const existingUser = await User.findOne({ email})
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email address. Please register.",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }
     const payload = {
      id: existingUser.id,
      email: existingUser.email,
     }
    console.log(payload)
    const token = generatetoken(payload)
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token:token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
    });

  } catch (error) {
    next(error); 
    console.log(error)
  }
};

module.exports = { Login };