import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSave, FaClock, FaList, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import { Calendar, CalendarDayButton } from './ui/calendar';
import { cn } from '../lib/utils';
import { useSalon } from '../context/SalonContext';

const Attendance = () => {
    const { selectedSalon } = useSalon();
    const userRole = localStorage.getItem('role');

    const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'

    // Table View State
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);


    const canEdit = userRole === 'receptionist' || userRole === 'owner' || userRole === 'admin'; // Keeping admin for now just in case, but prompt said remove admin role from DB.


    // Calendar View State
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [monthlyAttendance, setMonthlyAttendance] = useState([]);
    const [calendarMonth, setCalendarMonth] = useState(new Date());

    useEffect(() => {
        if (selectedSalon) {
            if (viewMode === 'table') {
                fetchDailyAttendance();
            } else {
                fetchStaffList();
            }
        }
    }, [selectedSalon, selectedDate, viewMode]);

    useEffect(() => {
        if (viewMode === 'calendar' && selectedStaff && selectedSalon) {
            fetchMonthlyAttendance(selectedStaff, calendarMonth);
        }
    }, [selectedStaff, calendarMonth, viewMode, selectedSalon]);



    // --- API Calls ---

    const fetchDailyAttendance = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:5050/attendance/daily?salonId=${selectedSalon._id}&date=${selectedDate}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setAttendanceData(data);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStaffList = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5050/staff?salonId=${selectedSalon._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStaffList(data);
                // Default select first staff if none selected
                if (!selectedStaff && data.length > 0) {
                    setSelectedStaff(data[0]._id);
                }
            }
        } catch (error) {
            console.error("Error fetching staff list:", error);
        }
    };

    const fetchMonthlyAttendance = async (staffId, date) => {
        try {
            const token = localStorage.getItem('token');
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const response = await fetch(
                `http://localhost:5050/attendance/monthly?staffId=${staffId}&month=${month}&year=${year}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMonthlyAttendance(data);
            }
        } catch (error) {
            console.error("Error fetching monthly attendance:", error);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const token = localStorage.getItem('token');

            const updates = attendanceData.map(item => ({
                staffId: item.staff._id,
                status: item.attendance?.status || 'Absent',
                checkIn: item.attendance?.checkIn,
                checkOut: item.attendance?.checkOut,
                remarks: item.attendance?.remarks,
                leaveType: item.attendance?.leaveType
            }));

            const response = await fetch('http://localhost:5050/attendance/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    salonId: selectedSalon._id,
                    date: selectedDate,
                    updates
                })
            });

            if (response.ok) {
                alert('Attendance saved successfully!');
                fetchDailyAttendance();
            } else {
                alert('Failed to save attendance');
            }
        } catch (error) {
            console.error("Error saving attendance:", error);
            alert('Error saving attendance');
        } finally {
            setSaving(false);
        }
    };

    // --- Helper Functions ---

    const handleStatusChange = (index, value) => {
        const updated = [...attendanceData];
        if (!updated[index].attendance) updated[index].attendance = {};

        updated[index].attendance.status = value;

        if ((value === 'Present' || value === 'Half Day') && !updated[index].attendance.checkIn) {
            const now = new Date();
            updated[index].attendance.checkIn = now.toISOString();
        }

        setAttendanceData(updated);
    };

    const handleTimeChange = (index, field, value) => {
        const updated = [...attendanceData];
        if (!updated[index].attendance) updated[index].attendance = {};

        if (value) {
            const dateTime = new Date(`${selectedDate}T${value}`);
            updated[index].attendance[field] = dateTime.toISOString();
        } else {
            updated[index].attendance[field] = null;
        }
        setAttendanceData(updated);
    };

    const setNow = (index, field) => {
        const updated = [...attendanceData];
        if (!updated[index].attendance) updated[index].attendance = {};
        updated[index].attendance[field] = new Date().toISOString();
        setAttendanceData(updated);
    };

    const handleRemarksChange = (index, value) => {
        const updated = [...attendanceData];
        if (!updated[index].attendance) updated[index].attendance = {};
        updated[index].attendance.remarks = value;
        setAttendanceData(updated);
    };

    const getTimeString = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusForDate = (date) => {
        const ds = date.toISOString().split('T')[0];
        return monthlyAttendance.find(a => {
            const recordDate = new Date(a.date).toISOString().split('T')[0];
            return recordDate === ds;
        });
    };

    // Date navigation functions
    const decrementDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    const incrementDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    const isStatus = (date, status) => {
        const ds = date.toISOString().split('T')[0];
        return monthlyAttendance.some(a => {
            const recordDate = new Date(a.date).toISOString().split('T')[0];
            return recordDate === ds && a.status === status;
        });
    };


    return (
        <div className="p-2 md:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <FaList className="inline mr-2" /> Daily List
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <FaCalendarAlt className="inline mr-2" /> Monthly View
                        </button>
                    </div>

                    {viewMode === 'table' && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decrementDate}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                title="Previous Day"
                            >
                                <FaChevronLeft className="text-gray-600" />
                            </button>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                            <button
                                onClick={incrementDate}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                title="Next Day"
                            >
                                <FaChevronRight className="text-gray-600" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-medium">Loading attendance data...</div>
            ) : viewMode === 'table' ? (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-4">Staff</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Check In</th>
                                <th className="p-4">Check Out</th>
                                <th className="p-4">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceData.map((item, index) => (
                                <tr key={item.staff._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {item.staff.avatarUrl ? (
                                                <img src={item.staff.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                                                    {item.staff.name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">{item.staff.name}</p>
                                                <p className="text-xs text-gray-500">{item.staff.role} • {item.staff.profession}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={item.attendance?.status || 'Absent'}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                            disabled={!canEdit}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium focus:outline-none border shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
                                                ${(item.attendance?.status === 'Present') ? 'bg-green-50 text-green-700 border-green-200' :
                                                    (item.attendance?.status === 'Absent') ? 'bg-red-50 text-red-700 border-red-200' :
                                                        (item.attendance?.status === 'Half Day') ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Half Day">Half Day</option>
                                            <option value="Leave">Leave</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="time"
                                                value={getTimeString(item.attendance?.checkIn)}
                                                onChange={(e) => handleTimeChange(index, 'checkIn', e.target.value)}
                                                disabled={!canEdit || item.attendance?.status === 'Absent' || item.attendance?.status === 'Leave'}
                                                className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm disabled:bg-gray-100 disabled:opacity-50"
                                            />
                                            {canEdit && (
                                                <button
                                                    onClick={() => setNow(index, 'checkIn')}
                                                    disabled={item.attendance?.status === 'Absent' || item.attendance?.status === 'Leave'}
                                                    className="text-white bg-primary hover:bg-primary/90 px-2 py-1 text-xs rounded shadow-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                    title="Set to Now"
                                                >
                                                    Now
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="time"
                                                value={getTimeString(item.attendance?.checkOut)}
                                                onChange={(e) => handleTimeChange(index, 'checkOut', e.target.value)}
                                                disabled={!canEdit || item.attendance?.status === 'Absent' || item.attendance?.status === 'Leave'}
                                                className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm disabled:bg-gray-100 disabled:opacity-50"
                                            />
                                            {canEdit && (
                                                <button
                                                    onClick={() => setNow(index, 'checkOut')}
                                                    disabled={item.attendance?.status === 'Absent' || item.attendance?.status === 'Leave'}
                                                    className="text-white bg-primary hover:bg-primary/90 px-2 py-1 text-xs rounded shadow-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                    title="Set to Now"
                                                >
                                                    Now
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            placeholder="Add remark..."
                                            value={item.attendance?.remarks || ''}
                                            onChange={(e) => handleRemarksChange(index, e.target.value)}
                                            disabled={!canEdit}
                                            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm disabled:bg-gray-100"
                                        />
                                    </td>
                                </tr>
                            ))}
                            {attendanceData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 italic">No staff found for this salon.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br />
                    <hr />
                    <br />
                    {viewMode === 'table' && canEdit && (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="ml-auto flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            <FaSave />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
                </div>

            ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Step 2: Choose Stylist (copied style from BookAppointment) */}
                    <div className="p-4 sm:p-6 mt-4">
                        <label className="block text-lg font-bold text-gray-900 mb-6">
                            Step 1: Choose Stylist
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {staffList.length > 0 ? (
                                staffList.map((staff) => (
                                    <div
                                        key={staff._id}
                                        onClick={() => setSelectedStaff(staff._id)}
                                        className={cn(
                                            "flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all min-w-[140px] flex-1 sm:flex-none",
                                            selectedStaff === staff._id
                                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                                : "border-gray-100 hover:border-gray-300 hover:shadow-sm"
                                        )}
                                    >
                                        <img
                                            src={staff.avatarUrl || "https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp"}
                                            alt={staff.name}
                                            className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow-md transition-transform hover:scale-110"
                                        />
                                        <span className="text-base font-bold text-gray-800">{staff.name}</span>
                                        <span className="text-sm text-gray-500 font-medium">{staff.profession}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No staff available for this salon.</p>
                            )}
                        </div>
                    </div>

                    {/* Shadcn Calendar Card */}
                    {selectedStaff && (
                        <div className="p-4 sm:p-6 border-t border-gray-100 mt-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Monthly Attendance Calendar</h3>
                                    {/* <p className="text-gray-500">Select month to view full history</p> */}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-sm"></div><span className="text-xs font-medium">Present</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span className="text-xs font-medium">Absent</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div><span className="text-xs font-medium">Half Day</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div><span className="text-xs font-medium">Leave</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center border-t border-gray-50 pt-8">
                                <Calendar
                                    mode="single"
                                    month={calendarMonth}
                                    onMonthChange={setCalendarMonth}
                                    className="rounded-2xl sm:rounded-3xl border-none shadow-md w-full max-w-5xl bg-gray-50/50 p-2 sm:p-10 [--cell-size:2.8rem] sm:[--cell-size:5.5rem]"
                                    modifiers={{
                                        present: (date) => isStatus(date, 'Present'),
                                        absent: (date) => isStatus(date, 'Absent'),
                                        halfDay: (date) => isStatus(date, 'Half Day'),
                                        leave: (date) => isStatus(date, 'Leave')
                                    }}
                                    modifiersClassNames={{
                                        present: "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 font-bold shadow-sm",
                                        absent: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 font-bold shadow-sm",
                                        halfDay: "bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 font-bold shadow-sm",
                                        leave: "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 font-bold shadow-sm"
                                    }}
                                    components={{
                                        DayButton: (props) => {
                                            const { day } = props;
                                            const record = getStatusForDate(day.date);
                                            return (
                                                <CalendarDayButton {...props}>
                                                    <div className="flex flex-col items-center justify-center pt-0.5 sm:pt-1">
                                                        <span className="text-sm sm:text-lg">{day.date.getDate()}</span>
                                                        {record && (
                                                            <div className="flex flex-col items-center mt-0.5 sm:mt-1">
                                                                <span className="text-[7px] sm:text-[10px] font-black tracking-tighter uppercase leading-none px-0.5 sm:px-1 py-0.5 bg-black/10 rounded-sm">
                                                                    {record.status === 'Half Day' ? 'Half' : record.status}
                                                                </span>
                                                                <div className="hidden sm:block h-1" />
                                                                {record.checkIn && (record.status === 'Present' || record.status === 'Half Day') && (
                                                                    <div className="flex flex-col items-center leading-none mt-0.5">
                                                                        <span className="text-[6px] sm:text-[9px] font-bold opacity-90">
                                                                            <span className="hidden sm:inline text-white/70">In: </span>
                                                                            {new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                                        </span>
                                                                        {record.checkOut && (
                                                                            <span className="text-[6px] sm:text-[9px] font-bold opacity-90 mt-0.5">
                                                                                <span className="hidden sm:inline text-white/70">Out: </span>
                                                                                {new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </CalendarDayButton>
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Attendance;