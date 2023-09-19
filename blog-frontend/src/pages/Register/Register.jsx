import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
// import { Link } from 'react-router-dom'

const Register = () => {
//all useState are here
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

//email validation
  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  }

//strong password validation
  const checkStrongPassword = (password) => {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return strongPasswordPattern.test(password);
  };

//name validation
  const valName=(name)=>{
    if(name.length<3){
      return false;
    }
    return true;
  }

//hndleClick function
  const handelClick = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      if (validateEmail(email)&&checkStrongPassword(password)&&valName(name)) {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name, email, password
        })
        res.data && window.location.replace('/login')
      }else if(!checkStrongPassword(password)){
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one digit.")
      }else if(!valName(name)){
        alert("name shoud be contain at least 3 character...")        
      }
      else{
        alert("plz enter valid email address...")
      }

    } catch (error) {
      setError(true)
    }
  }


  return (
    <div className='register'>
      <span className="registerTitle">
        Register
      </span>
      <form className="registerForm" onSubmit={handelClick}>
        <label>Name</label>
        <input type="text" placeholder='Enter your name...' onChange={e => setName(e.target.value)} required/>
        <label>Email</label>
        <input type="email" placeholder='Enter your email...' onChange={e => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" placeholder='Enter your password...' onChange={e => setPassword(e.target.value)} required/>
        <button className="registerButton" type='submit'>Register</button>
        {error && <span style={{ color: "red", marginTop: "2px" }}>Something went wrong...</span>}
      </form>
      {/* <button className="registerLoginButton">
          <Link to='/login' className='link'>Login</Link>
        </button> */}
    </div>
  )
}

export default Register