const nodemailer = require("nodemailer")

const Confirmation_Email =  async(username,email)=>{
     let config = {
      service:"gmail",
      auth:{
            user:process.env.Email,
            pass:process.env.Password
      },
     }
     let transporter = nodemailer.createTransport(config)
     let message ={
      from: `"ReMarket"<${process.env.Email}>`,
      to:email,
      subject: 'Welcome to Our Platform!',
      html:`
      <div>
      <p>Dear ${username}</p>
      <h1>Password has been successfully changed</h1>
      </div>
      `
     }
     try{
      await transporter.sendMail(message)
      console.log("Email sent")
     }
     catch(error){
      console.log("Error",error)
     }
}
module.exports = {Confirmation_Email}