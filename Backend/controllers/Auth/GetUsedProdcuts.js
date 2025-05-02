const Product = require("../../Models/UsedProduct")
const UsedProduct = async (req, res, next) => {
      try {
            const sellerId = req.user?.id;
            const product = await Product.find({id:sellerId})
            if (!product || product.length === 0) {
                 return res.status(400).json({
                        success: false,
                        message: "Products not found"
                  })
            }
            return res.status(200).json({
                  success: true,
                  message: "Product fatched",
                  data: product
            })
      }
      catch (error) {
            next(error)
      }
}
module.exports = { UsedProduct }