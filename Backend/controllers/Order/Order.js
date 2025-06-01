const Order = require("../../Models/Order")
const Cart = require("../../Models/Cart")
const OrderMail = require("../../Services/Order")
const Myorder = async (req,res,next)=>{
      try{
      const {items, address, payment ,payment_id} = req.body
      console.log(payment_id)
      const userId = req.user?.id
      const username = req.user?.username

      const email = req.user?.email

      console.log(userId)
      if(!items || items.length===0){
            return res.status(400).json({
                  success:false,
                  message:"Cart is empty"
            })
      }
      const totalAmount = items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
     }, 0);
     const user = await Cart.findOneAndDelete({ userId })

      const orderItems = items.map(item => ({
       ...item,
       username,
       email
        }));
      const neworder = new Order({
          userId,
          items:orderItems,
          address,
          payment,
          totalAmount,
          payment_id,
      })
      await neworder.save()

      const productNames = items.map(item => item.productName).join(", ");
      OrderMail(username,email,productNames)

      return res.status(200).json({
            success:true,
            message:"Prduct has been ordered",
            neworder,
            user
      })
      }
      catch(err){
            next(err)
      }
}
module.exports = {Myorder}
 