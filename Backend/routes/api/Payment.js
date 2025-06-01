const router = require("express").Router()

const {createOrder} = require("../../controllers/Payment/CreateOrder")
const {verifyPayment} = require("../../controllers/Payment/VerifyPayment")
const { refundPayment} = require("../../controllers/Payment/Refund")
const {AllPayments} = require("../../controllers/Payment/AllPayments")
const {CheckAuth} = require("../../Middleware/Checkauth")
router.post("/createorder",CheckAuth,createOrder)
router.post("/verifypayment",CheckAuth,verifyPayment)
router.put("/refund/:id",CheckAuth,refundPayment)
router.get("/allpayments",AllPayments)
module.exports = router