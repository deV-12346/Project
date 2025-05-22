const Cart = require("../../Models/Cart")
const ClearCart = async (req, res, next) => {
      try {
            const userId = req.user?.id
            const { productId } = req.body
            const cart = await Cart.findOne({ userId })
            if (!cart) {
                  return res.status(400).json({
                        success: false,
                        message: "Cart not found"
                  })
            }
            cart.CartItems = cart.CartItems.filter((item) => item.productId.toString() !== productId );

            await cart.save();

            return res.status(200).json({
                  success: true,
                  message: "Successfully removed from cart",
                  remainingItems: cart.CartItems,
            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = { ClearCart }