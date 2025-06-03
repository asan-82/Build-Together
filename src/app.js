const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const { validateReqBody } = require("../src/utils/validator.js");
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("../src/middlewares/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) 
        {
            const token= await jwt.sign({_id:user._id},"Abracadabara@12345",{
                expiresIn:"7d",
            })
            console.log(token);
            res.cookie("token",token);
            res.send("Login Successful!!!");
        }else throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
app.get("/profile",userAuth, async (req,res)=>{
    try{

const user=req.user;
res.send(user);

    }
    catch(err)
    {
res.status(400).send("ERROR: " + err.message);
    }
})
app.get("/users", (req, res) => {
  const email = req.body.emailId;
  User.findOne({ emailId: email })
    .then((users) => res.send(users))
    .catch((err) =>
      res.status(500).send("Error fetching users: " + err.message)
    );
});
app.patch("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  var data = req.body;

  try {
    const ALLOWED_UPDATES = ["skills", "photoUrl", "gender", "age", "password"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      //console.log(Error);
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills cannot exceed the length of 10");
    }
    const changed = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});
app.delete("/users", async (req, res) => {
  const id = req.body._id;

  try {
    await User.deleteOne({ _id: id });
    res.send("Deleted successfully");
  } catch (err) {
    res.status(400).send("error occured");
  }
});

connectDB()
  .then(() => {
    console.log("db connection established");
    app.listen(3000, () => {
      console.log("listning on port 3000");
    });
  })
  .catch((err) => {
    console.error("db connection cannot be established");
  });
