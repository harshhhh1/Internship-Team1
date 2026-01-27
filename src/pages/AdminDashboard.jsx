import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminProfile from "./admin/AdminProfile";
import AdminDash from "./admin/AdminDash";
import AdminAppointments from "./admin/AdminAppointments";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    navigate(`/dashboard/${menuItem}`);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={() => handleMenuClick("dashboard")}
          >
            <span className="menu-icon">📊</span>
            <span className="menu-text">Dashboard</span>
          </button>
          <button
            className={`menu-item ${activeMenu === "profile" ? "active" : ""}`}
            onClick={() => handleMenuClick("profile")}
          >
            <span className="menu-icon">👤</span>
            <span className="menu-text">Profile</span>
          </button>
          <button
            className={`menu-item ${activeMenu === "appointments" ? "active" : ""}`}
            onClick={() => handleMenuClick("appointments")}
          >
            <span className="menu-icon">📅</span>
            <span className="menu-text">Appointments</span>
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="*" element={<AdminDash />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
