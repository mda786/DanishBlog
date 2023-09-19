import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Context } from '../../context/Context'
import axios from 'axios'

const Settings = () => {
  const { user, dispatch } = useContext(Context)
  const [file, setFile] = useState("")
  const [name, setName] = useState(user.name) 
  const [email, setEmail] = useState(user.email)
  const [about, setAbout] = useState(user.about?user.about:"Write about yourself...")
  const [password, setPassword] = useState(user.password)
  const [facebook, setFacebook] = useState(user.facebook?user.facebook:'https://www.facebook.com/')
  const [github, setGithub] = useState(user.github?user.github:'https://github.com/')
  const [linkedin, setLinkedin] = useState(user.linkedin?user.linkedin:'https://linkedin.com/')
  const [instagram, setInstagram] = useState(user.instagram?user.instagram:'https://instagram.com/')
  const [youtube, setYoutube] = useState(user.youtube?user.youtube:'https://youtube.com/')
  const PF = "http://localhost:5000/images/"

  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  }
  const checkStrongPassword = (password) => {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return strongPasswordPattern.test(password);
  };

  const valName = (name) => {
    if (name.length < 3) {
      return false;
    }
    return true;
  }



  const handelUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userId: user._id,
      name, email, password,facebook,github,linkedin,instagram,youtube,about
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      updatedUser.profilepic = filename
      try {
        await axios.post('http://localhost:5000/api/upload', data)
      } catch (error) {

      }
    }

    try {
      if (validateEmail(email) && checkStrongPassword(password) && valName(name)) {
        const res = await axios.put('http://localhost:5000/api/users/' + user._id, updatedUser)
        if (res) {
          alert("Successfully Updated...")
          dispatch({ type: "LOGOUT" })
          window.location.replace('/login')
        }
      } else if (!checkStrongPassword(password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one digit.")
      } else if (!valName(name)) {
        alert("name shoud be contain at least 3 character...")
      }
      else {
        alert("plz enter valid email address...")
      }

    } catch (error) {

    }

  }

  const handelDelete=async()=>{
    try {
      const res=await axios.delete(`http://localhost:5000/api/users/${user._id}`,{data:{userId:user._id}})
      if (res.status===200) {
        alert("Successfully Deleted...")
        dispatch({ type: "LOGOUT" })
        window.location.replace('/register')
      }else {
        alert("Error: Unable to delete the user.");
      }
  
    } catch (error) {
      alert("Error: " + error.res?.data || "Something went wrong.");
    }
  }

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div className="settingsUpdateTitle">Update Your Account</div>
          <div className="settingsDeleteTitle" onClick={handelDelete}>Delete Account</div>
        </div>
        <form className='settingsForm' onSubmit={handelUpdate}>
          <label >Profile Picture</label>
          <div className="settingsPP">
            {file ?
              <img src={URL.createObjectURL(file)} alt="" />
              :
              <img src={user.profilepic ? PF + user.profilepic : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
            }
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input type="file" style={{ display: 'none' }} id='fileInput' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <label>Username</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Facebook <span style={{color:"gray"}}>(Optional)</span> </label>
          <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
          <label>Youtube<span style={{color:"gray"}}>(Optional)</span></label>
          <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)}  />
          <label>Linkedin<span style={{color:"gray"}}>(Optional)</span></label>
          <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}  />
          <label>Instagram<span style={{color:"gray"}}>(Optional)</span></label>
          <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)}  />
          <label>Github<span style={{color:"gray"}}>(Optional)</span></label>
          <input type="text" value={github} onChange={(e) => setGithub(e.target.value)}  />
          <label>About<span style={{color:"gray"}}>(Optional)</span></label>
          <input type="text" value={about} onChange={(e) => setAbout(e.target.value)}  />
          <label>Password</label>
          <input type="password" placeholder='enter you password here...' onChange={(e) => setPassword(e.target.value)} required />
          <button className="settingsSubmit" type='submit'>Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default Settings