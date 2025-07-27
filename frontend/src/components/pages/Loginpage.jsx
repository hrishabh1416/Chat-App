import React, { useState } from 'react';
import assets from '../../assets/assets'
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
function Loginpage() {
  const [currState,setcurrState]=useState("Sign up");
  const[fullName,setfullname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[bio,setbio]=useState("");
  const[isdatasubmitted,setisdatasubmitted]=useState(false);
  const {login}=useContext(AuthContext)
  const onsubmithandler=(event)=>{
    event.preventDefault();
    if(currState==="Sign up" && !isdatasubmitted) {
      setisdatasubmitted(true);
      return;
    }
    login(currState==="Sign up"?'signup':'login',{fullName,email,password,bio})
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <img src={assets.logo_big} className='w-[min(30vw,250px)]'></img>
      <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' onSubmit={onsubmithandler}>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isdatasubmitted && <img src={assets.arrow_icon} className='w-5 cursor-pointer' onClick={()=>setisdatasubmitted(false)}></img>}
        </h2>
        {currState==="Sign up"  && !isdatasubmitted && (
        <input type='text' value={fullName} onChange={(e)=>setfullname(e.target.value)}className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full name' required></input>
        )}
        {!isdatasubmitted && (
          <>
           <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email' required></input>
           <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Password' required></input>
          </>
        )}
        {currState==="Sign up" && isdatasubmitted && (
          <textarea  rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none'  value={bio} onChange={(e)=>setbio(e.target.value)} placeholder='provide a short bio....' required></textarea>
        )}
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>{currState==="Sign Up" ? "Create Account" : "Login" }</button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox'></input>
          <p>Agree to the terms of use and Policy.</p>
        </div>
        <div className=' flex flex-col gap-2'>
          {currState==="Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setcurrState("Login");setisdatasubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>
              Login here
              </span></p>
          ):(
            <p className='text-sm text-gray-600'>Create an Account <span onClick={()=>{setcurrState("Sign up");setisdatasubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>
              Click here
              </span></p>
          )}

        </div>
        </form>
    </div>
  );
}

export default Loginpage;
