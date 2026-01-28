import React from 'react';
import { NavLink } from 'react-router-dom';


function DashboardSidebar() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 my-1 rounded-lg font-medium transition-all duration-300 ${isActive
      ? 'bg-primary text-white shadow-md'
      : 'text-gray-700 hover:bg-white hover:shadow-sm'
    }`;

  return (
    <div className="w-64 min-h-screen bg-bg-light border-r border-gray-200 p-5 flex flex-col fixed left-0 top-0 z-10">
      <h3 className="mb-6 pl-2 text-xl font-bold text-gray-800">Admin Panel</h3>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClasses}><img src='/dashboard.svg' alt="Dashboard"/>Dashboard</NavLink>
        <NavLink to="/dashboard/profile" className={linkClasses}><img src='/account_circle.svg' alt="Profile"/>Profile</NavLink>
        <NavLink to="/dashboard/appointments" className={linkClasses}><img src='/appointment.svg' alt="Appointments"/>Appointments</NavLink>
        <NavLink to="/dashboard/staff" className={linkClasses}><img src='/staff.svg' alt="Staff"/>Staff</NavLink>
        <NavLink to="/dashboard/receptionist" className={linkClasses}><img src='/receptionist.svg' alt="Receptionist"/>Receptionist</NavLink>
        <NavLink to="/dashboard/revenue-and-report" className={linkClasses}><img src='/rar.svg' alt="Revenue & Report"/>Revenue & Report</NavLink>
      </nav>
    </div>
  );
}

export default DashboardSidebar
