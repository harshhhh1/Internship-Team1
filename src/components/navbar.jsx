import React, { useState, useEffect } from 'react';
import logo from '../assets/learnyticslogopng.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSalon } from '../context/SalonContext';
import AddSalonModal from './modals/AddSalonModal';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBranchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const { salons, selectedSalon, setSelectedSalon, fetchSalons } = useSalon();
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isAddSalonModalOpen, setAddSalonModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleBranchDropdown = () => setBranchDropdownOpen(!isBranchDropdownOpen);

  const selectBranch = (salon) => {
    setSelectedSalon(salon);
    setBranchDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userId'));
    setRole(localStorage.getItem('role'));
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleAddSalon = async (salonData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/salons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(salonData),
      });

      if (response.ok) {
        await fetchSalons();
        setAddSalonModalOpen(false);
      } else {
        alert('Failed to add salon');
      }
    } catch {
      alert('Error adding salon');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <button className="md:hidden mr-2" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <img src={logo} className="h-10" alt="logo" />
                <span className="ml-3 text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
                  Luxe Salon
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              <Link to="/"><li className="nav-link">Home</li></Link>
              <Link to="/status"><li className="nav-link">Status</li></Link>
              <Link to="/about"><li className="nav-link">About</li></Link>
              <Link to="/plans-and-pricing"><li className="nav-link">Plans</li></Link>
              <Link to="/contact"><li className="nav-link">Contact</li></Link>
            </ul>

            {/* Right Side */}
            <div className="flex items-center space-x-4">

              {!isLoggedIn && (
                <>
                  <Link to="/login" className="hidden sm:block nav-link">
                    Login
                  </Link>
                  <Link to="/signup">
                    <span className="hidden sm:block bg-primary text-white px-5 py-2 rounded-full">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}

              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="hidden lg:block nav-link">
                    Dashboard
                  </Link>

                  {(salons.length > 0 || role === 'owner') && (
                    <div className="relative">
                      <button
                        onClick={toggleBranchDropdown}
                        className="bg-primary text-white px-3 py-2 rounded-lg text-sm"
                      >
                        🏢 {selectedSalon ? selectedSalon.name : 'Select Branch'}
                      </button>

                      {isBranchDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg">
                          {salons.map((salon) => (
                            <li
                              key={salon._id}
                              onClick={() => selectBranch(salon)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {salon.name}
                            </li>
                          ))}
                          {role === 'owner' && (
                            <li
                              onClick={() => setAddSalonModalOpen(true)}
                              className="px-4 py-2 text-primary font-semibold border-t cursor-pointer"
                            >
                              + Add Branch
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Profile */}
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      onClick={toggleDropdown}
                      alt="profile"
                    />
                    {isDropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg">
                        <Link to="/dashboard/profile"><li className="dropdown-item">Profile</li></Link>
                        <li onClick={handleLogout} className="dropdown-item text-red-600">
                          Logout
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}

              {/* ⭐ LAST BUTTON – Book Appointment */}
              <Link to="/book-appointment">
                <button className="bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary transition shadow-md">
                  Book Appointment
                </button>
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <ul className="px-4 py-3 space-y-2">
              <Link to="/" onClick={toggleMobileMenu}><li>Home</li></Link>
              <Link to="/status" onClick={toggleMobileMenu}><li>Status</li></Link>
              <Link to="/about" onClick={toggleMobileMenu}><li>About</li></Link>
              <Link to="/plans-and-pricing" onClick={toggleMobileMenu}><li>Plans</li></Link>
              <Link to="/contact" onClick={toggleMobileMenu}><li>Contact</li></Link>

              {!isLoggedIn && (
                <>
                  <Link to="/login" onClick={toggleMobileMenu}><li>Login</li></Link>
                  <Link to="/signup" onClick={toggleMobileMenu}><li>Sign Up</li></Link>
                </>
              )}

              {isLoggedIn && (
                <Link to="/dashboard" onClick={toggleMobileMenu}>
                  <li>Dashboard</li>
                </Link>
              )}

              {/* ⭐ LAST – Mobile Book Appointment */}
              <Link to="/book-appointment" onClick={toggleMobileMenu}>
                <li className="text-primary font-semibold">
                  Book Appointment
                </li>
              </Link>
            </ul>
          </div>
        )}
      </nav>

      <AddSalonModal
        isOpen={isAddSalonModalOpen}
        onClose={() => setAddSalonModalOpen(false)}
        onSubmit={handleAddSalon}
      />
    </>
  );
}

export default Navbar;
