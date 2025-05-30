const router = require('express').Router();
const wishlist = require("./MyWishList.js")
const authroutes = require("./Auth.register.js")
const products = require("./Product.js")
const address = require("./Address.js")
const cart = require("./Cart.js")
const order = require("./Order.js")
const oldproductorder = require("./Oldproductorder.js")
const seller = require("./Seller.js")
const payment = require("./Payment.js")

router.use("/product",products)
router.use("/Auth",authroutes)
router.use("/wishlist",wishlist)
router.use("/cart",cart)
router.use("/Address",address)
router.use("/order",order)
router.use("/oldproductorder",oldproductorder)
router.use("/seller",seller)
router.use("/payment",payment)

router.get("/ping",(req,res)=>{
      res.json({success:"true",message:"sucessful request"})
})

module.exports = router;