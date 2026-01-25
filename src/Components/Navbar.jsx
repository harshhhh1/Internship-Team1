import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* LEFT MERGED LOGO */}
      <div className="nav-left">
        <FaWallet className="wallet-icon" />
        <span className="logo-text">ExpenseGateway</span>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>

        <div className="profile-wrap" onClick={() => setOpen(!open)}>
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="profile"
            className="profile-img"
          />

          {open && (
            <div className="dropdown">
              <Link to="/activity">My Activity</Link>
              <Link to="/history">History</Link>
              <Link to="/profile">View Profile</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}





