const express=require("express");
const app=express();

app.use("/text",(req,res)=>{
    res.send("hey world");
})

app.use((req,res)=>{
    res.send("hello world");
})


app.listen(3000,()=>{
    console.log("listning on port 3000");
})