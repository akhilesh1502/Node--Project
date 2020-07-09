const express =require("express");
const router = express.Router();


const {makepayment} = require("../controller/stripePayment")



router.post("/stripepayment",makepayment)







module.exports = router;