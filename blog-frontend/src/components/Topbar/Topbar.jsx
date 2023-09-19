import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const handelLogout = () => {
    dispatch({ type: "LOGOUT" })
  }





  return (
    <div className='top'>
      <div className="topLeft">
        {user ?
          (<>
            <Link to={user.facebook} target='blank' className='link'>
              <i className="topIcon fa-brands fa-square-facebook"></i>
            </Link>
            <Link to={user.linkedin} target='blank' className='link'>
            <i className="topIcon fa-brands fa-linkedin"></i>
            </Link>
            <Link to={user.youtube} target='blank' className='link'>
              <i className="topIcon fa-brands fa-square-youtube"></i>
            </Link>
            <Link to={user.instagram} target='blank' className='link'>
              <i className="topIcon fa-brands fa-square-instagram"></i>
            </Link>
            <Link to={user.github} target='blank' className='link'>
              <i className="topIcon fa-brands fa-square-github"></i>
            </Link>
          </>)
          : (
            <>
              <Link to='https://www.facebook.com/' target='blank' className='link'>
                <i className="topIcon fa-brands fa-square-facebook"></i>
              </Link>
              <Link to={'https://linnkedin.com/'} target='blank' className='link'>
              <i className="topIcon fa-brands fa-linkedin"></i>
              </Link>
              <Link to='https://youtube.com/' target='blank' className='link'>
                <i className="topIcon fa-brands fa-square-youtube"></i>
              </Link>
              <Link to='https://instagram.com/' target='blank' className='link'>
                <i className="topIcon fa-brands fa-square-instagram"></i>
              </Link>
              <Link to='https://github.com/' target='blank' className='link'>
                <i className="topIcon fa-brands fa-square-github"></i>
              </Link>
            </>
          )}

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className='link'>HOME</Link>
          </li>
          <li className="topListItem">
            <Link to='/write' className='link'>{user && "WRITE"}</Link>
          </li>
          <li className="topListItem" onClick={handelLogout}>
            <Link to='/login' className='link'>{user && "LOGOUT"}</Link></li>
        </ul>
      </div>
      <div className="topRight">

        {user ? (<><Link to={`/settings/${user._id}`} className="link"><img src={user.profilepic ? PF + user.profilepic : "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="profile pic" className="topImg" /></Link>
          <span className='topRightName'><b>{user.name}</b></span></>) :
          <>
            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className='link'>LOGIN</Link>
              </li>
              <li className="topListItem">
                <Link to='/register' className='link'>REGISTER</Link>
              </li>
            </ul>
          </>
        }
      </div>
    </div>
  )
}

export default Topbar