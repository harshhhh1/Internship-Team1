import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Logout from "./pages/Logout";

import MyActivity from "./pages/MyActivity";
import History from "./pages/History";
import ViewProfile from "./pages/ViewProfile";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Profile dropdown routes */}
          <Route path="/my-activity" element={<MyActivity />} />
          <Route path="/history" element={<History />} />
          <Route path="/view-profile" element={<ViewProfile />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
