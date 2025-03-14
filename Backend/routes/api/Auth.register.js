const router = require("express").Router();

const register = require("../../controllers/Auth/Register.js")
const {login} = require("../../controllers/Auth/Login.js")

router.post("/Register", register);
router.post("/login", login)

module.exports = router;