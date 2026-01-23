import React from "react";

export default function Contact() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">
          Tell us about your project. We’ll reply with a timeline and estimate.
        </p>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 14,
          }}
        >
          <div className="card" style={{ padding: 18, boxShadow: "none" }}>
            <form style={{ display: "grid", gap: 12 }}>
              <Field label="Full Name" placeholder="Your name" />
              <Field label="Email" placeholder="you@example.com" />
              <Field label="Message" placeholder="Write your message..." textarea />
              <button type="button" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: 18, boxShadow: "none" }}>
            <div style={{ fontWeight: 900 }}>SunTouch Office</div>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              Email: contact@suntouch.in <br />
              Phone: +91 90000 00000 <br />
              Location: India
            </div>

            <div style={{ marginTop: 16, fontWeight: 900 }}>Working Hours</div>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              Mon - Sat: 10:00 AM - 7:00 PM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, textarea }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 800, fontSize: 14 }}>{label}</span>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={5}
          style={inputStyle}
        />
      ) : (
        <input
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </label>
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
