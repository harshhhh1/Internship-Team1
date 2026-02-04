import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaBuilding, FaSync, FaTrash, FaEdit } from 'react-icons/fa';
import DashboardSidebar from '../../components/DashboardSidebar';
import AddSalonForm from '../../components/AddSalonForm';
import MyBranch from '../../components/MyBranch';

function Settings() {
  const [user, setUser] = useState({
    name: 'Admin User',
    contact: '+1-234-567-8900',
    email: 'admin@hospital.com'
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddSalonOpen, setIsAddSalonOpen] = useState(false);
  const [showSalonSection, setShowSalonSection] = useState(false);
  const [salonExists, setSalonExists] = useState(false);
  const [allSalons, setAllSalons] = useState([]);
  const [salonCount, setSalonCount] = useState(0);
  const [loadingSalons, setLoadingSalons] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    fetchAllSalons();
  }, []);

  const fetchAllSalons = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingSalons(true);
    try {
      const response = await fetch("http://localhost:5001/api/salon/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.salons) {
        setAllSalons(data.salons);
        setSalonCount(data.salons.length);
        setSalonExists(data.salons.length > 0);
        setShowSalonSection(data.salons.length > 0);
      }
    } catch (err) {
      console.log("Error fetching salons:", err);
    } finally {
      setLoadingSalons(false);
    }
  };

  const checkSalonExists = async () => {
    await fetchAllSalons();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (field) => {
    console.log(`Updating ${field}:`, user[field]);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Changing password', passwordData);
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '' });
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account');
    setIsDeleteModalOpen(false);
  };

  const handleSalonSuccess = () => {
    fetchAllSalons();
  };

  return (
    <div className="flex min-h-screen font-sans bg-linear-to-br from-bg-light to-accent-cream">
      <DashboardSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and security preferences.</p>
          </div>

          <div className="space-y-6">
            
{/* Salon Management Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.25)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaBuilding className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Salon Management</h2>
                    <p className="text-white/80 text-sm">Manage your salon branch details</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={checkSalonExists}
                    className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    title="Refresh"
                  >
                    <FaSync size={14} />
                  </button>
                  <button
                    onClick={() => setIsAddSalonOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    <FaPlus size={16} />
                    Add Salon
                  </button>
                </div>
              </div>
            </div>

            {/* All Salons List */}
            {loadingSalons ? (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] text-center">
                <p className="text-gray-600">Loading salons...</p>
              </div>
            ) : allSalons.length > 0 ? (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">
                    🏢 All Salons ({salonCount})
                  </h3>
                  <button
                    onClick={checkSalonExists}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                  >
                    <FaSync size={12} />
                    Refresh
                  </button>
                </div>
                <div className="space-y-3">
                  {allSalons.map((salon, index) => (
                    <div 
                      key={salon._id} 
                      className="flex items-center justify-between bg-bg-light p-4 rounded-xl hover:bg-secondary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{salon.name}</h4>
                          <p className="text-sm text-gray-500">
                            {salon.address?.city}, {salon.address?.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          salon.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {salon.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button 
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit Salon"
                        >
                          <FaEdit size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)]">
                <div className="text-center py-8">
                  <FaBuilding className="mx-auto text-gray-300 text-4xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Salon Added Yet</h3>
                  <p className="text-gray-500 text-sm mb-4">Click "Add Salon" above to add your first salon</p>
                  <button
                    onClick={() => setIsAddSalonOpen(true)}
                    className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-[#7a67e0] transition-colors"
                  >
                    Add Your First Salon
                  </button>
                </div>
              </div>
            )}

            {/* Account Details Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-primary mb-6">Account Details</h2>
              
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                {['name', 'contact', 'email'].map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
                    <div className="flex gap-2">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={user[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-light text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      <button 
                        onClick={() => handleUpdate(field)}
                        className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-[#7a67e0] transition-colors shadow-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-primary mb-6">Security</h2>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Change Password
              </button>
            </div>

            {/* 2FA Card (Highlight Theme) */}
            <div className="bg-linear-to-br from-secondary to-accent-peach rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1">
               <h2 className="text-xl font-semibold text-white mb-2">🛡 Two-Factor Authentication</h2>
               <p className="text-white/90 mb-4">Enable OTP verification for enhanced security.</p>
               <button className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-xl hover:bg-gray-50 transition-colors font-semibold">
                 Enable 2FA
               </button>
            </div>

            {/* Active Sessions */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-primary mb-6">💻 Active Sessions</h2>

              <div className="flex justify-between items-center bg-bg-light p-4 rounded-xl mb-4">
                <span className="font-medium text-gray-700">Windows · Chrome</span>
                <span className="text-primary font-bold">Active</span>
              </div>

              <button className="px-6 py-3 bg-accent-peach text-gray-800 rounded-xl hover:bg-[#ffcca8] transition-colors font-medium">
                Logout from all devices
              </button>
            </div>

            {/* Login History Table */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <h2 className="text-xl font-semibold text-primary mb-6">📊 Login Activity</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mt-2">
                  <thead>
                    <tr>
                      <th className="p-3 bg-secondary text-gray-800 rounded-l-lg text-sm font-semibold uppercase">Device</th>
                      <th className="p-3 bg-secondary text-gray-800 text-sm font-semibold uppercase">Browser</th>
                      <th className="p-3 bg-secondary text-gray-800 text-sm font-semibold uppercase">IP</th>
                      <th className="p-3 bg-secondary text-gray-800 rounded-r-lg text-sm font-semibold uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="hover:bg-accent-cream transition-colors group">
                      <td className="p-3 bg-bg-light rounded-l-lg mt-2 group-hover:bg-accent-cream">Windows</td>
                      <td className="p-3 bg-bg-light group-hover:bg-accent-cream">Chrome</td>
                      <td className="p-3 bg-bg-light group-hover:bg-accent-cream">192.168.1.2</td>
                      <td className="p-3 bg-bg-light rounded-r-lg group-hover:bg-accent-cream">30 Jan 2026</td>
                    </tr>
                    <tr className="block h-2"></tr>
                    <tr className="hover:bg-accent-cream transition-colors group">
                      <td className="p-3 bg-bg-light rounded-l-lg group-hover:bg-accent-cream">Android</td>
                      <td className="p-3 bg-bg-light group-hover:bg-accent-cream">Edge</td>
                      <td className="p-3 bg-bg-light group-hover:bg-accent-cream">192.168.1.8</td>
                      <td className="p-3 bg-bg-light rounded-r-lg group-hover:bg-accent-cream">29 Jan 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
              <p className="text-gray-500 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative zoom-in-95">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative zoom-in-95">
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

      {/* Add Salon Modal */}
      <AddSalonForm 
        isOpen={isAddSalonOpen} 
        onClose={() => setIsAddSalonOpen(false)}
        onSuccess={handleSalonSuccess}
      />
     </div>
  )
}

export default Settings;
