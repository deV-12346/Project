const User = require("../../Models/user.model")
const {AdduserregistrationValidation} = require("../../Services/Validatiion_schema")
const Email = require("../../Services/EmailService");
const Adduser = async (req ,res, next)=>{
   try {
       const registerValues = await AdduserregistrationValidation.validateAsync(req.body);
       console.log(registerValues);
       console.log("User data:", req.body);
       const { username,email,mobileno ,password,role="user"} = registerValues;
       const userEmail = await User.findOne({
         email,
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
         role,
       });
      await newUser.save();
      await Email(email,username,password);
      res.status(200).json({
         success: true,
         message: "User registered successfully",
         data: registerValues,
       });
     } catch (error) {
       next(error);
     }
   };
module.exports = {Adduser}