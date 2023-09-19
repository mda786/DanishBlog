import React, { useContext, useState } from 'react'
import './write.css'
import { Context } from '../../context/Context'
import axios from 'axios'


const Write = () => {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [categories,setCategories]=useState("")
    const [file,setFile]=useState("")
    const {user}=useContext(Context)
    const handelPost=async (e)=>{
        e.preventDefault();
        const newPost={
            name:user.name,
            email:user.email,
            title,
            desc,
            categories    
        }
        if(file){
            const data=new FormData()
            const filename=Date.now()+file.name
            data.append("name",filename)
            data.append("file",file)
            newPost.photo=filename
            try {
                await axios.post('http://localhost:5000/api/upload',data)
            } catch (error) {
                
            }
        }
        try {
            const res=await axios.post('http://localhost:5000/api/posts',newPost)
            window.location.replace("/post/"+res.data._id)
        } catch (error) {
            
        }

    }

    return (
        <div className='write'>
            <img className='writeImg' src={file?URL.createObjectURL(file):"https://cdn.mos.cms.futurecdn.net/f5b4Za98noyKQzJjLmHAnd.jpg"} alt="" />
            <form className="writeForm" onSubmit={handelPost}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e)=>setFile(e.target.files[0])} required/>
                    <input type="text" placeholder='Title' className='writeInput1' autoFocus={true} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <div className="writeFormGroup">
                    <input className='writeInput writeCat' type='text' placeholder='write category...' onChange={(e)=>setCategories(e.target.value)} required></input>
                </div>
                <div className="writeFormGroup">
                    <textarea className='writeInput writeText' type='text' placeholder='Tell your Story...' onChange={(e)=>setDesc(e.target.value)} required></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default Write