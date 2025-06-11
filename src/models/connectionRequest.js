const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    senderUserId:{
        type:mongoose.Schema.Types.ObjectId,
         required:true
        },
        receiverUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        },
        status: {
            type:String,
            enum:{
                values:["Interested","Ignored","Accepted","Rejected"],
                message:`${value} is incorrect status type`
            }
        }
},
{
timestamps:true
})

const connectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=connectionRequestModel;