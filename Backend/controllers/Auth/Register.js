const User = require("../../Models/user.model");
const { registrationValidation } = require("../../Services/Validatiion_schema");
const {RegistrationEmail} = require("../../Services/RegistrationEmail")
const Register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    console.log("User data:", req.body);
    const { username,email,mobileno ,password} = registerValues;
    const userEmail = await User.findOne({
      email
    });
    console.log(email);
    
    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: "User Email already exits",
      });
    }
    const newUser = new User({
      username,
      password,
      email,
      mobileno,
    });
    await newUser.save();
    await RegistrationEmail(email,username)
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = Register;