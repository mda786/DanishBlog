import React from 'react'
import './singlepost.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import SinglepostComp from '../../components/SinglepostComp/SinglepostComp'

const Singlepost = () => {
  return (
    <div className='singlepost'>
        <SinglepostComp/>
        <Sidebar/>     
    </div>
  )
}

export default Singlepost