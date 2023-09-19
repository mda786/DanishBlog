import React, { useContext, useRef } from 'react'
import './login.css'
import { Context } from '../../context/Context'
import axios from 'axios'
// import { Link } from 'react-router-dom'


const Login = () => {
  
  const emailRef=useRef()
  const passwordRef=useRef()
  const {dispatch,isFetching}=useContext(Context);

  const handelClick=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      const res=await axios.post("http://localhost:5000/api/auth/login",{
        email:emailRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  return (
    <div className='login'>
        <span className="loginTitle">
            Login
        </span>
        <form className="loginForm" onSubmit={handelClick}>
            <label>Email</label>
            <input type="email" placeholder='Enter your email...' ref={emailRef}/>
            <label>Password</label>
            <input type="password" placeholder='Enter your password...' ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        {/* <button className="loginRegiterButton">
          <Link to='/register' className='link'>Register</Link>
        </button> */}
    </div>
  )
}

export default Login