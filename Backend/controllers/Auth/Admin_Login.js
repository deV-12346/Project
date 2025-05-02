const User =require("../../Models/user.model")
const {loginValidation} = require("../../Services/Validatiion_schema")
const bcrypt = require("bcryptjs");
const {generatetoken} = require("../../Middleware/Checkauth")
const AdminLogin = async (req,res,next)=>{
      try {
          const { email, password } = await loginValidation.validateAsync(req.body);
              console.log(req.body)
              const Admin = await User.findOne({ email})
              if (!Admin) {
                return res.status(400).json({
                  success: false,
                  message: "Invalid Email address.",
                });
              }
              const isMatch = await bcrypt.compareSync(password, Admin.password);
              if (!isMatch) {
                return res.status(400).json({
                  success: false,
                  message: "Incorrect password. Please try again.",
                });
              }
              if(Admin.role !== "admin"){
                  return res.status(400).json({
                        success: false,
                        message: "Cannot access admin panel",
                  });
              }
              const payload = {
                  id: Admin.id,
                  email: Admin.email,
                 }
                console.log(payload)
              const token = generatetoken(payload)
              return res.status(200).json({
                  success:true,
                  message:"Log in Successfully",
                  token:token,
                  user:{
                    id:Admin.id,
                    username:Admin.username,
                    email:Admin.email,
                  }
            })
      }
      catch(error){
            next(error)
      }
}
module.exports  = {AdminLogin}