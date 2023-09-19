import React from 'react'
import './header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitle">
            <span className="headerTitleSm">Danish</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img className='headerImg' src="https://img.freepik.com/free-vector/potted-plant-doodle-vector-background_53876-126321.jpg?w=2000" alt="Header" />
    </div>
  )
}

export default Header