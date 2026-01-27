import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "80px 100px", minHeight: "90vh", background: "#fff", color: "#e53935" }}>
      <div>
        <h1 style={{ fontSize: 48, fontWeight: "bold", marginBottom: 20 }}>Welcome to CoffeeShop</h1>
        <p style={{ fontSize: 20, marginBottom: 40 }}>Manage your every evening with CoffeeShop.</p>
        <Link to="/dashboard" style={{ padding: "14px 30px", background: "#e53935", color: "#fff", borderRadius: 30, fontWeight: "bold", textDecoration: "none" }}>Go to Dashboard</Link>
      </div>
      <img src="/salon-hero.png" alt="Salon" style={{ width: 400, borderRadius: 20 }} />
    </div>
  );
}



