import { Link } from "react-router-dom";
import { useState } from "react";
import '../styles/navbastyle.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">MyApp</h2>

      <ul className="nav-links">
        <li><Link to="/login">Login</Link></li>

        <li><Link to="/dashboard">Dashboard</Link></li>

        <li
          className="dropdown"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span>Profile ▾</span>

          {open && (
            <ul className="dropdown-menu">
              <li><Link to="/activity">My Activity</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/view-profile">View Profile</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>

  );
};

export default Navbar;

