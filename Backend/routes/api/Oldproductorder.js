const express = require("express")
const router = express.Router()

const {CheckAuth} = require("../../Middleware/Checkauth")
const {Order} = require("../../controllers/OldproductOrder/Order")
const {FetchOrders} =  require("../../controllers/OldproductOrder/FetchOrders")
const {CancelOrder} = require("../../controllers/OldproductOrder/CancelOrder")
const {GetOrders} = require("../../controllers/OldproductOrder/GetOrders")
const {UpdateOrder} = require("../../controllers/OldproductOrder/UpdateOrder")

router.post("/order",CheckAuth,Order)
router.get("/myorders",CheckAuth,FetchOrders)
router.put("/cancelorder",CheckAuth,CancelOrder)
router.get("/getorders",CheckAuth,GetOrders)
router.put("/updateorder",CheckAuth,UpdateOrder)
module.exports = router