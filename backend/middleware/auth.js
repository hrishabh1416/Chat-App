import User from '../models/User.js'
import jwt from 'jsonwebtoken'
export const protectroute=async(req,res,next)=>{
    const token=req.headers.token;
    try{
        if(!token) {
            return res.json({success:false,message:"Not Authorized Login Again"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.json({success:false,message:"User not found"});
        }
        req.user=user;
        next();
    }
    catch(error) {
        console.log(error.message);
        res.json({success:false,message:error.message}) 
    }
}