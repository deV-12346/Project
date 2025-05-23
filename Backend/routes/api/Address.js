const express = require("express")
const router = express.Router()

const {UserAddress} = require("../../controllers/Address/Address")
router.post("/address",UserAddress)

const {FetchAddress} = require("../../controllers/Address/AddressGet")
router.get("/getaddress",FetchAddress)

const {DeleteAddress} = require("../../controllers/Address/DeleteAddress")
router.delete("/deletedaddress",DeleteAddress)

module.exports = router