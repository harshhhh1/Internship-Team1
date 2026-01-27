import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Appointments", path: "/dashboard/appointments" },
  ];

  return (
    <aside style={styles.sidebar}>
      <h3 style={{ marginBottom: 25, color: "#e53935" }}>Admin Panel</h3>
      {menuItems.map(item => (
        <Link
          key={item.name}
          to={item.path}
          style={{
            ...styles.link,
            background: location.pathname === item.path ? "#e53935" : "transparent",
            color: location.pathname === item.path ? "#fff" : "#e53935",
          }}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 220,
    background: "#fff",
    color: "#e53935",
    minHeight: "100vh",
    padding: 25,
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  link: { display: "block", padding: "12px 18px", marginBottom: 15, borderRadius: 8, textDecoration: "none", fontWeight: 500, transition: "0.2s", cursor: "pointer" },
};






