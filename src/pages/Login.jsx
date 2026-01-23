import React from "react";

export default function Login() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Login</h2>
        <p className="section-subtitle">This is a UI page. You can connect backend later.</p>

        <div className="card" style={{ padding: 18, marginTop: 18, boxShadow: "none", maxWidth: 520 }}>
          <form style={{ display: "grid", gap: 12 }}>
            <input placeholder="Email" style={inputStyle} />
            <input placeholder="Password" type="password" style={inputStyle} />
            <button type="button" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px 12px",
  outline: "none",
  fontSize: 14,
};
