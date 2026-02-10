import React from 'react';
import { FaTimes } from 'react-icons/fa';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
    const [password, setPassword] = React.useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(password);
        setPassword('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative zoom-in-95" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h2>
                <p className="text-gray-600 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Nevermind
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={!password}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
