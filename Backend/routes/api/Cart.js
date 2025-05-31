const router  =  require("express").Router()
const {CheckAuth} = require("../../Middleware/Checkauth")

const {AddToCart} = require("../../controllers/Cart/AddToCart")
const {RemoveFromCart} = require("../../controllers/Cart/RemoveFromCart")
const {GetMyCart} = require("../../controllers/Cart/GetCart")
const {UpdateCart} = require("../../controllers/Cart/UpdateCart")
const {ClearCart} = require("../../controllers/Cart/ClearCart")

router.post("/addtocart",CheckAuth,AddToCart)
router.put("/removefromcart",CheckAuth,RemoveFromCart)
router.get("/getmycart",CheckAuth,GetMyCart)
router.post("/updatecart",CheckAuth,UpdateCart)
router.delete("/clearcart",CheckAuth,ClearCart)
module.exports = router