import React, { useState } from 'react';
import logo from '../assets/learnyticslogopng.png';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Ensure you have react-icons installed

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 text-gray-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
            <div className="shrink-0 flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
              <img src={logo} alt="Company Logo" className="h-10 w-auto" />
              <span className="ml-3 text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">Luxe Salon</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors"><li>Home</li></Link>
            <Link to="/status" className="text-gray-600 hover:text-primary font-medium transition-colors"><li>Status</li></Link>
            <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition-colors"><li>About</li></Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors"><li>Contact</li></Link>
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ul className="flex items-center space-x-4">
              <Link to="/login"><li className="hidden sm:block text-gray-600 hover:text-primary font-medium transition-colors cursor-pointer">Login</li></Link>
              <Link to="/signup"><li className="hidden sm:block bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary transition-colors shadow-md hover:shadow-lg cursor-pointer font-medium">Sign Up</li></Link>
              <Link to="/dashboard"><li className="hidden lg:block text-gray-600 hover:text-primary font-medium transition-colors cursor-pointer">Dashboard</li></Link>

              {/* Profile Dropdown */}
              <div className="relative ml-4">
                <img
                  src='https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp'
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all object-cover"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 ring-1 ring-black ring-opacity-5 animate-fade-in-down z-50">
                    <Link to="/profile/activity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"><li>My Activity</li></Link>
                    <Link to="/profile/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"><li>History</li></Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"><li>View Profile</li></Link>
                    {/* Mobile Only Links in Dropdown */}
                    <Link to="/login" className="sm:hidden block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"><li>Login</li></Link>
                    <Link to="/signup" className="sm:hidden block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"><li>Sign Up</li></Link>
                  </ul>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <ul className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"><li>Home</li></Link>
            <Link to="/status" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"><li>Status</li></Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"><li>About</li></Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"><li>Contact</li></Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"><li>Dashboard</li></Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;