const User = require("../../Models/user.model");
const { passwordvalidation } = require('../../Services/Validatiion_schema');
const bcrypt = require('bcryptjs');

const changepassword = async (req, res, next) => {
  try {
    // Validate the input using Joi schema
    const passwordValues = await passwordvalidation.validateAsync(req.body);
    console.log(passwordValues);
    console.log("user password:", req.body);

    const { old_password, new_password, confirm_password } = passwordValues;
    const  {id} = req.params;

    // Find the user in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Compare old password with the stored hashed password
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect"
      });
    }

    // Check if new password matches confirm password
    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match"
      });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error){
    next(error);
  }
};

module.exports = changepassword;