const express = require("express")
const router = express.Router()

const {CheckAuth} = require("../../Middleware/Checkauth")
const {Myorder} = require("../../controllers/Order/Order")
const {FetchOrder} = require("../../controllers/Order/FetchOrder")
const {AllOrders} = require("../../controllers/Order/AllOrders")
const {UpdateStatus} = require("../../controllers/Order/UpdateOrderStatus")

router.post("/order",CheckAuth,Myorder)
router.get("/myorders",CheckAuth,FetchOrder)
router.get("/allorders",CheckAuth,AllOrders)
router.put("/updatestatus",CheckAuth,UpdateStatus)
module.exports = router