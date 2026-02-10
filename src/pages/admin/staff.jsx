import React, { useState, useEffect } from 'react'
import { FaTimes, FaSearch } from 'react-icons/fa';
import StaffTable from '../../components/tables/StaffTable';
import { useSalon } from '../../context/SalonContext';
import { getAllTabOptions, DEFAULT_TABS } from '../../config/roleConfig';

function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { salons, selectedSalon, setSelectedSalon } = useSalon(); // Use Global Context
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'staff',
    profession: 'Stylist',
    mobile: '',
    email: '',
    password: 'password123',
    isActive: true,
    onLeave: false,
    salonId: '',
    avatarUrl: '',
    accessToTabs: []
  });

  // Get all available tabs for checkbox display
  const allTabOptions = getAllTabOptions();

  const fetchStaff = async (salonId = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = salonId
        ? `http://localhost:5050/staff?salonId=${salonId}`
        : 'http://localhost:5050/staff';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStaffList(data);
      } else {
        console.error('Failed to fetch staff');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sync with global selection
  useEffect(() => {
    if (selectedSalon) {
      fetchStaff(selectedSalon._id);
    } else {
      fetchStaff(); // Fetch all or handle empty
    }
  }, [selectedSalon]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // When role changes, update default accessToTabs
    if (name === 'role') {
      const defaultTabs = DEFAULT_TABS[value] || DEFAULT_TABS.staff;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        accessToTabs: defaultTabs
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle tab access checkbox changes
  const handleTabAccessChange = (tabId, isChecked) => {
    setFormData(prev => {
      const currentTabs = prev.accessToTabs || [];
      if (isChecked) {
        return { ...prev, accessToTabs: [...currentTabs, tabId] };
      } else {
        return { ...prev, accessToTabs: currentTabs.filter(t => t !== tabId) };
      }
    });
  };

  const handleSalonFilter = (e) => {
    const salonId = e.target.value;
    const salon = salons.find(s => s._id === salonId);
    setSelectedSalon(salon);
  };

  const handleEdit = (staff) => {
    setFormData({
      ...staff,
      password: '', // Don't prefill password, keep empty unless changing
      salonId: staff.salonId?._id || staff.salonId, // Handle populated or ID
      avatarUrl: staff.avatarUrl || '',
      accessToTabs: staff.accessToTabs || DEFAULT_TABS[staff.role] || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/staff/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchStaff(selectedSalon?._id);
      } else {
        console.error('Failed to delete staff');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password; // Don't send empty password on edit

      console.log("=== STAFF SAVE DEBUG ===");
      console.log("Payload being sent:", payload);
      console.log("Method:", formData._id ? 'PUT' : 'POST');

      const method = formData._id ? 'PUT' : 'POST';
      const url = formData._id
        ? `http://localhost:5050/staff/${formData._id}`
        : 'http://localhost:5050/staff';

      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Success response:", data);
        fetchStaff(selectedSalon?._id); // Refresh list for current selection
        setIsModalOpen(false);
        // Reset form
        setFormData({
          name: '',
          role: 'staff',
          profession: 'Stylist',
          mobile: '',
          email: '',
          password: 'password123',
          isActive: true,
          onLeave: false,
          salonId: selectedSalon?._id || '',
          avatarUrl: '',
          accessToTabs: DEFAULT_TABS.staff
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to save staff. Status:', response.status);
        console.error('Error response:', errorData);
        alert(`Failed to save staff: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving staff:', error);
      alert(`Error saving staff: ${error.message}`);
    }
  };

  const openAddModal = () => {
    const defaultTabs = DEFAULT_TABS.staff;
    setFormData({
      name: '',
      role: 'staff',
      profession: 'Stylist',
      mobile: '',
      email: '',
      password: 'password123',
      isActive: true,
      onLeave: false,
      salonId: selectedSalon?._id || '',
      avatarUrl: '',
      accessToTabs: defaultTabs
    });
    setIsModalOpen(true);
  };

  // Filter staff based on search term
  const filteredStaff = staffList.filter(staff => {
    const searchLower = searchTerm.toLowerCase();
    return (
      staff.name?.toLowerCase().includes(searchLower) ||
      staff.email?.toLowerCase().includes(searchLower) ||
      staff.mobile?.includes(searchTerm) ||
      staff.profession?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-gray-500 mt-2">View and manage salon staff information.</p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Staff
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or profession..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredStaff.length} of {staffList.length} staff members
              </p>
            )}
          </div>
        </div>

        <StaffTable staffList={filteredStaff} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{formData._id ? 'Edit Staff' : 'Add New Staff'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                <input
                  type="text"
                  name="avatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    name="salonId"
                    value={formData.salonId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Branch</option>
                    {salons.map(salon => (
                      <option key={salon._id} value={salon._id}>{salon.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="staff">Staff</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Stylist">Stylist</option>
                    <option value="Barber">Barber</option>
                    <option value="Masseuse">Masseuse</option>
                    <option value="Beautician">Beautician</option>
                    <option value="Nail Technician">Nail Technician</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${!formData._id && staffList.some(s => s.email === formData.email)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                    }`}
                />
                {!formData._id && staffList.some(s => s.email === formData.email) && (
                  <p className="text-red-500 text-xs mt-1 font-medium">This email is already assigned to another staff member.</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="onLeave"
                  checked={formData.onLeave}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">On Leave</label>
              </div>

              {/* Tab Access Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tab Access Permissions
                  <span className="text-gray-400 font-normal ml-2">(Select which tabs this user can access)</span>
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {allTabOptions.map(tab => (
                    <label key={tab.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-1.5 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.accessToTabs?.includes(tab.id) || false}
                        onChange={(e) => handleTabAccessChange(tab.id, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{tab.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.accessToTabs?.length || 0} tabs selected
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  {formData._id ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Staff
