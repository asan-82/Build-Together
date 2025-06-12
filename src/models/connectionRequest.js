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
                values:["interested","ignored","accepted","rejected"],
                message: props => "${props.value} is incorrect status type"
            }
        }
},
{
timestamps:true
});

connectionRequestSchema.index({senderUserId:1,receiverUserId:1});

const connectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=connectionRequestModel;