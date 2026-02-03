import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function DashboardSidebar() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 my-1 rounded-lg font-medium transition-all duration-300 ${isActive
      ? 'bg-primary text-white shadow-md'
      : 'text-gray-700 hover:bg-white hover:shadow-sm'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="hidden md:flex w-64 min-h-screen bg-bg-light border-r border-gray-200 p-5 flex-col fixed left-0 top-0 z-30">
        <div className="flex justify-between items-center mb-6 pl-2">
          <h3 className="text-xl font-bold text-gray-800">Loading...</h3>
        </div>
      </div>
    );
  }

  // Show default sidebar if no user (will be redirected by ProtectedRoute anyway)
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Sidebar Container - Hidden on Mobile, Visible on Desktop */}
      <div
        className="hidden md:flex w-64 min-h-screen bg-bg-light border-r border-gray-200 p-5 flex-col fixed left-0 top-0 z-30"
      >
        <div className="flex justify-between items-center mb-6 pl-2">
          <h3 className="text-xl font-bold text-gray-800">
            {user?.role === 'admin' ? 'Admin Panel' : 
             user?.role === 'staff' ? 'Staff Panel' : 
             'Receptionist Panel'}
          </h3>
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {/* All roles can see Dashboard */}
          <NavLink to="/dashboard" end className={linkClasses}>
            <span className="w-5 h-5 mr-3">📊</span>
            Dashboard
          </NavLink>
          
          {/* All roles can see Profile */}
          <NavLink to="/dashboard/profile" className={linkClasses}>
            <span className="w-5 h-5 mr-3">👤</span>
            Profile
          </NavLink>
          
          {/* All roles can see Appointments */}
          <NavLink to="/dashboard/appointments" className={linkClasses}>
            <span className="w-5 h-5 mr-3">📅</span>
            Appointments
          </NavLink>
          
          {/* All roles can see Services */}
          <NavLink to="/dashboard/services" className={linkClasses}>
            <span className="w-5 h-5 mr-3">✂️</span>
            Services
          </NavLink>
          
          {/* Admin & Staff only - Staff */}
          {(user?.role === 'admin' || user?.role === 'staff') && (
            <NavLink to="/dashboard/staff" className={linkClasses}>
              <span className="w-5 h-5 mr-3">👨‍💼</span>
              Staff
            </NavLink>
          )}
          
          {/* Admin & Receptionist only - Receptionist */}
          {(user?.role === 'admin' || user?.role === 'receptionist') && (
            <NavLink to="/dashboard/receptionist" className={linkClasses}>
              <span className="w-5 h-5 mr-3">💁</span>
              Receptionist
            </NavLink>
          )}
          
          {/* Admin only - Revenue & Report */}
          {user?.role === 'admin' && (
            <NavLink to="/dashboard/revenue-and-report" className={linkClasses}>
              <span className="w-5 h-5 mr-3">📈</span>
              Revenue & Report
            </NavLink>
          )}
          
          {/* All roles can see Reviews */}
          <NavLink to="/dashboard/reviews" className={linkClasses}>
            <span className="w-5 h-5 mr-3">⭐</span>
            Reviews
          </NavLink>
          
          {/* All roles can see Settings */}
          <NavLink to="/dashboard/settings" className={linkClasses}>
            <span className="w-5 h-5 mr-3">⚙️</span>
            Settings
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 my-1 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
        >
          <span className="w-5 h-5 mr-3">🚪</span>
          Logout
        </button>
      </div>
    </>
  );
}

export default DashboardSidebar;
