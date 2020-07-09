const {order,ProductCart} =require("../models/orders");

exports.getOrderById = (req,res,next,id)=>{
    order.findById(id).populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order found in db"
            });
        }
        req.order=order;
        next();
    });
}
exports.createOrder = (req,res)=>{
    req.body.order.user =req.profile;
    const Order = new order(req.body.order);
    Order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in db"
            });
        }
        res.json(order);
    }); 
}
exports.getAllOrders =(req,res)=>{
    order.find().populate("user","_id name").
    exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No orders Found in db"
            });
        }
        res.json(order);
    });
}
exports.getOrderStatus = (req,res)=>{
    res.json(order.schema.path("status").enumValues);

}
exports.updateStatus =(req,res)=>{
    order.update(
        {_id:req.body.orderId},
        {$set : {status: req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update order status"
                });
            }
            res.json(order);
        }
    );

}