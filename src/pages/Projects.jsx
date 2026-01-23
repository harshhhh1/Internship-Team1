import React from "react";

export default function Projects() {
  const items = [
    { name: "Business Portfolio Site", tech: "React + Tailwind UI" },
    { name: "Admin Dashboard", tech: "React + REST API" },
    { name: "E-commerce Landing", tech: "Modern UI + SEO" },
    { name: "Company CRM Mini", tech: "Node API + Auth" },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          A few sample projects to show our quality and structure.
        </p>

        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {items.map((p) => (
            <div key={p.name} className="card" style={{ padding: 18, boxShadow: "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 900 }}>{p.name}</div>
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>{p.tech}</div>
              </div>
              <div style={{ color: "var(--muted)", marginTop: 8 }}>
                Clean UI, responsive layout, and scalable code structure.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
