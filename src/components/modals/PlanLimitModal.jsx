import React from 'react';
import { FaCrown, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PlanLimitModal = ({ isOpen, onClose, currentLimit }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="relative p-8 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <FaCrown className="text-primary text-4xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Limit Reached!</h2>
                    <p className="text-gray-600 mb-8">
                        You have reached your current plan's limit of <span className="font-bold text-primary">{currentLimit}</span> branch{currentLimit > 1 ? 'es' : ''}.
                        Upgrade to a higher plan to add more branches and unlock premium features.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/plans-and-pricing');
                            }}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-md hover:shadow-lg"
                        >
                            View Plans & Upgrade
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>

                <div className="bg-bg-light px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Premium Feature Only</span>
                </div>
            </div>
        </div>
    );
};

export default PlanLimitModal;
