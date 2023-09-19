import React, {useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'



const Home = () => {
  const [posts,setPosts]=useState([])
  const {search}=useLocation()
  
  useEffect(()=>{
    const fetchPosts=async()=>{
      try {
        const res=await axios.get("http://localhost:5000/api/posts"+search)
        setPosts(res.data)        
      } catch (error) {
        console.error(error);
      }  
    }
    fetchPosts()
  },[search]) 
  return (
    <>
    <Header/>
    <div className='home'>
      <Posts posts={posts}/>    
      <Sidebar/>      
    </div>
    </>
  )
}

export default Home