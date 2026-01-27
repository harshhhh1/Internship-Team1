import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-white shadow-md' : 'bg-gray-900'}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <h1
          className={`text-2xl font-bold cursor-pointer transition-colors
            ${scrolled ? 'text-blue-700' : 'text-white'}
          `}
          onClick={() => navigate('/')}
        >
          Suntouch IT
        </h1>

        {/* Nav */}
        <nav className="flex gap-6 items-center">
          <Link
            to="/"
            className={`font-medium transition
              ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-gray-200 hover:text-white'}
            `}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`font-medium transition
              ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-gray-200 hover:text-white'}
            `}
          >
            About Us
          </Link>
          <button  className={`font-medium transition
              ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-gray-200 hover:text-white'}
            `}>Services</button>
             <button  className={`font-medium transition
              ${scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-gray-200 hover:text-white'}
            `}>Projects</button>

          <button
            className={`px-4 py-2 rounded transition
              ${scrolled
                ? 'bg-blue-700 text-white hover:bg-blue-800'
                : 'bg-white text-gray-900 hover:bg-gray-200'}
            `}
            onClick={() => navigate('/admin/dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
