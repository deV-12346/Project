const router = require("express").Router()

const {createOrder} = require("../../controllers/Payment/CreateOrder")
const {verifyPayment} = require("../../controllers/Payment/VerifyPayment")
const {CheckAuth} = require("../../Middleware/Checkauth")
router.post("/createorder",CheckAuth,createOrder)
router.post("/verifypayment",CheckAuth,verifyPayment)

module.exports = router