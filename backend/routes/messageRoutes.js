import express from 'express'
import { getMessages,getUsersforSidebar,markMessageAsSeen,sendMessage} from '../controllers/messageController.js';
import {protectroute} from '../middleware/auth.js'
const messageRouter=express.Router();
messageRouter.post('/users',protectroute,getUsersforSidebar);
messageRouter.post('/:id',protectroute,getMessages);
messageRouter.put('/mark/:id',protectroute,markMessageAsSeen)
messageRouter.post('/send/:id',protectroute,sendMessage);
export default messageRouter;