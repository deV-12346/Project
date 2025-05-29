const router = require("express").Router();
const Register = require("../../controllers/Auth/Register.js")
const {Login} = require("../../controllers/Auth/Login.js")
const {CheckAuth} = require("../../Middleware/Checkauth.js")
const {Sellerlogin} = require("../../controllers/Auth/Sellerlogin.js")
const Sellerregister = require("../../controllers/Auth/Sellerregister.js")
const {Adduser} = require("../../controllers/Auth/Adduser.js")

router.post("/register",Register);
router.post("/login",Login)

router.post("/sellerlogin", Sellerlogin)
router.post("/sellerregister", Sellerregister)

const {Changepassword} = require("../../controllers/Auth/Changepassword.js")
router.put("/changepassword",Changepassword)
const {getotp} = require("../../controllers/Auth/Changepassword.js")
router.post("/generateotp" ,getotp)

router.post("/addusers",CheckAuth,Adduser)

const { getAllUsers } = require("../../controllers/Auth/Getusers.js")
router.get("/users",CheckAuth,getAllUsers)

const {GetallSellers} = require("../../controllers/Auth/GetSellers.js")
router.get("/sellers",CheckAuth,GetallSellers)

const {EditUser} = require("../../controllers/Auth/EditUser.js")
router.put("/Edituser",CheckAuth,EditUser)

const {Removeuser} = require("../../controllers/Auth/Deleteuser.js")
router.delete("/Removeuser",CheckAuth,Removeuser)

const {EditSeller} = require("../../controllers/Auth/EditSeller.js")
router.put("/Editseller",CheckAuth,EditSeller)

const {Deleteseller} = require("../../controllers/Auth/DeleteSeller.js")
router.delete("/removeseller",CheckAuth,Deleteseller)

const {products } = require("../../controllers/Auth/Products.js")
router.post("/uploadfile",CheckAuth,products)

const {AdminLogin} = require("../../controllers/Auth/Admin_Login.js")
router.post("/adminlogin",AdminLogin)

const {GoogleLogin} = require("../../controllers/Auth/GoogleLogin.js")
router.get("/google",GoogleLogin)

const {GetGoogleUser} = require("../../controllers/Auth/GetGoogleuser.js")
router.get("/getggogleuser",GetGoogleUser)

const  DeleteGoogleUser = require("../../controllers/Auth/DeleteGoogleUser.js")
router.delete("/deletedgoogleuser/:id", DeleteGoogleUser)

module.exports = router; 