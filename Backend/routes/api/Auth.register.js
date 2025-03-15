const router = require("express").Router();

const Register = require("../../controllers/Auth/Register.js")
const {Login} = require("../../controllers/Auth/Login.js")

const {Sellerlogin} = require("../../controllers/Auth/Sellerlogin.js")
const Sellerregister = require("../../controllers/Auth/Sellerregister.js")

router.post("/register", Register);
router.post("/login", Login)

router.post("/sellerlogin", Sellerlogin)
router.post("/sellerregister", Sellerregister)

module.exports = router;