const express=require("express");
const app=express();


app.use("/text",(req,res,next)=>{
    console.log("bleh");
    res.send("hey world");
    next();
}, (req,res)=>{
    console.log("blah");
res.send("hey2 world");
});
app.use("/abc/:id",(req,res)=>{
    console.log(req.params);
    res.send("aaru");
})
app.use((req,res)=>{
    res.send("hello world");
})


app.listen(3000,()=>{
    console.log("listning on port 3000");
})