import React, { useState, useEffect, useCallback } from 'react';
import { FaUserPlus, FaClock, FaCheckCircle, FaTimesCircle, FaCalendar } from 'react-icons/fa';
import { useSalon } from '../../context/SalonContext';

// Time slots for walk-in bookings
const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00"
];

export default function Walkin() {
    const { selectedSalon } = useSalon();
    const [showModal, setShowModal] = useState(false);
    const [walkins, setWalkins] = useState([]);
    const [staff, setStaff] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: 'Hair Cut',
        staffId: '',
        price: '',
        date: new Date().toISOString().split('T')[0],
        timeSlot: ''
    });

    const fetchAvailableSlots = useCallback(async () => {
        if (!selectedSalon?._id || !selectedDate) return;
        
        try {
            setLoadingSlots(true);
            const response = await fetch(
                `http://localhost:5050/walkins/slots?salonId=${selectedSalon._id}&date=${selectedDate}`
            );
            if (response.ok) {
                const data = await response.json();
                setAvailableSlots(data.availableSlots || []);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
        } finally {
            setLoadingSlots(false);
        }
    }, [selectedSalon, selectedDate]);

    const fetchWalkins = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const salonId = selectedSalon?._id;
            const url = salonId
                ? `http://localhost:5050/walkins?salonId=${salonId}`
                : 'http://localhost:5050/walkins';

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setWalkins(data);
            }
        } catch (error) {
            console.error("Error fetching walk-ins:", error);
        }
    }, [selectedSalon]);

    const fetchStaff = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const url = selectedSalon
                ? `http://localhost:5050/staff?salonId=${selectedSalon._id}`
                : 'http://localhost:5050/staff';
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const stylists = data.filter(s => s.isActive && (s.role === 'stylist' || s.role === 'assistant'));
                setStaff(stylists);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    }, [selectedSalon]);

useEffect(() => {
        fetchWalkins();
        fetchStaff();
    }, [fetchWalkins, fetchStaff]);

    // Fetch available slots when modal opens or date changes
    useEffect(() => {
        if (showModal) {
            fetchAvailableSlots();
        }
    }, [showModal, fetchAvailableSlots]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedSalon) {
                alert('Please select a salon first');
                return;
            }
            const token = localStorage.getItem('token');
            const walkinData = {
                salonId: selectedSalon._id,
                clientName: formData.name,
                clientMobile: formData.phone,
                serviceId: formData.service,
                staffId: formData.staffId || null,
                price: Number(formData.price) || 0,
                date: formData.date,
                timeSlot: formData.timeSlot || null,
            };

            const response = await fetch('http://localhost:5050/walkins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(walkinData)
            });

            if (response.ok) {
                alert('Walk-in added successfully!');
                setShowModal(false);
                setFormData({ name: '', phone: '', service: 'Hair Cut', staffId: '', price: '', date: new Date().toISOString().split('T')[0], timeSlot: '' });
                fetchWalkins();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to add walk-in');
                // If error is about slot booking, refresh slots
                if (error.availableSlots) {
                    setAvailableSlots(error.availableSlots);
                }
            }
        } catch (error) {
            console.error("Error adding walk-in:", error);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5050/walkins/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                fetchWalkins();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this walk-in?")) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5050/walkins/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchWalkins();
            }
        } catch (error) {
            console.error("Error deleting walk-in:", error);
        }
    };

    const inQueue = walkins.filter(w => w.status === 'waiting' || w.status === 'in-service');
    const completedToday = walkins.filter(w => w.status === 'completed');

    return (
        <div className="min-h-screen bg-bg-light">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Walk-in Management</h1>
                        <p className="text-gray-500 mt-2">Manage walk-in customers and queues for {selectedSalon?.name || 'All Branches'}.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <FaUserPlus />
                        Add Walk-in
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <FaClock className="text-yellow-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">In Queue</p>
                                <p className="text-2xl font-bold text-gray-900">{inQueue.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaCheckCircle className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Completed Today</p>
                                <p className="text-2xl font-bold text-gray-900">{completedToday.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaClock className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg Wait Time</p>
                                <p className="text-2xl font-bold text-gray-900">15 min</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Queue */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Current Queue</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {inQueue.length === 0 ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No customers in queue</td></tr>
                                ) : (
                                    inQueue.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.clientName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.clientMobile}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.serviceId}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{item.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.status === 'waiting' ? 'Waiting' : 'In Service'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-3">
                                                    {item.status === 'waiting' ? (
                                                        <button
                                                            onClick={() => handleStatusUpdate(item._id, 'in-service')}
                                                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                                                        >Start</button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleStatusUpdate(item._id, 'completed')}
                                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                        >Complete</button>
                                                    )}
                                                    <button
                                                        onClick={() => handleStatusUpdate(item._id, 'cancelled')}
                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >Cancel</button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                                                    >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Walk-ins */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Recent Walk-ins</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {walkins.filter(w => w.status === 'completed' || w.status === 'cancelled').length === 0 ? (
                                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">No recent entries</td></tr>
                                ) : (
                                    walkins.filter(w => w.status === 'completed' || w.status === 'cancelled').map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.clientName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.serviceId}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{item.price}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.status === 'completed' ? 'Completed' : 'Cancelled'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

{/* Add Walk-in Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Walk-in Customer</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Customer name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                    <input
                                        type="text"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Service"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Price"
                                    />
                                </div>
                            </div>
                            
                            {/* Date and Time Slot Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time Slot {availableSlots.length > 0 && `(${availableSlots.length} available)`}
                                </label>
                                {loadingSlots ? (
                                    <div className="text-sm text-gray-500 py-2">Loading available slots...</div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                                        {TIME_SLOTS.map(slot => {
                                            const isAvailable = availableSlots.includes(slot);
                                            const isSelected = formData.timeSlot === slot;
                                            return (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => isAvailable && setFormData({...formData, timeSlot: slot})}
                                                    disabled={!isAvailable}
                                                    className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                                                        isSelected 
                                                            ? 'bg-primary text-white border-primary'
                                                            : isAvailable 
                                                                ? 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                                                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                {!loadingSlots && availableSlots.length === 0 && (
                                    <p className="text-sm text-yellow-600 mt-1">No available slots for this date</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stylist</label>
                                <select
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                                >
                                    <option value="">Select Stylist</option>
                                    {staff.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md font-semibold"
                                >
                                    Add to Queue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
