import React, { useState, useEffect } from 'react';
import { FaSave, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

function AvailabilityManager({ staffList, selectedSalon }) {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [availability, setAvailability] = useState({
        monday: { enabled: true, slots: [] },
        tuesday: { enabled: true, slots: [] },
        wednesday: { enabled: true, slots: [] },
        thursday: { enabled: true, slots: [] },
        friday: { enabled: true, slots: [] },
        saturday: { enabled: true, slots: [] },
        sunday: { enabled: false, slots: [] }
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // All available time slots
    const allTimeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00"
    ];

    const days = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    // Fetch availability when staff is selected
    useEffect(() => {
        if (selectedStaff) {
            fetchAvailability(selectedStaff._id);
        }
    }, [selectedStaff]);

    const fetchAvailability = async (staffId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Updated to use correct endpoint: /availability/:staffId
            const response = await fetch(`http://localhost:5050/availability/${staffId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.availability) {
                    setAvailability(data.availability);
                }
            }
        } catch (error) {
            console.error("Error fetching availability:", error);
        }
        setLoading(false);
    };

    const handleDayToggle = (day) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled
            }
        }));
    };

    const handleSlotToggle = (day, slot) => {
        setAvailability(prev => {
            const currentSlots = prev[day].slots || [];
            const newSlots = currentSlots.includes(slot)
                ? currentSlots.filter(s => s !== slot)
                : [...currentSlots, slot];
            
            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    slots: newSlots
                }
            };
        });
    };

    const handleSelectAllSlots = (day) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: [...allTimeSlots]
            }
        }));
    };

    const handleClearAllSlots = (day) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: []
            }
        }));
    };

    const handleSave = async () => {
        if (!selectedStaff) return;
        
        setSaving(true);
        setMessage(null);
        
        try {
            const token = localStorage.getItem('token');
            // Updated to use correct endpoint: /availability (POST)
            const response = await fetch('http://localhost:5050/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    staffId: selectedStaff._id,
                    availability
                })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Availability saved successfully!' });
                setTimeout(() => setMessage(null), 3000);
            } else {
                const data = await response.json();
                setMessage({ type: 'error', text: data.message || 'Failed to save availability' });
            }
        } catch (error) {
            console.error("Error saving availability:", error);
            setMessage({ type: 'error', text: 'Error saving availability' });
        }
        setSaving(false);
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Staff Availability Management</h2>
                <p className="text-gray-500">Set working days and time slots for each staff member.</p>
            </div>

            {/* Staff Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Staff Member</label>
                <select
                    value={selectedStaff?._id || ''}
                    onChange={(e) => {
                        const staff = staffList.find(s => s._id === e.target.value);
                        setSelectedStaff(staff || null);
                    }}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                    <option value="">-- Select a staff member --</option>
                    {staffList.map(staff => (
                        <option key={staff._id} value={staff._id}>
                            {staff.name} - {staff.profession}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : selectedStaff ? (
                <div>
                    {/* Days Grid */}
                    <div className="grid gap-4">
                        {days.map(day => (
                            <div 
                                key={day.key} 
                                className={`border rounded-lg p-4 ${availability[day.key].enabled ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={availability[day.key].enabled}
                                                onChange={() => handleDayToggle(day.key)}
                                                className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            />
                                            <span className="ml-2 font-medium text-gray-900">{day.label}</span>
                                        </label>
                                    </div>
                                    {availability[day.key].enabled && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleSelectAllSlots(day.key)}
                                                className="text-xs text-primary hover:underline"
                                            >
                                                Select All
                                            </button>
                                            <span className="text-gray-300">|</span>
                                            <button
                                                onClick={() => handleClearAllSlots(day.key)}
                                                className="text-xs text-gray-500 hover:underline"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {availability[day.key].enabled && (
                                    <div>
                                        <div className="text-xs text-gray-500 mb-2">
                                            <FaClock className="inline mr-1" />
                                            {availability[day.key].slots.length} slots selected
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {allTimeSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => handleSlotToggle(day.key, slot)}
                                                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                                        availability[day.key].slots.includes(slot)
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!availability[day.key].enabled && (
                                    <div className="text-sm text-gray-400">
                                        <FaTimes className="inline mr-1" />
                                        Day off
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all ${
                                saving ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <FaSave />
                            {saving ? 'Saving...' : 'Save Availability'}
                        </button>
                        
                        {message && (
                            <span className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    Please select a staff member to manage their availability
                </div>
            )}
        </div>
    );
}

export default AvailabilityManager;

