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

const {EditUsedProduct} = require("../../controllers/Auth/EditUsedProduct")
router.put("/editusedproduct",EditUsedProduct)

const {DeleteUsedProduct} = require("../../controllers/Auth/DeleteUsedProduct")
router.delete("/deleteusedproduct",DeleteUsedProduct)

const {AllOldProducts} = require("../../controllers/Auth/GetAllUsedProducts")
router.get("/getoldproducts",AllOldProducts)

const {UserAddress} = require("../../controllers/Auth/Address")
router.post("/address",UserAddress)

const {FetchAddress} = require("../../controllers/Auth/AddressGet")
router.get("/getaddress",FetchAddress)
module.exports = router