import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: 34,
              background:
                "linear-gradient(180deg, rgba(37,99,235,0.10), rgba(37,99,235,0.02))",
              borderRadius: "24px",
            }}
          >
            <div style={{ maxWidth: 680 }}>
              <h1 style={{ fontSize: 42, letterSpacing: "-0.03em", margin: 0 }}>
                Build smarter with SunTouch IT Solutions
              </h1>
              <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 12 }}>
                We design and develop modern, scalable websites and web applications for startups
                and businesses—clean UI, fast performance, and reliable delivery.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
                <button className="btn btn-primary" onClick={() => navigate("/contact")}>
                  Get a Free Quote
                </button>
                <button className="btn" onClick={() => navigate("/projects")}>
                  View Projects
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12,
                  marginTop: 22,
                }}
              >
                <div className="card" style={{ padding: 16, boxShadow: "none" }}>
                  <div style={{ fontWeight: 800 }}>Fast Delivery</div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>Quick turnaround & clean code</div>
                </div>
                <div className="card" style={{ padding: 16, boxShadow: "none" }}>
                  <div style={{ fontWeight: 800 }}>Modern UI</div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>Professional white-theme design</div>
                </div>
                <div className="card" style={{ padding: 16, boxShadow: "none" }}>
                  <div style={{ fontWeight: 800 }}>Support</div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>After-launch maintenance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What we do</h2>
          <p className="section-subtitle">
            End-to-end development services for businesses. We focus on quality, security, and scalability.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {[
              { t: "Web Development", d: "React, Node.js, APIs, dashboards" },
              { t: "UI/UX Design", d: "Clean layouts and user-focused design" },
              { t: "Deployment", d: "Hosting, domain setup, performance" },
            ].map((x) => (
              <div key={x.t} className="card" style={{ padding: 18, boxShadow: "none" }}>
                <div style={{ fontWeight: 900 }}>{x.t}</div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
