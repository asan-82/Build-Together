const mongoose  = require("mongoose");
var validator = require('validator');

const userSchema =new mongoose.Schema({
    firstName: { type: String,
        required: true
     },
    lastName:{type: String},
    age:{type: Number,
        min: 18,
       
    },
   emailId:{type: String,
    required: true,
    unique: true,
    trim:true,
    validate(value){
    if(!validator.isEmail('value'))
    {
        throw new Error("Email has incorrect format");
    }
}
   },
    password:{type: String,
        required: true
    },
    gender:{type: String},
    photoUrl:{type:String,
        default:"data:image/png;base64,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",
     validate(value){
    if(!validator.isURL('value'))
    {
        throw new Error("Invalid Photo URL");
    }
    }},
    skills:[]
},{
    timestamps:true,
});

const User=mongoose.model("User",userSchema);

module.exports=User;