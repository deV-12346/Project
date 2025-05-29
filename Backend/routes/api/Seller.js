const router = require("express").Router()

const sentotp = require("../../controllers/Seller/VerifyEmail")
router.post("/sentotp",sentotp)

const verifyOTP = require("../../controllers/Seller/VerifyOTP")
router.post("/verifyotp",verifyOTP)

const ChangePassword = require("../../controllers/Seller/ChangePassword")
router.put("/changepassword",ChangePassword)

module.exports = router