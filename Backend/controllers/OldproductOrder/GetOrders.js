const Orders = require("../../Models/OldproductOrder.model")

const GetOrders = async (req, res, next) => {
      try {
            const sellerid = req.user?.id
            const sellerorders = await Orders.find({sellerId: sellerid}).populate('productId').populate('sellerId');
            if (!sellerorders) {
                  return res.status(400).json({
                        success: false,
                        message: "Order not found"
                  })
            }
            if (sellerorders.length === 0) {
                  return res.status(404).json({
                        success: false,
                        message: "No orders found for this seller",
                  });
            }
            const orderProduct = sellerorders.map(order => ({
                  ...order._doc,
                  productId: order.productId?._id,
                  productName: order.productId?.productName,
                  category: order.productId?.category,
                  productDescription: order.productId?.productDescription,
                  price: order.productId?.price,
                  images: order.productId?.images,
                  status: order.productId?.status,
            }));
            return res.status(200).json({
                  success: true,
                  message: "Orders found successfully",
                  orders: orderProduct
            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = { GetOrders }