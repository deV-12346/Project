const nodemailer = require("nodemailer")

const RegistrationEmail = async(email,name)=>{
      const config = {
            service:"gmail",
            auth:{
            user:process.env.Email,
            pass:process.env.Password
      }
}
      const transporter = nodemailer.createTransport(config)
      let message = {
            from:`"ReMarket"<${process.env.Email}>`,
            to:email,
            subject:"Welcome to Our Platform",
            html: `
            <p>Dear ${name},<br>Your account has been successfully created.</p>
            <p style="font-size:20px">Explore the Shopping with us</b></p> 
            <p style="color:red; font-size:30px">Best regards,<br><b>ReMarket</b></p>
            `
      }
            try{
               await transporter.sendMail(message)
               console.log("email sent")
            }
            catch(error){
                  console.log("error",error)
            }
}
module.exports = {RegistrationEmail}