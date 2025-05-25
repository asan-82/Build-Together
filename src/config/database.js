const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
"mongodb+srv://aarushidhruv:5z0dlv2R7UkI7qPO@build-together.hwjwire.mongodb.net/buildTogether"
    );
}

module.exports=connectDB;