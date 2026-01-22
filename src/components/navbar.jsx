import React from 'react'
import logo from '../assets/learnyticslogopng.png'
import '../styles/home.css'
function Navbar() {
  return (
    <>
        <nav className="navbar">
      <div className="navbar__left">
        <img
        src={logo}
          alt="Company Logo"
          className="navbar__logo"
        />
        <span className="navbar__company">Learnytics</span>
      </div>

      <ul className="navbar__links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/status">Status</a></li>
        <li><a href="/team">Team</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <div className="navbar__right">
        <a href="/login" className="navbar__login">Login</a>
      </div>
    </nav>
    </>
  )
}

export default Navbar
