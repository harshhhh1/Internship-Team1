import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close dropdown on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className={`nav-header ${scrolled ? "nav-header-scrolled" : ""}`}>
      <div className="container nav-inner">
        {/* Brand */}
        <div className="brand" onClick={() => navigate("/")}>
          <div className="brand-mark">S</div>
          <div className="brand-text">
            <div className="brand-name">SunTouch</div>
            <div className="brand-tag">IT Solutions</div>
          </div>
        </div>

        {/* Links */}
        <nav className="nav-links">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn"
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              Profile ▾
            </button>

            {profileOpen && (
              <div className="dropdown-menu" role="menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/my-activity");
                  }}
                  role="menuitem"
                >
                  My Activity
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/history");
                  }}
                  role="menuitem"
                >
                  History
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/view-profile");
                  }}
                  role="menuitem"
                >
                  View Profile
                </button>
              </div>
            )}
          </div>

          <button className="btn" onClick={() => navigate("/logout")}>
            Logout
          </button>
        </div>
      </div>

      {/* Navbar CSS inside component (simple, no extra file needed) */}
      <style>{`
        .nav-header{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: background 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          background: rgba(255,255,255,0); /* transparent at top */
          border-bottom: 1px solid rgba(226,232,240,0);
        }

        .nav-header-scrolled{
          background: rgba(255,255,255,0.98); /* solid white on scroll */
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
          border-bottom: 1px solid rgba(226,232,240,1);
          backdrop-filter: blur(10px);
        }

        .nav-inner{
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .brand{
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .brand-mark{
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight: 800;
          color: #fff;
          background: var(--primary);
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
        }

        .brand-name{
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .brand-tag{
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
        }

        .nav-links{
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nav-link{
          padding: 10px 12px;
          border-radius: 999px;
          font-weight: 600;
          color: var(--text);
          border: 1px solid transparent;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .nav-link:hover{
          background: var(--soft);
          border-color: var(--border);
        }

        .nav-link-active{
          background: rgba(37, 99, 235, 0.10);
          border-color: rgba(37, 99, 235, 0.25);
          color: var(--primary-dark);
        }

        .nav-actions{
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dropdown{
          position: relative;
        }

        .dropdown-menu{
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          min-width: 200px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding: 8px;
        }

        .dropdown-item{
          width: 100%;
          text-align: left;
          background: transparent;
          border: 1px solid transparent;
          padding: 10px 10px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          color: var(--text);
        }

        .dropdown-item:hover{
          background: var(--soft);
          border-color: var(--border);
        }

        /* Responsive */
        @media (max-width: 900px){
          .nav-links{ display: none; }
        }
      `}</style>
    </header>
  );
}
