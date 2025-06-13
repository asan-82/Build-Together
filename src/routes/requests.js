const express=require("express");
const mongoose = require("mongoose");
const router=express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const connectionRequestModel = require("../models/connectionRequest");

router.post("/request/send/:status/:receiverUserId",userAuth,async (req,res)=>{
    
    try{
    const senderUserId=req.user._id;
    const receiverUserId=req.params.receiverUserId;
    const status=req.params.status;
   
    const allowedStatus=["interested","ignored"];
    if(!allowedStatus.includes(status))
    {
        return res.status(400).json({message:"Invalid status type: "+status});
    }
      if (!mongoose.Types.ObjectId.isValid(receiverUserId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
}
if (senderUserId.equals(receiverUserId)) {
    return res.status(400).json({ message: "Invalid Connection Request" });
}
    const toUser=await User.findById(receiverUserId);
    if(!toUser)
    {
        return res.status(400).json({message:"User not found"});
    }
  //  check if a connection request already exists between two users, regardless of who sent it.
    const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
            {senderUserId, receiverUserId},
            {senderUserId:receiverUserId, receiverUserId:senderUserId},
        ],
    });
    if(existingConnectionRequest)
    {
        return res.status(400).json({message:"Connection Request Already Exists!!!"})
    }
    const connectionRequest=new ConnectionRequest({
        senderUserId,
        receiverUserId,
        status,
    });
  const data=await connectionRequest.save();
  res.json({
    message:"Connection Request Sent Successfully!",
    data,
  })
    }
catch(err)
{
    res.status(400).send(err);
}
});
router.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    
    try{
    const loggedInUser=req.user;
    const {status,requestId}=req.params;
console.log("hii");
    const allowedStatus=["accepted","rejected"];

    if(!allowedStatus.includes(status))
    {
      return res.status(400).json({message:"Invalid Status"});
    }

    const connectionRequestDoc=await ConnectionRequest.findOne({

        _id:requestId,
        receiverUserId: loggedInUser._id,
       status:"interested",

    });
    if(!connectionRequestDoc)
    {
      return res.status(400).json({message:"Connection request not found!"});
        
    }
    connectionRequestDoc.status=status;
   const data= await connectionRequestDoc.save();
  return res.json({message:"Connection Request: "+status,data});
    }
catch(err)
{
  return res.status(400).send(err);
}
});
module.exports=router;