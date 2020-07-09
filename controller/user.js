const User = require("../models/user");
const Order = require("../models/orders");


exports.getUserById = (req,res,next,id)=> {
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No user found in Db"
            });

        }
        req.profile=user;
        next();

    })
}

exports.getUser = (req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
};
// exports.getAllUsers = (req,res)=>{
//     User.find().exec((err,user)=>{
//         if(err || !user){
//             return res.status(400).json({
//                 error:"No users found"
//             });
//         }
//         res.json(user);
//     });

// }
exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error :"you are not autherized to update "
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;

            res.json(user);
        }
    )

}
exports.userPurchaseList = (req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
        return res.status(400).json({
            error:"No orders in this account"
        });
    }
    return res.json(order);
});
}

exports.pushOrdersInPurchaseList= (req,res,next)=>{
    let purchases = [];
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id : product.id,
            name : product.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transanction_id : req.body.order.transanction_id
        });
    });
    //Storing in the db
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push : {purchases : purchases}},
        {new : true},
        (err,purchases)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to save purchase list"
                })
            }
            next();

        }
    )

}