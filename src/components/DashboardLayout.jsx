import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { HiMenu } from 'react-icons/hi';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Swipe Logic States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset
    // Only register the start if it's near the left edge (e.g., within 50px)
    // This allows users to scroll horizontally on tables without opening the menu
    if (e.targetTouches[0].clientX < 50) {
      setTouchStart(e.targetTouches[0].clientX);
    } else {
      setTouchStart(null);
    }
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    // const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe Right (negative distance) -> Open Sidebar
    if (isRightSwipe) {
      setSidebarOpen(true);
    }
  };

  return (
    <div 
      className="min-h-screen bg-bg-light"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <DashboardSidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      {/* Mobile Header for Sidebar Toggle */}
      <div className="md:hidden bg-white p-4 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-600 focus:outline-none">
           <HiMenu size={28} />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Dashboard</span>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;