const router = require('express').Router();
const authroutes = require("./Auth.register.js")
router.use("/Auth",authroutes)

router.get("/ping",(req,res)=>{
      res.json({success:"true",message:"sucessful request"})
})

module.exports = router;