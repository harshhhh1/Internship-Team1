import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--soft)" }}>
      <div className="container" style={{ padding: "34px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em" }}>
              SunTouch Technology
            </div>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 420 }}>
              We build modern websites, web apps, and IT solutions for businesses.
              Clean UI, fast performance, and scalable architecture.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Company</div>
            <div style={{ display: "grid", gap: 8, color: "var(--muted)" }}>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/projects">Projects</NavLink>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Contact</div>
            <div style={{ display: "grid", gap: 8, color: "var(--muted)" }}>
              <div>Email: contact@suntouch.in</div>
              <div>Phone: +91 90000 00000</div>
              <div>Location: India</div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          <div>© {new Date().getFullYear()} SunTouch Technology. All rights reserved.</div>
          <div style={{ display: "flex", gap: 14 }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
