const express=require("express");
const router=express.Router();
const { validateReqBody } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    validateReqBody(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.verifyPassword(password);
    
    if (isPasswordValid) 
        {
            const token= await user.getJWT();
            console.log(token);
            res.cookie("token",token);
            res.send("Login Successful!!!");
        }else throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
router.post("/logout",async (req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.send("Logged Out Successfully");
});

module.exports=router;