const express=require("express");
const connectDB=require("./config/database.js");
const app=express();


connectDB().then(()=>{
console.log("db connection established");
app.listen(3000,()=>{
    console.log("listning on port 3000");
})
}).catch((err)=>{
console.error("db connection cannot be established");
});

   

