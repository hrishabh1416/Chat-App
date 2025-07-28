import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {AuthContext} from './AuthContext'
const backendUrl = 'https://chat-app-backend-1az7.onrender.com';
axios.defaults.baseURL = backendUrl;

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => { 
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const [selecteduser,setselecteduser]=useState(null);
    const [unseenMessages,setUnseenMessages]=useState({});
    const {socket,axios}=useContext(AuthContext);
    const getUsers=async()=>{
        try{
            const {data}=await axios.post('/api/messages/users')
            if(data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        }
        catch(error) {
            toast.error(error.message);
        }
    }
    const getMessages=async(userId)=>{
        try{
            const {data}=await axios.post(`/api/messages/${userId}`)
            if(data.success) {
                setMessages(data.messages);
            }
        }
        catch(error) {
            toast.error(error.message);
        }
    }
    const sendMessage=async(messageData)=>{
        try{
            const {data}=await axios.post(`/api/messages/send/${selecteduser._id}`,messageData)
            if(data.success) {
                setMessages((prevMessages)=>[...prevMessages,data.newMessage]);
            }
            else {
                toast.error(data.message);
            }
        }
        catch(error) {
            toast.error(error.message);
        }
        console.log("Message received:", { senderId, receiverId, text, image });
    }
    const subscribetoMessages=async()=>{
        if(!socket) return ;
        socket.on("newMessage",(newMessage)=>{
            if(selecteduser && newMessage.senderId===selecteduser._id) {
            newMessage.seen=true;
            setMessages((prevMessages)=>[...prevMessages,newMessage]);
            axios.put(`/api/messages/mark/${newMessage._id}`)
            }
            else {
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId]:
                    prevUnseenMessages[newMessage.senderId]?prevUnseenMessages[newMessage.senderId]+1:1
                }))
            }
        })
    }
    const unsunubscribeFromMessages=()=>{
        if(socket) socket.off("newMessage")
    }
useEffect(()=>{
    subscribetoMessages()
    return ()=>unsunubscribeFromMessages();
},[socket,selecteduser])
    const value={
        messages,users,selecteduser,getUsers,sendMessage,setMessages,getMessages,setselecteduser,unseenMessages,setUnseenMessages
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
