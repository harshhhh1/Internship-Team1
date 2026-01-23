import React from 'react'
import  Home from './pages/home.jsx'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Profile from './pages/profile.jsx'
import History from './pages/history.jsx'
import Status from './pages/status.jsx'
import Activity from './pages/activity.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import AboutPage from './pages/about.jsx'


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/status' element={<Status/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/history' element={<History/>}/>
        <Route path='/profile/activity' element={<Activity/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
