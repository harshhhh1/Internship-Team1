import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import CalendarWidget from '../../components/Calendar';
import ReceptionistTable from '../../components/tables/ReceptionistTable';
import KpiCard from '../../components/KpiCard';
import { useSalon } from '../../context/SalonContext';

function Receptionist() {
  console.log('=== RECEPTIONIST COMPONENT LOADED ===');

  const { selectedSalon } = useSalon();
  const [showNewPatientPopup, setShowNewPatientPopup] = useState(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState([]);
  const [todayStats, setTodayStats] = useState({ customerCount: 0, revenue: 0 });
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  console.log('Initial userRole:', userRole);
  console.log('Initial todayStats:', todayStats);

  // Form state for New Client Registration
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    mobile: '',
    age: '',
    gender: 'Male',
    reason: ''
  });

  // Form state for Walk-in Entry
  const [walkinForm, setWalkinForm] = useState({
    clientName: '',
    serviceRequest: '',
    stylistId: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5050/appointments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Filter by selected Salon if available
          const filteredData = selectedSalon
            ? data.filter(app => app.salonId?._id === selectedSalon._id || app.salonId === selectedSalon._id)
            : data;

          const mappedData = filteredData.map(app => ({
            id: app._id,
            time: new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            name: app.clientName,
            gender: "N/A", // Backend doesn't have gender yet
            age: "--", // Backend doesn't have age yet
            reason: app.serviceId?.name || "Visit",
            stylist: app.staffId?.name || "Stylist",
            status: app.status || "waiting"
          }));
          setAppointments(mappedData);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [selectedSalon]);

  useEffect(() => {
    const fetchTodayStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = selectedSalon
          ? `http://localhost:5050/appointments/today-stats?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/appointments/today-stats';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Today stats:', data);
          setTodayStats(data);
        } else {
          console.error('Failed to fetch stats:', response.status);
        }
      } catch (error) {
        console.error("Error fetching today's stats:", error);
      }
    };

    // Debug logging
    const roleFromStorage = localStorage.getItem('role');
    console.log('User role from localStorage:', roleFromStorage);
    console.log('userRole state:', userRole);

    // Fetch stats regardless of role for debugging
    fetchTodayStats();
  }, [selectedSalon, userRole]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = selectedSalon
          ? `http://localhost:5050/staff?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/staff';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Filter for active stylists
          const stylists = data.filter(s => s.isActive && (s.role === 'stylist' || s.role === 'assistant'));
          setStaff(stylists);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, [selectedSalon]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked': return 'bg-blue-100 text-blue-700';
      case 'waiting': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'checked': return 'Checked In';
      case 'waiting': return 'Waiting';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleMarkComplete = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/appointments/${appointmentId}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Optimistically update the UI or refetch
        // Ideally we should refetch to get updated status, but we can also update local state
        setAppointments(prev => prev.map(app =>
          app.id === appointmentId ? { ...app, status: 'completed' } : app
        ));
      } else {
        console.error("Failed to mark appointment as complete");
        alert("Failed to complete appointment");
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      alert("Error completing appointment");
    }
  };

  const handleNewClientSubmit = async () => {
    try {
      if (!selectedSalon) {
        alert('Please select a salon first');
        return;
      }

      const token = localStorage.getItem('token');

      // Create appointment for new client
      const appointmentData = {
        clientName: newClientForm.name,
        clientMobile: newClientForm.mobile,
        date: new Date(), // Current date and time
        serviceId: newClientForm.reason || null,
        staffId: null,
        salonId: selectedSalon?._id || null,
        status: 'pending'
      };

      const response = await fetch('http://localhost:5050/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        // Refresh appointments list
        const fetchAppointments = async () => {
          const res = await fetch('http://localhost:5050/appointments', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            const filteredData = selectedSalon
              ? data.filter(app => app.salonId?._id === selectedSalon._id || app.salonId === selectedSalon._id)
              : data;
            const mappedData = filteredData.map(app => ({
              id: app._id,
              time: new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              name: app.clientName,
              gender: "N/A",
              age: "--",
              reason: app.serviceId?.name || "Visit",
              stylist: app.staffId?.name || "Stylist",
              status: app.status || "waiting"
            }));
            setAppointments(mappedData);
          }
        };
        await fetchAppointments();

        // Reset form and close modal
        setNewClientForm({ name: '', mobile: '', age: '', gender: 'Male', reason: '' });
        setShowNewPatientPopup(false);
        alert('New client registered successfully!');
      } else {
        alert('Failed to register client');
      }
    } catch (error) {
      console.error('Error registering client:', error);
      alert('Error registering client');
    }
  };

  const handleWalkinSubmit = async () => {
    try {
      if (!selectedSalon) {
        alert('Please select a salon first');
        return;
      }

      const token = localStorage.getItem('token');

      const appointmentData = {
        clientName: walkinForm.clientName || 'Walk-in Client',
        clientMobile: '0000000000',
        date: new Date(), // Current date and time
        serviceId: walkinForm.serviceRequest || null,
        staffId: walkinForm.stylistId || null,
        salonId: selectedSalon._id,
        status: 'pending'
      };

      console.log('Sending appointment data:', appointmentData);

      const response = await fetch('http://localhost:5050/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating appointment:', errorData);
        alert(`Failed to add walk-in entry: ${errorData.message || 'Unknown error'}`);
        return;
      }

      if (response.ok) {
        // Refresh appointments
        const fetchAppointments = async () => {
          const res = await fetch('http://localhost:5050/appointments', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            const filteredData = selectedSalon
              ? data.filter(app => app.salonId?._id === selectedSalon._id || app.salonId === selectedSalon._id)
              : data;
            const mappedData = filteredData.map(app => ({
              id: app._id,
              time: new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              name: app.clientName,
              gender: "N/A",
              age: "--",
              reason: app.serviceId?.name || "Visit",
              stylist: app.staffId?.name || "Stylist",
              status: app.status || "waiting"
            }));
            setAppointments(mappedData);
          }
        };
        await fetchAppointments();

        // Reset form and close modal
        setWalkinForm({ clientName: '', serviceRequest: '', stylistId: '' });
        setShowEmergencyPopup(false);
        alert('Walk-in entry added successfully!');
      } else {
        alert('Failed to add walk-in entry');
      }
    } catch (error) {
      console.error('Error adding walk-in:', error);
      alert('Error adding walk-in entry');
    }
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(app => {
    const searchLower = searchTerm.toLowerCase();
    return (
      app.name?.toLowerCase().includes(searchLower) ||
      app.stylist?.toLowerCase().includes(searchLower) ||
      app.reason?.toLowerCase().includes(searchLower) ||
      app.status?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Today's Appointments</h1>
        <p className="text-gray-500">Wed, Jan 29, 2026</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by client name, stylist, or service..."
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
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </p>
        )}
      </div>

      {/* Stats Cards - Temporarily showing to all users for debugging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <KpiCard
          title="Today's Customers"
          value={todayStats.customerCount.toString()}
          trend="+0%"
          isPositive={true}
          icon={<span className="text-2xl">👥</span>}
        />
        <KpiCard
          title="Today's Revenue"
          value={`₹${todayStats.revenue.toLocaleString()}`}
          trend="+0%"
          isPositive={true}
          icon={<span className="text-2xl">💰</span>}
        />
      </div>
      {/* DEBUG: Role is {userRole} */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Table */}
        <ReceptionistTable appointments={filteredAppointments} onMarkComplete={handleMarkComplete} />


        {/* Right Panel */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <CalendarWidget />
          </div>

          {/* Action Buttons */}
          <button
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setShowNewPatientPopup(true)}
          >
            + New Client Registration
          </button>

          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setShowEmergencyPopup(true)}
          >
            🚨 Walk-in Entry
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {(showNewPatientPopup || showEmergencyPopup) && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowNewPatientPopup(false);
            setShowEmergencyPopup(false);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {showNewPatientPopup ? "New Client Registration" : "Walk-in Entry"}
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                &times;
              </button>
            </div>

            {/* Popup Body */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={showNewPatientPopup ? newClientForm.name : walkinForm.clientName}
                    onChange={(e) => {
                      if (showNewPatientPopup) {
                        setNewClientForm({ ...newClientForm, name: e.target.value });
                      } else {
                        setWalkinForm({ ...walkinForm, clientName: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                {showNewPatientPopup && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={newClientForm.mobile}
                        onChange={(e) => setNewClientForm({ ...newClientForm, mobile: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        placeholder="Enter age"
                        value={newClientForm.age}
                        onChange={(e) => setNewClientForm({ ...newClientForm, age: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={newClientForm.gender}
                        onChange={(e) => setNewClientForm({ ...newClientForm, gender: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                      <input
                        type="text"
                        placeholder="Service needed"
                        value={newClientForm.reason}
                        onChange={(e) => setNewClientForm({ ...newClientForm, reason: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </>
                )}

                {showEmergencyPopup && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Request</label>
                      <input
                        type="text"
                        placeholder="Describe service needed"
                        value={walkinForm.serviceRequest}
                        onChange={(e) => setWalkinForm({ ...walkinForm, serviceRequest: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stylist</label>
                      <select
                        value={walkinForm.stylistId}
                        onChange={(e) => setWalkinForm({ ...walkinForm, stylistId: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white"
                      >
                        <option value="">Select Stylist</option>
                        {staff.map(stylist => (
                          <option key={stylist._id} value={stylist._id}>{stylist.name}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Popup Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => {
                  if (showNewPatientPopup) {
                    handleNewClientSubmit();
                  } else if (showEmergencyPopup) {
                    handleWalkinSubmit();
                  }
                }}
              >
                Save
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Receptionist
