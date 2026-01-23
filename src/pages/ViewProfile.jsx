import React from "react";

export default function ViewProfile() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">View Profile</h2>
        <p className="section-subtitle">Profile details page (UI only).</p>

        <div className="card" style={{ padding: 18, marginTop: 18, boxShadow: "none", maxWidth: 650 }}>
          <div style={{ display: "grid", gap: 8, color: "var(--muted)" }}>
            <div><b style={{ color: "var(--text)" }}>Name:</b> SunTouch User</div>
            <div><b style={{ color: "var(--text)" }}>Role:</b> Client</div>
            <div><b style={{ color: "var(--text)" }}>Email:</b> user@suntouch.in</div>
          </div>
        </div>
      </div>
    </section>
  );
}
