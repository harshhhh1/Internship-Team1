import React from "react";

export default function Services() {
  const services = [
    { t: "Company Website", d: "Professional responsive website for your business." },
    { t: "Web App Development", d: "React dashboards, portals, admin panels." },
    { t: "API & Backend", d: "Node.js REST APIs, authentication, database." },
    { t: "Maintenance", d: "Bug fixes, updates, and feature improvements." },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">
          Practical services to help your business grow using modern web technology.
        </p>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {services.map((s) => (
            <div key={s.t} className="card" style={{ padding: 18, boxShadow: "none" }}>
              <div style={{ fontWeight: 900 }}>{s.t}</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
