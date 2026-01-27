import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo}>
        <img src="/salon-logo.png" alt="Salon Logo" style={{ width: 50, marginRight: 10 }} />
        <span style={{ color: "#e53935", fontWeight: "bold", fontSize: 22 }}>CoffeeShop</span>
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        <Link style={styles.navLink} to="/">Home</Link>
        <Link style={styles.navLink} to="/dashboard">Dashboard</Link>
        <Link style={styles.navLink} to="/login">Login</Link>

        {/* Profile Dropdown */}
        <div style={styles.profileContainer} onMouseLeave={() => setDropdownOpen(false)}>
          <div style={styles.avatar} onClick={() => setDropdownOpen(!dropdownOpen)}>G</div>
          {dropdownOpen && (
            <div style={styles.dropdown}>
              <Link style={styles.dropLink} to="/dashboard/profile">Profile</Link>
              <Link style={styles.dropLink} to="/dashboard/appointments">Appointments</Link>
              <Link style={styles.dropLink} to="/">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#fff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: { display: "flex", alignItems: "center" },
  nav: { display: "flex", alignItems: "center", gap: 20 },
  navLink: { color: "#e53935", textDecoration: "none", fontWeight: 500, padding: "6px 12px", borderRadius: 6, transition: "0.2s" },
  profileContainer: { position: "relative" },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#e53935",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    background: "#fff",
    color: "#000",
    borderRadius: 10,
    padding: 12,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    minWidth: 150,
  },
  dropLink: { padding: "8px 12px", textDecoration: "none", color: "#e53935", fontWeight: 500, borderRadius: 6, marginBottom: 4, transition: "0.2s" },
};







