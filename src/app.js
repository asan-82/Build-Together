const express=require("express");
const connectDB=require("./config/database.js");
const User = require('./models/user');
const app=express();

app.use(express.json());
app.post("/signup",async (req,res)=>{
    console.log(req.body);
   /* const userObj={
        "firstName":"Aarushi",
        "lastName":"Dhruv",
        "emailId":"aarushi@gmail.com",
        "password":"aarushi@123"
    }
        */
    const user=new User(req.body);
  try{
    await user.save();
   res.send("User added successfully!");
  }catch(err){
res.status(400).send("Error saving the user"+err.message);
  }
}
)
connectDB().then(()=>{
console.log("db connection established");
app.listen(3000,()=>{
    console.log("listning on port 3000");
})
}).catch((err)=>{
console.error("db connection cannot be established");
});

   

