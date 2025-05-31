const Product = require("../../Models/Products")
const OldProduct = require("../../Models/UsedProduct")
const User = require("../../Models/user.model")
const GoogleUser = require("../../Models/Google.user.model")
const MyWishListModel = require("../../Models/MyWishList.Model.js")
const MyWishList = async (req, res, next) => {
      try {
            const { productId } = req.body
            const userId = req.user?.id;
            const user = await User.findById(userId)
            const googleuser = await GoogleUser.findById(userId) 
            if (!user && !googleuser) {
                  res.status(400).json({
                        success: false,
                        message: "User Not Found"
                  })
            }
            const product = await Product.findById(productId)
            const oldproduct = await OldProduct.findById(productId)
            if (!product && !oldproduct) {
                  return res.status(400).json({
                        success: false,
                        message: "Product Not Found"
                  })
            }

            const wishlistRemove = await MyWishListModel.findOne({
                  user: userId,
                  product: productId,
            });

            if (wishlistRemove) {
                  await MyWishListModel.deleteOne({ _id: wishlistRemove._id })
                  return res.status(200).json({
                        success: true,
                        message: "Product removed from mywishlist",
                        product: productId
                  })
            }
            else {
                  const wishlistAdd = new MyWishListModel({
                        user: userId,
                        product: productId,
                  });

                  await wishlistAdd.save();
                  return res.status(200).json({
                        success: true,
                        message: "Product added to mywishlist",
                        product: product
                  })
            }
      }
      catch (err) {
            next(err)
      }
}
module.exports = { MyWishList }