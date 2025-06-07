const express = require("express");
const connectDB = require("./config/database.js");

const { ReturnDocument } = require("mongodb");


const cookieParser=require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/authRouter.js");
const profileRouter=require("../src/routes/profile.js");
const requestsRouter=require("../src/routes/requests.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);

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
