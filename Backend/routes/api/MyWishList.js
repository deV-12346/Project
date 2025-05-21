const express = require("express")
const router = express.Router()

const {CheckAuth} = require("../../Middleware/Checkauth")

const {MyWishList} = require("../../controllers/Auth/MyWishList")
router.post("/mywishlist",CheckAuth,MyWishList)

const {FetchMyWishList} = require("../../controllers/Auth/FetchMyWishList")
router.get("/fetchmywishlist",CheckAuth,FetchMyWishList)

module.exports = router