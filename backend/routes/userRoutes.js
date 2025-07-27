import express from 'express'
import { signup,login,checkAuth,updateProfile } from '../controllers/userController.js';
import {protectroute} from '../middleware/auth.js'
const userRouter=express.Router();
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.put('/update',protectroute,updateProfile)
userRouter.get('/check',protectroute,checkAuth);
export default userRouter;