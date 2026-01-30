import React from 'react'
import Home from './pages/home.jsx'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Profile from './pages/Profile.jsx'
import History from './pages/history.jsx'
import Status from './pages/status.jsx'
import Activity from './pages/activity.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import AboutPage from './pages/about.jsx'
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/admin/Dashboard';
import DashboardProfile from './pages/admin/Profile';
import Appointments from './pages/admin/Appointments';
import RevenueReport from './pages/admin/revenueandreport.jsx'
import Staff from './pages/admin/staff.jsx'
import Services from './pages/admin/services.jsx'
import Receptionist from './pages/admin/receptionist'
import Settings from './pages/admin/settings.jsx'
import Reviews from './pages/admin/rating.jsx'



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/status' element={<Status />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/history' element={<History />} />
        <Route path='/profile/activity' element={<Activity />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Dashboard routes with layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="services" element={<Services />} />
          <Route path="staff" element={<Staff />} />
          <Route path="revenue-and-report" element={<RevenueReport />} />
          <Route path="receptionist" element={<Receptionist />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
