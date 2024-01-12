const CustomApiError = require("../error/customApiError");
const User = require("../models/user");
const jwt=require('jsonwebtoken')
const register=async(req,res,next)=>{
  try{
     const user=await User.create(req.body);
     res.status(200).json(user)
  }catch(error){
    console.log(error)
    next(new CustomApiError(error.message,400))
  }
}
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) res.status(401).json({ msg: "Invalid email/password" });
    else{
     //GENERATE Json Web Token
    const {email,username,role}=user;
    const token=jwt.sign({email,username,role},process.env.JSON_SECRETKEY,{expiresIn:'1800s'})   
    res.status(200).json(token);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};
module.exports = {login,register};
