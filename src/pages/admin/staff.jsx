import React, { useState } from 'react'

const staffData = [
  {
    srNo: 1,
    id: 'STF001',
    name: 'Dr. John Doe',
    type: 'doctor',
    onLeave: false,
    contact: '+1-234-567-8901',
    email: 'john.doe@hospital.com',
    appointedAt: '2023-01-15'
  },
  {
    srNo: 2,
    id: 'STF002',
    name: 'Jane Smith',
    type: 'staff',
    onLeave: true,
    contact: '+1-234-567-8902',
    email: 'jane.smith@hospital.com',
    appointedAt: '2023-03-20'
  },
  {
    srNo: 3,
    id: 'STF003',
    name: 'Admin User',
    type: 'admin',
    onLeave: false,
    contact: '+1-234-567-8903',
    email: 'admin@hospital.com',
    appointedAt: '2022-11-10'
  },
  {
    srNo: 4,
    id: 'STF004',
    name: 'Dr. Emily Johnson',
    type: 'doctor',
    onLeave: false,
    contact: '+1-234-567-8904',
    email: 'emily.johnson@hospital.com',
    appointedAt: '2023-05-08'
  },
  {
    srNo: 5,
    id: 'STF005',
    name: 'Mike Wilson',
    type: 'staff',
    onLeave: true,
    contact: '+1-234-567-8905',
    email: 'mike.wilson@hospital.com',
    appointedAt: '2023-07-12'
  },
  {
    srNo: 6,
    id: 'STF006',
    name: 'Sarah Admin',
    type: 'admin',
    onLeave: false,
    contact: '+1-234-567-8906',
    email: 'sarah.admin@hospital.com',
    appointedAt: '2022-09-05'
  }
];

function Staff() {
  const [staffList, setStaffList] = useState(staffData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'staff',
    onLeave: false,
    contact: '',
    email: '',
    appointedAt: ''
  });

  const generateId = () => {
    const lastId = staffList.length > 0 ? parseInt(staffList[staffList.length - 1].id.slice(3)) : 0;
    return `STF${String(lastId + 1).padStart(3, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = {
      srNo: staffList.length + 1,
      id: generateId(),
      ...formData
    };
    setStaffList(prev => [...prev, newStaff]);
    setFormData({
      name: '',
      type: 'staff',
      onLeave: false,
      contact: '',
      email: '',
      appointedAt: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-gray-500 mt-2">View and manage hospital staff information.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Staff
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Sr.No</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">On Leave</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Appointed At</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {staffList.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-700 font-mono text-sm">
                      {staff.srNo}
                    </td>
                    <td className="p-4 text-gray-700 font-mono text-sm">
                      {staff.id}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {staff.name}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize
                          ${staff.type === 'doctor' ? 'bg-blue-100 text-blue-700' :
                            staff.type === 'staff' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}
                      >
                        {staff.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                          ${staff.onLeave ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                      >
                        {staff.onLeave ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {staff.contact}
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {staff.email}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {staff.appointedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Staff</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  type="text"
                  value={generateId()}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                />
              </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointed At</label>
                <input
                  type="date"
                  name="appointedAt"
                  value={formData.appointedAt}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
                  Add Staff
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
