const Orders = require("../../Models/Order")
const AllPayments = async(req,res,next)=>{
      try{
            const payments = await Orders.find({ payment_id: { $ne: null }}).populate("payment_id").populate("userId", "username mobileno")
            return res.status(200).json({
                  success:true,
                  message:"found",
                  payments
            })
      }catch(err){
            next(err)
      }
}
module.exports = {AllPayments}