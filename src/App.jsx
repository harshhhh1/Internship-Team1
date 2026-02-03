import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard.jsx";
import DashboardProfile from "./pages/admin/Profile.jsx";
import Appointments from "./pages/admin/Appointments.jsx";
import Services from "./pages/admin/Services.jsx";
import Staff from "./pages/admin/staff.jsx";
import Receptionist from "./pages/admin/receptionist.jsx";
import RevenueAndReport from "./pages/admin/revenueandreport.jsx";
import Reviews from "./pages/admin/rating.jsx";
import Settings from "./pages/admin/settings.jsx";

import { UserProvider, UserContext } from "./context/UserContext";

// Component to handle role-based dashboard index
const DashboardIndex = () => {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Admin stays on dashboard, others redirect to appointments
  if (user.role === 'admin') {
    return <Dashboard />;
  } else {
    return <Navigate to="/dashboard/appointments" replace />;
  }
};

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Profile (any logged-in user) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Layout - All authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Role-based index - Admin sees Dashboard, others see Appointments */}
          <Route index element={<DashboardIndex />} />

          {/* Profile - All Roles */}
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
                <DashboardProfile />
              </ProtectedRoute>
            }
          />

          {/* Appointments - All Roles */}
          <Route
            path="appointments"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />

          {/* Services - All Roles */}
          <Route
            path="services"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
                <Services />
              </ProtectedRoute>
            }
          />

          {/* Staff - Admin & Staff Only */}
          <Route
            path="staff"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                <Staff />
              </ProtectedRoute>
            }
          />

          {/* Receptionist - Admin & Receptionist Only */}
          <Route
            path="receptionist"
            element={
              <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
                <Receptionist />
              </ProtectedRoute>
            }
          />

          {/* Revenue & Report - Admin Only */}
          <Route
            path="revenue-and-report"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <RevenueAndReport />
              </ProtectedRoute>
            }
          />

          {/* Reviews - All Roles */}
          <Route
            path="reviews"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
                <Reviews />
              </ProtectedRoute>
            }
          />

          {/* Settings - All Roles */}
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff", "receptionist"]}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
