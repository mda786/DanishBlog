import React from 'react'
import './post.css'
import { Link } from 'react-router-dom';


const Post = ({post}) => {
  const PF="http://localhost:5000/images/"
  return (
    <div className='post'>
        <img src={post.photo?PF+post.photo:"https://cdn.mos.cms.futurecdn.net/f5b4Za98noyKQzJjLmHAnd.jpg"} alt="" className="postImg" />

        <div className="postInfo">
            <div className="postCats">            
              <span className="postCat" >{post.categories}</span>
            </div>
            <Link to={`/post/${post._id}`} className='link'>
            <span className="postTitle" >{post.title}</span>

            </Link>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">{post.desc}</p>
    </div>
  )
}

export default Post