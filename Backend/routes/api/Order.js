const express = require("express")
const router = express.Router()
const {CheckAuth} = require("../../Middleware/Checkauth")
const {Myorder} = require("../../controllers/Order/Order")
const {FetchOrder} = require("../../controllers/Order/FetchOrder")
router.post("/order",CheckAuth,Myorder)
router.get("/myorders",CheckAuth,FetchOrder)
module.exports = router