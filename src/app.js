const express = require("express");
const connectDB = require("./config/database.js");
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
