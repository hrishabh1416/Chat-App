import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const backendUrl = 'http://localhost:5000';
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
      checkAuth(); 
    }
  }, [token]);


  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth/check');
      if (data.success) {
  
        if (!authUser || authUser._id !== data.user._id) {
          setAuthUser(data.user);
          connectSocket(data.user);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common['token'] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    if (socket) {
        socket.disconnect();
        setSocket(null);
    }    
    toast.success("Logged Out Successfully");
  };


  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put('/api/auth/update', body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
const connectSocket = (userData) => {
    if (!userData || socket) return; 

    const newSocket = io(backendUrl, {
        query: { userId: userData._id }
    });

    newSocket.on("getonlineUsers", (userIds) => {
        setOnlineUsers(userIds);
    });

    setSocket(newSocket); 
};


  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
