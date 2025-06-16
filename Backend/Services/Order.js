const nodemailer = require("nodemailer")

const OrderMail =  async(username,email,productName)=>{
      const config = {
            service:"gmail",
            auth:{
                  user:process.env.Email,
                  pass:process.env.password
            }
      }
      let transporter = nodemailer.createTransport(config)
      let message = {
         from:`"ReMarket ${process.env.Email}"`,
         to:email,
         subject:"Product successfully ordered",
         html: `
           <h3>Dear ${username}</h3>
           <p>You have successfully ordered ${productName}<br>Product will be delivered in next 7-8 days</p>
           <h4>Thank you!</h4>
         `
      }
      try{
            transporter.sendMail(message)
            console.log("Email sent")
      }catch(err){
            console.log("error sending email :",err)
      }
}
module.exports = {OrderMail}