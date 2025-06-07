const express=require("express");
const router=express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");

router.get("/profile",userAuth, async (req,res)=>{
    try{

const user=req.user;
res.send(user);

    }
    catch(err)
    {
res.status(400).send("ERROR: " + err.message);
    }
});

module.exports=router;