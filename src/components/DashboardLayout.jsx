import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import BottomNav from './BottomNav';
import { useSalon } from '../context/SalonContext';

const DashboardLayout = () => {
  const { fetchSalons } = useSalon();

  useEffect(() => {
    fetchSalons();
  }, []);

  return (
    <div className="min-h-screen bg-bg-light pb-16 md:pb-0">
      {/* Sidebar for Desktop */}
      <DashboardSidebar />

      {/* Bottom Nav for Mobile */}
      <BottomNav />

      {/* Main Content Area */}
      {/* Added top padding for mobile if needed, or just default */}
      <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;