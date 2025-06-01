const validator = require('validator');

const validateReqBody=(req)=>{
    const {firstName,lastName,password,emailId}=req.body;
   if(!firstName||!lastName)
   {
    throw new Error("Provide full name");

   }
   else if(!validator.isEmail(emailId))
   {
    throw new Error("Incorrect email ID");
   }
    else if (!(validator.isStrongPassword(password)))
    {
        throw new Error("Provide correct password");
    }
}
module.exports={
validateReqBody
}