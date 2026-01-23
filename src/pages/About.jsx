import React from "react";

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">About SunTouch</h2>
        <p className="section-subtitle">
          SunTouch is a modern IT services team focused on building clean, scalable software.
          We deliver professional websites, web apps, and business solutions.
        </p>

        <div className="card" style={{ padding: 18, marginTop: 18, boxShadow: "none" }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Our Principles</div>
          <ul style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>
            <li>Quality-first development</li>
            <li>Modern UI, responsive layouts</li>
            <li>Security and performance</li>
            <li>Clear communication and support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
