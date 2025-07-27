import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { ChatContext } from '../context/ChatContext.jsx';

const Rightsidebar = ({ onClose }) => {
  const { selecteduser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setmsgImages] = useState([]);

  useEffect(() => {
    setmsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  if (!selecteduser) return null;

  return (
    <div className="flex flex-col justify-between h-full px-5 pt-16 text-xs font-light relative bg-[#00000040] backdrop-blur-md">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-xl z-10"
      >
        ×
      </button>

      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={selecteduser?.profilePic || assets.avatar_icon}
          className="w-20 h-20 rounded-full object-cover"
          alt="Profile"
        />
        <div className="flex items-center gap-2 text-xl font-medium">
          <p className="text-base text-white">{selecteduser.fullName}</p>
          {onlineUsers.includes(selecteduser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </div>
        <p className="text-sm text-white">{selecteduser.bio}</p>
      </div>

     
      <div className="mt-6">
        <hr className="border-[#ffffff50] my-4" />
        <p className="font-medium mb-2">Media</p>
        <div className="max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-2 opacity-80 pr-1">
          {msgImages.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded overflow-hidden"
            >
              <img
                src={url}
                className="w-full h-full object-cover rounded-md"
                alt={`media-${index}`}
              />
            </div>
          ))}
        </div>
      </div>

    
      <div className="py-6 flex justify-center">
        <button
          onClick={() => logout()}
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Rightsidebar;

