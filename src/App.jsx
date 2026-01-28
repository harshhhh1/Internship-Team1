import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import StatCard from "./Components/StatCard";
import RevenueReport from "./pages/RevenueReport";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Main Dashboard Stats */}
          <Route
            index
            element={
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <StatCard title="Appointments" value="124" />
                <StatCard title="Clients" value="56" />
                <StatCard title="Revenue" value="₹48,000" />
              </div>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="RevenueReport" element={<RevenueReport />} />
        </Route>
      </Routes>
    </Router>
  );
}









