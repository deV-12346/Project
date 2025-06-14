const nodemailer = require("nodemailer")
const CancelOrderMail = async (username,email)=>{
      const config  ={
            service:'gmail',
            auth:{
                  user: process.env.Email,
                  pass: process.env.password,
            }
      }
      let transporter = nodemailer.createTransport(config)
      let message = {
    from: `"ReMarket"<${process.env.Email}>`,
    to: email,
    subject: 'Welcome to Our Platform!',
    html: `
      <p>Dear ${username},<br>Your product has been successfully cancelled</p>
      <p>Amount will be created in your with in 5-7 days</p>
      <p style="color:red , font-size:30px">Best regards,<br><b>ReMarket</b></p>
      `
  };
  try {
     await transporter.sendMail(message)
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending  email:", error);
  }
};
module.exports = {CancelOrderMail}
