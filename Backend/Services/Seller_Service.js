const nodemailer = require("nodemailer");

const Email = async (email, sellername, password) => {
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.password,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let message = {
    from: `"ReMarket"<${process.env.Email}>`,
    to: email,
    subject: 'Welcome to Our Platform!',
    html: `
      <p>Dear ${sellername},<br>Your account has been successfully created</p>
      <p style="font-size:20px">E-mail <b>${email}</b></p>
      <p style="font-size:20px">Password <b>${password}</b></p>
      <p style="font-size:20px">Seller your product on our platform</p>
      <p style="color:red , font-size:30px">Best regards,<br><b>ReMarket</b></p>
      `
  };
  transporter.sendMail(message)
  try {
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending  email:", error);
  }
};
module.exports = Email

