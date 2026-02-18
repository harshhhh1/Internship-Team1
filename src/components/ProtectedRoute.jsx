import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { canAccessPath } from '../config/roleConfig';
import TrialExpiryModal from './TrialExpiryModal';

/**
 * ProtectedRoute component that checks if user has access to a specific route
 * Redirects to dashboard if user doesn't have permission
 * Also checks for trial status for owners and shows modal when expired
 */
const ProtectedRoute = ({ children, tabId }) => {
    const location = useLocation();
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const [trialStatus, setTrialStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrialModal, setShowTrialModal] = useState(false);

    // If not logged in, redirect to login
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If owner, check trial status
    useEffect(() => {
        const checkTrialStatus = async () => {
            if (role === 'owner') {
                const userId = localStorage.getItem('userId');
                try {
                    const response = await fetch(`http://localhost:5050/auth/trial-status`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setTrialStatus(data);
                        
                        // Show modal if trial expired
                        if (data.trialExpired) {
                            setShowTrialModal(true);
                        }
                        
                        // Store trial status in localStorage for easy access
                        localStorage.setItem('trialStatus', JSON.stringify(data));
                    }
                } catch (error) {
                    console.error("Error checking trial status:", error);
                }
            }
            setLoading(false);
        };

        checkTrialStatus();
    }, [role, token]);

    // Show loading while checking trial status
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If owner and trial has expired, show modal but still allow access to plans page
    if (role === 'owner' && trialStatus && trialStatus.trialExpired && !location.pathname.includes('plans-and-pricing')) {
        return (
            <>
                {children}
                <TrialExpiryModal 
                    isOpen={showTrialModal} 
                    onClose={() => setShowTrialModal(false)}
                    message={trialStatus.message}
                />
            </>
        );
    }

    // If owner, allow all access
    if (role === 'owner') {
        return children;
    }

    // Get accessToTabs from localStorage
    let accessToTabs = null;
    try {
        const stored = localStorage.getItem('accessToTabs');
        accessToTabs = stored ? JSON.parse(stored) : null;
    } catch (e) {
        console.error('Error parsing accessToTabs:', e);
    }

    // Check if user can access this path
    const hasAccess = canAccessPath(role, accessToTabs, location.pathname);

    if (!hasAccess) {
        // Redirect to dashboard or first accessible page
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;

