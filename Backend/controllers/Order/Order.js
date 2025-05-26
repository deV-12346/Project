const Order = require("../../Models/Order")
const Cart = require("../../Models/Cart")
const Myorder = async (req,res,next)=>{
      try{
      const {items, address, payment } = req.body
      const userId = req.user?.id
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

      const neworder = new Order({
          userId,
          items,
          address,
          payment,
          totalAmount,
      })
      await neworder.save()
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
 