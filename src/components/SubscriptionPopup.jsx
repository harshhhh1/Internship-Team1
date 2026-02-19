import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaTimes } from 'react-icons/fa';

const SubscriptionPopup = ({ isOpen, onClose, isTrial = false, daysRemaining = 0 }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubscribe = () => {
    navigate('/plans-and-pricing');
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Popup Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <FaTimes size={20} />
        </button>

        {/* Header - Gradient Background */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <FaCrown className="text-3xl text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isTrial ? 'Free Trial Active' : 'Choose Your Plan'}
          </h2>
          <p className="text-white/90 text-sm">
            {isTrial 
              ? `You have ${daysRemaining} days left in your free trial`
              : 'Unlock all features to manage your salon'
            }
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Online Appointment Booking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Digital Client Management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Staff & Inventory Management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Reports & Analytics</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubscribe}
            className="w-full py-4 px-6 bg-primary hover:bg-[#7a67e0] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isTrial ? 'Subscribe Now' : 'View Plans'}
          </button>

          {/* Skip for now (only for trial) */}
          {isTrial && (
            <button
              onClick={onClose}
              className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Maybe Later
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment • Cancel anytime • 14-day money back guarantee
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPopup;

