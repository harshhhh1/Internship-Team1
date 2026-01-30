import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <DashboardSidebar />
      <main className="ml-64 p-8 bg-bg-light min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;