import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block py-3 px-6 rounded hover:bg-indigo-100 transition font-medium ${isActive ? 'bg-indigo-200 text-indigo-700' : 'text-gray-700'}`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 text-indigo-700">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/profile" className={linkClasses}>
          Profile
        </NavLink>
        <NavLink to="/admin/dashboard" className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/appointments" className={linkClasses}>
          Appointments
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
