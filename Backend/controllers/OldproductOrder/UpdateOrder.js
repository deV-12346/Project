const Product = require("../../Models/UsedProduct")

const UpdateOrder = async (req, res, next) => {
      try {
            const { id, status } = req.body

            const product = await Product.findById(id)
            console.log(id)
            if (!product) {
                  return res.status(400).json({
                        success: false,
                        message: "Product not found"
                  })
            }
            product.status= status
            await product.save()
            return res.status(200).json({
                  success: true,
                  message: "Product updated successfully",
                  product

            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = { UpdateOrder }