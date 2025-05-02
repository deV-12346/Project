const express = require("express")
const router = express.Router()
const {CheckAuth} = require("../../Middleware/Checkauth")
const {GetProducts} = require("../../controllers/Auth/GetProducts")
router.get("/getproducts",GetProducts)

const {DeleteProduct} = require("../../controllers/Auth/DeleteProduct")
router.delete("/deleteproduct",DeleteProduct)

const {EditProduct} = require("../../controllers/Auth/EditProduct")
router.put("/editproduct",EditProduct)


const {OldProduct} = require("../../controllers/Auth/UsedProducts")
router.post("/usedproduct",OldProduct)

const {UsedProduct} = require("../../controllers/Auth/GetUsedProdcuts")
router.get("/getsellerproducts",CheckAuth,UsedProduct)
module.exports = router