var express = require("express")
var router = express.Router();
const { check,validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controller/auth")
 
router.post("/signup",[
    check("name","name should be at least 3 characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 characters").isLength({min:3})

]
,signup);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 characters").isLength({min:3})

]
,signin);

router.get("/signout",signout);
module.exports=router;
router.get("/testroute",isSignedIn,(req,res)=>{
res.send(req.auth);
});