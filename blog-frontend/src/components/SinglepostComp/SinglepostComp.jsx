import React, { useContext, useEffect, useState } from 'react'
import './singlepostcomp.css'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'



const SinglepostComp = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [post, setPost] = useState({})
    const PF = "http://localhost:5000/images/"
    const {user}=useContext(Context)
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [categories,setCategories]=useState('')
    const [updateMode,setUpdatemode]=useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setCategories(res.data.categories)
            
        }
        getPost()
    }, [id])

    const handelDelete=async ()=>{
        try {
            await axios.delete('http://localhost:5000/api/posts/'+id,{data:{email:user.email}})
            window.location.replace('/')
        } catch (error) {
            
        }
    }

    const handelUpdate=async()=>{
        try {
            await axios.put('http://localhost:5000/api/posts/'+id,{email:user.email,title,desc,categories})
            setUpdatemode(false)
        } catch (error) {
            
        }
    }

    return (
        <div className='singlepostcomp'>
            <div className="singlepostcompWrapper">
                <img src={post.photo ? PF + post.photo : "https://cdn.mos.cms.futurecdn.net/f5b4Za98noyKQzJjLmHAnd.jpg"} alt="" className="singlepostcompImg" />
                {updateMode ?(<input type="text" value={title} className='singlepostcompTitleInput' autoFocus onChange={(e)=>setTitle(e.target.value)}/>):(
                <h1 className="singlepostcompTitle">{title}
                    {post.email === user?.email && (
                        <div className="singlepostcompEdit">
                            <i className="singlepostcompIcon fa-regular fa-pen-to-square" onClick={()=>setUpdatemode(true)}></i>
                            <i className="singlepostcompIcon fa-solid fa-trash-can" onClick={handelDelete}></i>
                        </div>
                    )}
                </h1>
                )}
                <div className="singlepostcompInfo">
                    <span className="singlepostcompAuthor">Author: <b>
                        <Link to={`/?user=${post.name}`} className='link'>
                            {post.name}
                        </Link>
                    </b></span>
                    <span className='singlepostcompDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode?(<input type="text" value={categories} className='singlepostcompTitleInput' autoFocus onChange={(e)=>setCategories(e.target.value)}/>):
                (<span className='singlepostcompInfo'>Category: {categories}</span>)}
                {updateMode ? (<textarea type="text" className="singlepostcompTitleInput singlepostcompDescInput" autoFocus value={desc} onChange={(e)=>setDesc(e.target.value)}/>):(
                <p className='singlepostcompDesc'>{desc}
                </p>)}
                {updateMode && 
                <button className='singlepostcompButton' onClick={handelUpdate}>Update</button>
                }
            </div>
        </div>
    )
}

export default SinglepostComp