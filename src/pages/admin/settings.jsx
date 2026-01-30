import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import DashboardSidebar from  '../../components/DashboardSidebar';
import './settings.css';

function Settings() {
    const [user, setUser] = useState({
    name: 'Admin User',
    contact: '+1-234-567-8900',
    email: 'admin@hospital.com'
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (field) => {
    // Logic to update specific field
    console.log(`Updating ${field}:`, user[field]);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic to change password
    console.log('Changing password', passwordData);
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '' });
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Deleting account');
    setIsDeleteModalOpen(false);
  };
  return (

    <div className="flex min-h-screen bg-bg-light font-sans">
      <DashboardSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="max-w-3xl space-y-6">
          {/* Account Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={() => handleUpdate('name')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#7a67e0] transition-colors"
                >
                  Update
                </button>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={user.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={() => handleUpdate('contact')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#7a67e0] transition-colors"
                >
                  Update
                </button>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={() => handleUpdate('email')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#7a67e0] transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security</h2>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Change Password
            </button>
          </div>
                {/* 2FA */}
              <div className="security-card highlight">
                   <h2>🛡 Two-Factor Authentication</h2>
                  <p>Enable OTP verification for enhanced security.</p>
                   <button className="secondary-btn">Enable 2FA</button>
              </div>
              {/* Sessions */}
      <div className="security-card">
        <h2>💻 Active Sessions</h2>

        <div className="session-row">
          <span>Windows · Chrome</span>
          <span className="status">Active</span>
        </div>

        <button className="danger-btn">
          Logout from all devices
        </button>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden security-card">
        <h2>📊 Login Activity</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Device</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Browser</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">IP</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-700 text-sm">Windows</td>
                <td className="p-4 text-gray-700 text-sm">Chrome</td>
                <td className="p-4 text-gray-700 text-sm">192.168.1.2</td>
                <td className="p-4 text-gray-700 text-sm">30 Jan 2026</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-700 text-sm">Android</td>
                <td className="p-4 text-gray-700 text-sm">Edge</td>
                <td className="p-4 text-gray-700 text-sm">192.168.1.8</td>
                <td className="p-4 text-gray-700 text-sm">29 Jan 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-gray-500 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
            
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#7a67e0] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to delete your account? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Nevermind
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
     </div>
  )
}

export default Settings
