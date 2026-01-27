import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'block',
    padding: '10px 15px',
    margin: '5px 0',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#333',
    backgroundColor: isActive ? '#007bff' : 'transparent',
    borderRadius: '5px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  });

  return (
    <div style={{
      width: '250px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #e9ecef',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ marginBottom: '20px', paddingLeft: '10px', color: '#333' }}>Admin Panel</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <NavLink to="/dashboard" end style={getLinkStyle}>Dashboard</NavLink>
        <NavLink to="/dashboard/profile" style={getLinkStyle}>Profile</NavLink>
        <NavLink to="/dashboard/appointments" style={getLinkStyle}>Appointments</NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;