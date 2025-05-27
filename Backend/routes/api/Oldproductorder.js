const express = require("express")
const router = express.Router()

const {CheckAuth} = require("../../Middleware/Checkauth")
const {Order} = require("../../controllers/OldproductOrder/Order")
const {FetchOrders} =  require("../../controllers/OldproductOrder/FetchOrders")
const {CancelOrder} = require("../../controllers/OldproductOrder/CancelOrder")

router.post("/order",CheckAuth,Order)
router.get("/myorders",CheckAuth,FetchOrders)
router.put("/cancelorder",CheckAuth,CancelOrder)
module.exports = router