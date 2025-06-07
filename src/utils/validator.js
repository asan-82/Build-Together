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
const validateEditProfileData=(req)=>{
    const allowedEditFields=["lastName","firstName","about","age","skills","emailId","photoUrl"];
   const isEditAllowed= Object.keys(req.body).every(field => allowedEditFields.includes(field));
   return isEditAllowed;
}
module.exports={
validateReqBody,validateEditProfileData
}