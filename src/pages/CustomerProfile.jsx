import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('customerToken');
        const customerId = localStorage.getItem('customerId');

        if (!token || !customerId) {
            navigate('/customer-login');
            return;
        }

        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        const token = localStorage.getItem('customerToken');
        try {
            const response = await fetch('http://localhost:5050/customer/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setFormData({
                    name: data.name,
                    phone: data.phone
                });
            } else if (response.status === 401) {
                handleLogout();
            } else {
                setErrors({ global: 'Failed to load profile' });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setErrors({ global: 'An error occurred while loading profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerId');
        localStorage.removeItem('customerName');
        localStorage.removeItem('userRole');
        navigate('/customer-login');
    };

    const validateProfileForm = () => {
        const newErrors = {};
        
        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.name)) {
            newErrors.name = 'Name can only contain letters and spaces';
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePasswordForm = () => {
        const newErrors = {};
        
        if (!passwordData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else {
            if (passwordData.newPassword.length < 8) {
                newErrors.newPassword = 'Password must be at least 8 characters';
            }
            if (!/[A-Z]/.test(passwordData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one uppercase letter';
            }
            if (!/[a-z]/.test(passwordData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one lowercase letter';
            }
            if (!/[0-9]/.test(passwordData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one number';
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one special character';
            }
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        
        if (!validateProfileForm()) return;

        const token = localStorage.getItem('customerToken');
        try {
            const response = await fetch('http://localhost:5050/customer/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.customer);
                localStorage.setItem('customerName', data.customer.name);
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const data = await response.json();
                setErrors({ global: data.message || 'Failed to update profile' });
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setErrors({ global: 'An error occurred while updating profile' });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        
        if (!validatePasswordForm()) return;

        const token = localStorage.getItem('customerToken');
        try {
            const response = await fetch('http://localhost:5050/customer/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            if (response.ok) {
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setSuccessMessage('Password changed successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const data = await response.json();
                setErrors({ global: data.message || 'Failed to change password' });
            }
        } catch (err) {
            console.error('Error changing password:', err);
            setErrors({ global: 'An error occurred while changing password' });
        }
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthLabel = (strength) => {
        if (strength <= 2) return { label: "Weak", color: "bg-red-500" };
        if (strength <= 4) return { label: "Medium", color: "bg-yellow-500" };
        return { label: "Strong", color: "bg-green-500" };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light py-14 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-gray-500">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light py-14 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-500 mt-1">Manage your account settings</p>
                    </div>
                    <div className="flex gap-4">
                        <a 
                            href="/my-bookings" 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        >
                            My Bookings
                        </a>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {errors.global && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                        {errors.global}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => {
                                setActiveTab('profile');
                                setErrors({});
                                setSuccessMessage('');
                            }}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                activeTab === 'profile' 
                                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Profile Information
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('password');
                                setErrors({});
                                setSuccessMessage('');
                            }}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                activeTab === 'password' 
                                    ? 'text-primary border-b-2 border-primary bg-primary/5' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="p-8">
                        {activeTab === 'profile' ? (
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={profile?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        maxLength={10}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    />
                                    {errors.currentPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    />
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                                    )}
                                    {/* Password Strength Indicator */}
                                    {passwordData.newPassword && (
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all duration-300 ${getPasswordStrengthLabel(getPasswordStrength(passwordData.newPassword)).color}`}
                                                        style={{ width: `${(getPasswordStrength(passwordData.newPassword) / 6) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">
                                                    {getPasswordStrengthLabel(getPasswordStrength(passwordData.newPassword)).label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Must be at least 8 characters with uppercase, lowercase, number, and special character
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
