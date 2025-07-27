import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { formatmessagetime } from '../lib/utils.js';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const ChatContainer = ({ onProfileClick }) => {
  const {
    selecteduser,
    setselecteduser,
    messages,
    sendMessage,
    getMessages,
  } = useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const messageListRef = useRef();
  const [input, setinput] = useState('');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setinput('');
    await sendMessage({ text: trimmed });
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Select an Image File');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmImageSend = async () => {
    if (previewImage) {
      setPreviewImage(null);
      await sendMessage({ image: previewImage });
    }
  };

  useEffect(() => {
    if (selecteduser) {
      getMessages(selecteduser._id, 1);
      setPage(1);
    }
  }, [selecteduser]);

  useEffect(() => {
    if (scrollEnd.current && messages && page === 1) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const container = messageListRef.current;
    const handleScroll = async () => {
      if (!container || loadingMore || !selecteduser) return;
      if (container.scrollTop <= 5) {
        setLoadingMore(true);
        const oldScrollHeight = container.scrollHeight;
        const moreMessages = await getMessages(selecteduser._id, page + 1);
        if (moreMessages?.length > 0) {
          setPage((prev) => prev + 1);
          setTimeout(() => {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - oldScrollHeight;
            setLoadingMore(false);
          }, 100);
        } else {
          setLoadingMore(false);
        }
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [page, loadingMore, selecteduser]);

  if (!selecteduser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
        <img src={assets.logo_icon} className="max-w-16" alt="logo" />
        <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col bg-gradient-to-br from-[#071d33] to-[#1a0033]">
      <div className="h-[60px] px-4 py-3 flex items-center justify-between border-b border-stone-500 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img
            onClick={() => setselecteduser(null)}
            src={assets.arrow_icon}
            className="md:hidden w-5 cursor-pointer"
            alt="back"
          />
          <img
            src={selecteduser.profilePic || assets.avatar_icon}
            className="w-8 rounded-full"
            alt="profile"
          />
          <p className="text-lg text-white flex items-center gap-2">
            {selecteduser.fullName}
            {onlineUsers.includes(selecteduser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500" />
            )}
          </p>
        </div>
        <img
          onClick={onProfileClick}
          src={assets.help_icon}
          className="w-5 cursor-pointer"
          alt="open profile"
        />
      </div>
      <div
        ref={messageListRef}
        className="flex-1 overflow-y-auto px-3 pt-[70px] pb-[70px] space-y-2 max-h-[calc(100vh-120px)]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== authUser._id && 'flex-row-reverse'
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                className="w-[100px] max-h-[100px] object-cover rounded-lg mb-8"
                alt="chat-img"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-words bg-violet-500/30 text-white ${
                  msg.senderId === authUser._id
                    ? 'rounded-br-none'
                    : 'rounded-bl-none'
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selecteduser?.profilePic || assets.avatar_icon
                }
                className="w-7 rounded-full"
                alt="sender"
              />
              <p className="text-gray-500">{formatmessagetime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {previewImage && (
        <div className="p-2 bg-black/80 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={previewImage}
              alt="preview"
              className="h-20 rounded-md border border-gray-400"
            />
            <p>Image Preview</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewImage(null)}
              className="px-3 py-1 bg-red-500 rounded text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmImageSend}
              className="px-3 py-1 bg-green-500 rounded text-sm cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <div className="h-[60px] px-3 py-2 flex items-center gap-3 bg-black/80 backdrop-blur-md sticky bottom-0 z-20">
        <div className="flex-1 flex items-center bg-black px-3 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
            placeholder="Send a Message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-black"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png,image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              className="w-5 mr-2 cursor-pointer"
              alt="gallery"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          className="w-7 cursor-pointer"
          alt="send"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
