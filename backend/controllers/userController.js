import User from '../models/User.js'
import { generateToken } from '../lib/utils.js'
import bcrypt from 'bcryptjs'  
import validator from 'validator'
import cloudinary from '../lib/cloudinary.js'
export const signup=async(req,res)=>{
    const {fullName,email,password,bio}=req.body
    try{
        if(!fullName || !email || !password || !bio) {
            return res.json({success:false,message:"Missing details"})
        }
        const user=await User.findOne({email})
        if(user) {
            return res.json({success:false,message:"User Already Exist"})
        }
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8) {
            return res.json({success:false,message:"Please choose a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            fullName,email,password:hashedpassword,bio
        });
        const token=generateToken(newUser._id);
        return res.json({success:true,userData:newUser,token,message:"Account Created Successfully"});
    }
    catch(error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}
 export const login=async(req,res)=> {
    const{email,password}=req.body;
    try{
        const userData=await User.findOne({email});
        if(!userData) {
            return res.json({success:false,message:"User not exist"})
        }
        const ismmatch=await bcrypt.compare(password,userData.password);

        if(!ismmatch) {
           return  res.json({success:false,message:"Please enter correct password or id"})
        }
        const token=generateToken(userData._id);
        return res.json({ success: true,userData,token,message:"Login Successfull"});
    }
    catch(error) {
        console.log(error);
       return  res.json({success:false,message:"Error"})
    }
}
export const checkAuth=(req,res)=>{
    res.json({success:true,user:req.user})
}
export const updateProfile=async(req,res)=>{
    try{
        const{profilePic,bio,fullName}=req.body;
        const userId=req.user._id;
        let updatedUser;
        if(!profilePic) {
            updatedUser=await User.findByIdAndUpdate(userId,{bio,fullName},{new:true})
        }
        else {
            const upload=await cloudinary.uploader.upload(profilePic);
            updatedUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true});
        }
        res.json({success:true,user:updatedUser})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}