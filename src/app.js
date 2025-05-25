const express=require("express");
const connectDB=require("./config/database.js");
const User = require('./models/user');
const app=express();

app.post("/signup",async (req,res)=>{
    const userObj={
        "firstName":"Aarushi",
        "lastName":"Dhruv",
        "emailId":"aarushi@gmail.com",
        "password":"aarushi@123"
    }
    const user=new User(userObj);
   await user.save();
   res.send("User added successfully!");
})
connectDB().then(()=>{
console.log("db connection established");
app.listen(3000,()=>{
    console.log("listning on port 3000");
})
}).catch((err)=>{
console.error("db connection cannot be established");
});

   

