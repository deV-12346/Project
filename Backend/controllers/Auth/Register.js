const User = require("../../Models/user.model");
const { registrationValidation } = require("../../Services/Validatiion_schema");
const register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    console.log("user data:", req.body);
    const { username,email,mobileno ,password } = registerValues;
    const userEmail = await User.findOne({
      email,
    });
    console.log(email);
    
    if (userEmail) {
      return res.status(200).json({
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

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;