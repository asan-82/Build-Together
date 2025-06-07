const express=require("express");
const router=express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");

router.post("/sendConnectionRequest",userAuth,(req,res)=>{
    
    try{const user=req.user;

    console.log("user is"+user.firstName);
    res.send(user.firstName+"sent a connection request");
}
catch(err)
{
    res.status(400).send(err);
}
})

module.exports=router;