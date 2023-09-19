import React, { useContext } from 'react'
import Topbar from './components/Topbar/Topbar'
import Home from './pages/Home/Home'
import Singlepost from './pages/Singlepost/Singlepost'
import Write from './pages/Write/Write'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { Context } from './context/Context'

const App = () => {
  const {user}=useContext(Context)
  return (
    <>
    <Router>
        <Topbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={user?<Navigate to='/'/>:<Register/>}/>
        <Route path='/login' element={user?<Navigate to='/'/>:<Login/>}/>
        <Route path='/write' element={user && <Write/>}/>
        <Route path='/settings/:id' element={user && <Settings/>}/>
        <Route path='/post/:postId' element={<Singlepost/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App