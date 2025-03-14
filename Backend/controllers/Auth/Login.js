const User = require("../../Models/user.model"); 
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../../Services/Validatiion_schema"); // Import your validation schema

const login = async (req, res, next) => {
  try {

    const { email, password } = await loginValidation.validateAsync(req.body);
     console.log(req.body)
     console.log("Successfully loggin !")
    const existingUser = await User.findOne({ email })
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

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        username: existingUser.username,
        email: existingUser.email,
      },
    });

  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

module.exports = { login };