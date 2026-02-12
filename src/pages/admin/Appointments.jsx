import React, { useState, useEffect } from 'react';
import AppointmentsTable from '../../components/tables/AppointmentsTable';
import CalendarWidget from '../../components/Calendar';
import { useSalon } from '../../context/SalonContext';
import { services as predefinedServices } from './Services';

function Appointments() {
  const { selectedSalon, setSelectedSalon } = useSalon();
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState(predefinedServices.map(s => ({ ...s, _id: s.id, name: s.title })));
  const [staff, setStaff] = useState([]);
  const [salons, setSalons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    clientMobile: '',
    date: '',
    time: '',
    serviceId: '',
    staffId: '',
    salonId: '',
    price: ''
  });

  // Fetch staff's assigned salon for receptionist/staff roles
  useEffect(() => {
    const fetchStaffSalon = async () => {
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId');

      // If user is staff/receptionist, fetch their salon
      if (role && role !== 'owner' && userId) {
        try {
          const response = await fetch(`http://localhost:5050/auth/me?userId=${userId}&role=${role}`);
          if (response.ok) {
            const staffData = await response.json();
            if (staffData.salonId) {
              const salonIdString = typeof staffData.salonId === 'object'
                ? staffData.salonId._id
                : staffData.salonId;
              setFormData(prev => ({ ...prev, salonId: salonIdString }));

              // NEW: Ensure context is aware of the staff's salon
              if (staffData.salonId) {
                const salonToSelect = typeof staffData.salonId === 'object'
                  ? staffData.salonId
                  : { _id: staffData.salonId, name: 'My Branch' };

                // Only update if current context is missing or different
                if (!selectedSalon || selectedSalon._id !== salonIdString) {
                  setSelectedSalon(salonToSelect);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error fetching staff salon:', error);
        }
      }
    };

    fetchStaffSalon();
  }, []);

  // Update form salonId when selectedSalon changes (for owners)
  useEffect(() => {
    if (selectedSalon) {
      setFormData(prev => ({ ...prev, salonId: selectedSalon._id }));
    }
  }, [selectedSalon]);

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

        // Map backend data to table expected format
        const mappedData = filteredData.map(app => {
          // If serviceId is populated as an object, use its name.
          let serviceName = 'Service';
          if (app.serviceId && typeof app.serviceId === 'object') {
            serviceName = app.serviceId.name;
          } else if (app.serviceId) {
            // Look up in predefined services if it's a static ID
            const staticService = predefinedServices.find(s => String(s.id) === String(app.serviceId));
            if (staticService) {
              serviceName = staticService.title;
            }
          }

          return {
            id: app._id,
            name: app.clientName,
            mobile: app.clientMobile,
            staff: app.staffId?.name || 'Unassigned',
            date: new Date(app.date).toLocaleDateString(),
            serviceType: serviceName,
            price: app.price || 0,
            note: app.note || '',
            status: app.status || 'waiting'
          };
        });
        setAppointments(mappedData);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Re-fetch when selectedSalon changes
  useEffect(() => {
    fetchAppointments();
  }, [selectedSalon]);

  const fetchServices = async () => {
    try {
      const salonId = selectedSalon?._id;
      if (!salonId) return;

      const response = await fetch(`http://localhost:5050/services?salonId=${salonId}`);
      if (response.ok) {
        const data = await response.json();
        const normalizedPredefined = predefinedServices.map(s => ({ ...s, _id: s.id, name: s.title }));
        // Put predefined services first, then API services
        setServices([...normalizedPredefined, ...data]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      // Use _id if it's an object, otherwise use the value itself
      const salonId = selectedSalon?._id || selectedSalon;

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
        setStaff(data);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const fetchSalons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/salons', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSalons(data);
      }
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  useEffect(() => {
    if (selectedSalon) {
      fetchServices();
      fetchStaff();
    }
  }, [selectedSalon]);

  useEffect(() => {
    fetchSalons();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (appointment) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5050/appointments/${appointment.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFormData({
          _id: data._id,
          clientName: data.clientName,
          clientMobile: data.clientMobile,
          date: data.date ? data.date.split('T')[0] : '',
          time: data.date ? new Date(data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
          serviceId: data.serviceId?._id || data.serviceId,
          staffId: data.staffId?._id || data.staffId,
          salonId: data.salonId?._id || data.salonId,
          price: data.price || '',
        });
        setShowModal(true);
      })
      .catch(err => {
        console.error("Error fetching appointment for edit:", err);
        alert("Failed to load appointment details.");
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.date || !formData.time) {
        alert('Please select both date and time.');
        return;
      }

      // Combine date and time
      const appointmentDate = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        ...formData,
        date: appointmentDate,
        status: 'pending' // Default status, or keep existing if editing
      };

      const method = formData._id ? 'PUT' : 'POST';
      const url = formData._id
        ? `http://localhost:5050/appointments/${formData._id}`
        : 'http://localhost:5050/appointments';

      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchAppointments();
        setShowModal(false);
        setFormData({
          clientName: '',
          clientMobile: '',
          date: '',
          time: '',
          serviceId: '',
          staffId: '',
          salonId: selectedSalon?._id || ''
        });
      } else {
        alert('Failed to save appointment');
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
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
        // Update local state
        setAppointments(prev => prev.map(app =>
          app.id === appointmentId ? { ...app, status: 'completed' } : app
        ));
        alert('Appointment marked as complete!');
      } else {
        alert('Failed to mark appointment as complete');
      }
    } catch (error) {
      console.error('Error completing appointment:', error);
      alert('Error completing appointment');
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
              <p className="text-gray-500">View and manage scheduled appointments.</p>
            </div>
            <button
              className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full md:w-auto"
              onClick={() => {
                setFormData({
                  clientName: '',
                  clientMobile: '',
                  date: '',
                  time: '',
                  serviceId: '',
                  staffId: '',
                  salonId: selectedSalon?._id || ''
                });
                setShowModal(true);
              }}
            >
              + Create New Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {selectedDate && (
                <div className="mb-4 flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="text-blue-700 font-medium">
                    Showing appointments for {selectedDate.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
              <AppointmentsTable
                appointments={selectedDate
                  ? appointments.filter(app => app.date === selectedDate.toLocaleDateString())
                  : appointments
                }
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar</h3>
                <CalendarWidget
                  appointments={appointments}
                  onDateClick={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{formData._id ? 'Edit Appointment' : 'Create New Appointment'}</h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    name="clientMobile"
                    value={formData.clientMobile}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    type="time"
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                  >
                    <option value="">Select service</option>
                    {services.map(service => (
                      <option key={service._id} value={service._id}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Enter price"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Staff</label>
                  <select
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                  >
                    <option value="">Select staff</option>
                    {staff.map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salon</label>
                  <select
                    name="salonId"
                    value={formData.salonId}
                    onChange={handleInputChange}
                    disabled={localStorage.getItem('role') !== 'owner'}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white ${localStorage.getItem('role') !== 'owner' ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                  >
                    <option value="">Select salon</option>
                    {salons.map(salon => (
                      <option key={salon._id} value={salon._id}>{salon.name}</option>
                    ))}
                  </select>
                  {localStorage.getItem('role') !== 'owner' && (
                    <p className="text-xs text-gray-500 mt-1">Your assigned branch is pre-selected</p>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments
