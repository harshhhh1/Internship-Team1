import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import BottomNav from './BottomNav';
import { useSalon } from '../context/SalonContext';
import SubscriptionPopup from './SubscriptionPopup';

const DashboardLayout = () => {
  const { fetchSalons } = useSalon();
  const location = useLocation();
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isLoading: true,
    hasSubscription: false,
    isTrialActive: false,
    daysRemaining: 0,
    popupDismissed: false
  });

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  // Check subscription status when user is on dashboard
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');
      
      // Only check for owners
      if (role !== 'owner') {
        setSubscriptionStatus(prev => ({ ...prev, isLoading: false, hasSubscription: true }));
        return;
      }

      // Check if popup was dismissed in this session
      const popupDismissed = sessionStorage.getItem('subscriptionPopupDismissed');
      
      try {
        const response = await fetch('http://localhost:5050/auth/trial-status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Check if user has a subscription (not on trial or trial expired but has subscription)
          const hasSubscription = !data.isTrialActive || (data.isTrialActive && !data.trialExpired);
          const isTrialActive = data.isTrialActive && !data.trialExpired;
          
          setSubscriptionStatus({
            isLoading: false,
            hasSubscription: hasSubscription,
            isTrialActive: isTrialActive,
            daysRemaining: data.daysRemaining || 0,
            popupDismissed: popupDismissed === 'true'
          });
        } else {
          setSubscriptionStatus(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
        setSubscriptionStatus(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkSubscriptionStatus();
  }, []);

  // Handle popup close
  const handlePopupClose = () => {
    sessionStorage.setItem('subscriptionPopupDismissed', 'true');
    setSubscriptionStatus(prev => ({ ...prev, popupDismissed: true }));
  };

  // Show popup only on dashboard page and if no subscription and not dismissed
  const showPopup = !subscriptionStatus.isLoading && 
                    !subscriptionStatus.hasSubscription && 
                    !subscriptionStatus.popupDismissed &&
                    location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-bg-light pb-16 md:pb-0">
      {/* Sidebar for Desktop */}
      <DashboardSidebar />

      {/* Bottom Nav for Mobile */}
      <BottomNav />

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
        {/* Show overlay/blocker if no subscription */}
        {!subscriptionStatus.hasSubscription && !subscriptionStatus.isLoading ? (
          <div className="relative">
            {/* Blurred/disabled content behind */}
            <div className="filter blur-sm pointer-events-none select-none">
              <Outlet />
            </div>
            
            {/* Subscription required message */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-lg text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔒</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Required</h2>
                <p className="text-gray-600 mb-6">
                  Please subscribe to access the dashboard and all features.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Subscription Popup */}
      <SubscriptionPopup 
        isOpen={showPopup}
        onClose={handlePopupClose}
        isTrial={subscriptionStatus.isTrialActive}
        daysRemaining={subscriptionStatus.daysRemaining}
      />
    </div>
  );
};

export default DashboardLayout;
