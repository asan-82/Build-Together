const express=require("express");
const router=express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validator");

router.get("/profile/view",userAuth, async (req,res)=>{
    try{

const user=req.user;
res.send(user);

    }
    catch(err)
    {
res.status(400).send("ERROR: " + err.message);
    }
});
router.patch("/profile/edit",userAuth, async (req,res)=>{
    try{

if(!validateEditProfileData(req))
{
    throw new Error("Invalid Edit Request");
}
const loggedUser=req.user;
Object.keys(req.body).forEach((key)=>(loggedUser[key]=req.body[key]))
await loggedUser.save();
res.json({message:`${loggedUser.firstName}, Profile Updated Successfully!`,data:loggedUser});    
}
    
    catch(err)
    {
res.status(400).send("ERROR: " + err.message);
    }
});

module.exports=router;