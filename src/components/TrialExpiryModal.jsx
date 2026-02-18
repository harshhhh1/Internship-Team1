import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaLock, FaCheck } from 'react-icons/fa';

function TrialExpiryModal({ isOpen, onClose, message, onSubscribe }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      navigate('/plans-and-pricing?expired=true');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" aria-hidden="true"></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          
          {/* Header */}
          <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-4">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
              <FaExclamationTriangle className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">Trial Period Expired</h3>
              <p className="text-sm text-red-600">Your access has been restricted</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 mt-1">
                <FaLock className="text-gray-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-700">
                  {message || "Your 14-day free trial has ended. To continue using the application, please subscribe to a paid plan."}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">What's included:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-blue-500" /> Full access to all features
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-blue-500" /> Unlimited appointments & clients
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-blue-500" /> Staff management & attendance
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-blue-500" /> Reports & analytics
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={handleSubscribe}
              className="inline-flex justify-center rounded-xl border border-transparent shadow-sm px-6 py-3 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none sm:text-sm transition-all"
            >
              View Plans & Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check trial status
export const useTrialStatus = () => {
  const [trialStatus, setTrialStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpiryModal, setShowExpiryModal] = useState(false);

  const checkTrialStatus = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'owner') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5050/auth/trial-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTrialStatus(data);

        // Show modal if trial expired
        if (data.trialExpired) {
          setShowExpiryModal(true);
        }

        // Store in localStorage for quick access
        localStorage.setItem('trialStatus', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error checking trial status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTrialStatus();
  }, []);

  return {
    trialStatus,
    loading,
    showExpiryModal,
    setShowExpiryModal,
    checkTrialStatus
  };
};

export default TrialExpiryModal;

