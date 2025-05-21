const router = require('express').Router();
const wishlist = require("./MyWishList.js")
const authroutes = require("./Auth.register.js")
const products = require("./Product.js")

router.use("/product",products)
router.use("/Auth",authroutes)
router.use("/wishlist",wishlist)

router.get("/ping",(req,res)=>{
      res.json({success:"true",message:"sucessful request"})
})

module.exports = router;