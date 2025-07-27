import React, { useContext } from 'react'
import Home from './components/pages/Homepage.jsx'
import Loginpage from './components/pages/Loginpage.jsx'
import Profilepage from './components/pages/Profilepage.jsx'
import { Route, Routes, BrowserRouter, useLocation, Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/ChatContext.jsx'
import backgroundImage from './assets/background1.jpg' // ✅ import image

const MainApp = () => {
  const location = useLocation();
  const { authUser } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to='/profile' />} />
        <Route path='/profile' element={authUser ? <Profilepage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <MainApp />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
