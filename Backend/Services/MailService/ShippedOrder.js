const nodemailer = require("nodemailer")
const ShippedOrderMail = async (username,email)=>{
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
      <p>Dear ${username},<br>Your product has been successfully shipped</p>
      <p>Product will be delivered in next 4-5 days</p>
      <p>Continue shopping with us</p>
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
module.exports = {ShippedOrderMail}