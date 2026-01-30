import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function DashboardSidebar({ isOpen, closeSidebar }) {
  // Swipe Logic States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    // Swipe Left (positive distance) -> Close Sidebar
    if (isLeftSwipe) {
      closeSidebar();
    }
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 my-1 rounded-lg font-medium transition-all duration-300 ${isActive
      ? 'bg-primary text-white shadow-md'
      : 'text-gray-700 hover:bg-white hover:shadow-sm'
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar Container with Swipe Listeners */}
      <div 
        className={`w-64 min-h-screen bg-bg-light border-r border-gray-200 p-5 flex flex-col fixed left-0 top-0 z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
         <div className="flex justify-between items-center mb-6 pl-2">
            <h3 className="text-xl font-bold text-gray-800">Admin Panel</h3>
            <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
         
         <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
           <NavLink to="/dashboard" end className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/dashboard.svg' alt="Dashboard" className="w-5 h-5 mr-3"/>Dashboard</NavLink>
           <NavLink to="/dashboard/profile" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/account_circle.svg' alt="Profile" className="w-5 h-5 mr-3"/>Profile</NavLink>
           <NavLink to="/dashboard/appointments" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/appointment.svg' alt="Appointments" className="w-5 h-5 mr-3"/>Appointments</NavLink>
           <NavLink to="/dashboard/services" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/services.svg' alt="Services" className="w-5 h-5 mr-3"/>Services</NavLink>
           <NavLink to="/dashboard/staff" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/staff.svg' alt="Staff" className="w-5 h-5 mr-3"/>Staff</NavLink>
           <NavLink to="/dashboard/receptionist" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/receptionist.svg' alt="Receptionist" className="w-5 h-5 mr-3"/>Receptionist</NavLink>
           <NavLink to="/dashboard/revenue-and-report" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/rar.svg' alt="Reports" className="w-5 h-5 mr-3"/>Revenue & Report</NavLink>
           <NavLink to="/dashboard/reviews" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/reviews.svg' alt="Reviews" className="w-5 h-5 mr-3"/>Reviews</NavLink>
         </nav>
        <NavLink to="/dashboard/settings" className={linkClasses} onClick={() => window.innerWidth < 768 && closeSidebar()}><img src='/settings.svg' alt="Settings" className="w-5 h-5 mr-3"/>Settings</NavLink>
       </div>
    </>
  );
}

export default DashboardSidebar