  import React, { useContext } from 'react'
  import Home from './components/pages/Homepage.jsx'
  import Loginpage from './components/pages/Loginpage.jsx'
  import Profilepage from './components/pages/Profilepage.jsx'
  import { Route,Routes,BrowserRouter,useLocation,Navigate } from 'react-router-dom'
  import { AuthContext, AuthProvider } from './context/AuthContext.jsx'
  import {Toaster} from 'react-hot-toast';
import { ChatProvider } from './context/ChatContext.jsx'
  const  Allcontent = () => {
    return (
      <div className="bg-[url('./src/assets/background1.jpg')] bg-contain">
        <Toaster/>
        {/* <Home/> */}
        {/* <Loginpage/> */}
        <Profilepage/>  
      </div>
    )
  }
const MainApp=()=>{
  const location=useLocation();
  const {authUser}=useContext(AuthContext);
  console.log("MainApp render - authUser:", authUser);
  return (
    <div  className="bg-[url('./src/assets/background1.jpg')] bg-contain"> 
      <Toaster/>
      <Routes>
      <Route path='/' element={ authUser ? <Home/> : <Navigate to='/login'/>}/>
      <Route path='/login' element={ !authUser ? <Loginpage/> : <Navigate to='/profile'/>} />
      <Route path='/profile' element={ authUser ? <Profilepage/> : <Navigate to='/login'/>} />
      </Routes>
    </div>
    );
}
  function App(){
    return (
    <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
    <MainApp/>
    </ChatProvider>
    </AuthProvider>
    </BrowserRouter>
    );
  }
  
  export default App;
  