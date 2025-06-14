const nodemailer = require("nodemailer")
const OTP = require("../Models/Otp.Model")
const SendOTP = async (email) =>{
      try {
            const otp = Math.floor(Math.random() * 1000000);
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.Email,
                pass: process.env.Password,
              }
            });
            const storedata = new OTP({
              email,
              otp,
            })
            await storedata.save()
            let message = {
              from: `"ReMarket"<${process.env.Email}>`,
              to: email,
              subject: 'Your OTP for password change',
              text: `Your OTP for changing the password is: ${otp}`
            };
        
            await transporter.sendMail(message);
            console.log("OTP sent");
          } catch (error) {
            console.error("Error sending OTP:", error);
          }
}
module.exports = {SendOTP}