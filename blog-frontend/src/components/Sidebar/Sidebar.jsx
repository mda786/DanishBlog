import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'
const Sidebar = () => {
    const [cat, setCats] = useState([])
    const { user } = useContext(Context)
    const PF = "http://localhost:5000/images/"
    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/posts")
            setCats(res.data)
        }
        getCats();
    }, [])

    const uniqueCategories = [...new Set(cat.map((c) => c.categories))].filter(category => category.trim() !== '');

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    ABOUT ME
                </span>
                {user ? (
                    <img src={user.profilepic ? PF + user.profilepic : "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="about" />
                ) : (
                    <img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" alt="about" />
                )}
                {user && user.about ? (
                    <p>{user.about}</p>
                ) : (
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab beatae atque magni. Ipsam neque omnis facere tempore dicta esse ratione.</p>
                )}
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    CATEGORIES
                </span>
                <ul className="sidebarList">
                    {uniqueCategories.map((c) => (
                        <Link to={`/?cat=${c}`} key={c} className='link'>
                            <li className="sidebarListItem" >{c}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    FOLLOW US
                </span>
                <div className="sidebarSocial">
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
                                <Link to={'https://linkedin.com/'} target='blank' className='link'>
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
            </div>
        </div>
    )
}

export default Sidebar