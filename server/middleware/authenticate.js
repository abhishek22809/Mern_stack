const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
router.use(cookieParser())

const User =require("../model/userSchema")
const Authenticate= async(req,res,next)=>{    
    const token=req?.cookies;
 console.log(token)  
// try{ 
//  const token=req?.cookies?.jwtoken;
//  console.log(token)
//  const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
//  const rootUser= await User.findOne({_id:verifyToken._id,"tokens.token":token})
//  if(!rootUser){throw new Error('User Not Found')}
//  req.token=token;
//  req.rootUser=rootUser;
//  req.userID=rootUser._id
//  next();
// }
// catch(err){
//  res.status(401).send('unauthorised token provided')
// }   


}
module.exports=Authenticate