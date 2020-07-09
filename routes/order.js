const express = require("express");
const router = express.Router();


const {isAuthenticated,isAdmin,isSignedIn} = require("../controller/auth");
const {getUserById,pushOrdersInPurchaseList} = require("../controller/user");
const {updateStock} = require("../controller/product");


const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus} = require("../controller/order");
//params
router.param("userId",getUserById),
router.param("orderId",getOrderById),

//actual routes

//create
router.post("/order/create/:userID",isSignedIn,isAuthenticated,
pushOrdersInPurchaseList,updateStock,createOrder);


//read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)
//status
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports = router;