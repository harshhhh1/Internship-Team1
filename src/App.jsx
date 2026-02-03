import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import DashboardProfile from "./pages/admin/Profile.jsx";
// ... other dashboard pages

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<DashboardProfile />} />
          {/* ... other dashboard routes */}
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;

