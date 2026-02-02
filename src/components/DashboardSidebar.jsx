import React from 'react';
import { NavLink } from 'react-router-dom';

function DashboardSidebar() {

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 my-1 rounded-lg font-medium transition-all duration-300 ${isActive
      ? 'bg-primary text-white shadow-md'
      : 'text-gray-700 hover:bg-white hover:shadow-sm'
    }`;

  return (
    <>
      {/* Sidebar Container - Hidden on Mobile, Visible on Desktop */}
      <div
        className="hidden md:flex w-64 min-h-screen bg-bg-light border-r border-gray-200 p-5 flex-col fixed left-0 top-0 z-30"
      >
        <div className="flex justify-between items-center mb-6 pl-2">
          <h3 className="text-xl font-bold text-gray-800">Admin Panel</h3>
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          <NavLink to="/dashboard" end className={linkClasses}><img src='/dashboard.svg' alt="Dashboard" className="w-5 h-5 mr-3" />Dashboard</NavLink>
          <NavLink to="/dashboard/profile" className={linkClasses}><img src='/account_circle.svg' alt="Profile" className="w-5 h-5 mr-3" />Profile</NavLink>
          <NavLink to="/dashboard/appointments" className={linkClasses}><img src='/appointment.svg' alt="Appointments" className="w-5 h-5 mr-3" />Appointments</NavLink>
          <NavLink to="/dashboard/services" className={linkClasses}><img src='/services.svg' alt="Services" className="w-5 h-5 mr-3" />Services</NavLink>
          <NavLink to="/dashboard/staff" className={linkClasses}><img src='/staff.svg' alt="Staff" className="w-5 h-5 mr-3" />Staff</NavLink>
          <NavLink to="/dashboard/receptionist" className={linkClasses}><img src='/receptionist.svg' alt="Receptionist" className="w-5 h-5 mr-3" />Receptionist</NavLink>
          <NavLink to="/dashboard/revenue-and-report" className={linkClasses}><img src='/rar.svg' alt="Reports" className="w-5 h-5 mr-3" />Revenue & Report</NavLink>
          <NavLink to="/dashboard/reviews" className={linkClasses}><img src='/reviews.svg' alt="Reviews" className="w-5 h-5 mr-3" />Reviews</NavLink>
        </nav>
        <NavLink to="/dashboard/settings" className={linkClasses}><img src='/settings.svg' alt="Settings" className="w-5 h-5 mr-3" />Settings</NavLink>
      </div>
    </>
  );
}

export default DashboardSidebar;