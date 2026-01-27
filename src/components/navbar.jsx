import React, { useState } from 'react';
import logo from '../assets/learnyticslogopng.png';
import '../styles/home.css';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <img src={logo} alt="Company Logo" className="navbar__logo" />
          <span className="navbar__company">Learnytics</span>
        </div>

        <ul className="navbar__links">
          <Link to="/"><li>Home</li></Link>
          <Link to="/status"><li>Status</li></Link>
          <Link to="/team"><li>Team</li></Link>
          <Link to="/about"><li>About</li></Link>
          <Link to="/contact"><li>Contact</li></Link>
        </ul>

        <div className="navbar__right">
          <ul className="navbar__links navbar__right">
            <Link to="/login"><li className="navbar__login">Login</li></Link>
            <Link to="/signup"><li className="navbar__login">Sign Up</li></Link>
            <Link to="/dashboard"><li className="navbar__login">Dashboard</li></Link>
            <div className="navbar__profile">
              <img
                src='https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp'
                alt="Profile"
                className="navbar__profile-icon"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <ul className="navbar__dropdown">
                  <Link to="/profile/activity"><li>My Activity</li></Link>
                  <Link to="/profile/history"><li>History</li></Link>
                  <Link to="/profile"><li>View Profile</li></Link>
                </ul>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
