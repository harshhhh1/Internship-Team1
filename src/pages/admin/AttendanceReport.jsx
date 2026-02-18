
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useSalon } from '../../context/SalonContext';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaUser, FaCheck, FaTimes, FaCoffee } from 'react-icons/fa';

function AttendanceReport() {
    const [activeTab, setActiveTab] = useState('monthly');
    const { selectedSalon, setSelectedSalon } = useSalon();
    const [selectedStaff, setSelectedStaff] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    // Get month and year
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    useEffect(() => {
        fetchReport();
    }, [activeTab, selectedStaff, currentDate, selectedSalon]);

    const fetchReport = async () => {
        if (!selectedSalon) return;
        
        setLoading(true);
        try {
            let url = `http://localhost:5050/attendance/report/${activeTab}?salonId=${selectedSalon}`;
            
            if (activeTab === 'weekly') {
                url += `&weekStart=${currentDate.toISOString()}`;
            } else if (activeTab === 'monthly') {
                url += `&month=${month}&year=${year}`;
            } else if (activeTab === 'yearly') {
                url += `&year=${year}`;
            }
            
            if (selectedStaff) {
                url += `&staffId=${selectedStaff}`;
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReportData(data);
            }
        } catch (error) {
            console.error("Error fetching report:", error);
        }
        setLoading(false);
    };

    const handlePrevious = () => {
        const newDate = new Date(currentDate);
        if (activeTab === 'weekly') {
            newDate.setDate(newDate.getDate() - 7);
        } else if (activeTab === 'monthly') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (activeTab === 'yearly') {
            newDate.setFullYear(newDate.getFullYear() - 1);
        }
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        if (activeTab === 'weekly') {
            newDate.setDate(newDate.getDate() + 7);
        } else if (activeTab === 'monthly') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (activeTab === 'yearly') {
            newDate.setFullYear(newDate.getFullYear() + 1);
        }
        setCurrentDate(newDate);
    };

    const getDateRangeLabel = () => {
        if (activeTab === 'weekly') {
            const start = new Date(currentDate);
            start.setDate(start.getDate() - start.getDay() + 1);
            const end = new Date(start);
            end.setDate(end.getDate() + 6);
            return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        } else if (activeTab === 'monthly') {
            return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        } else if (activeTab === 'yearly') {
            return currentDate.getFullYear().toString();
        }
        return '';
    };

    // Render status badge
    const getStatusBadge = (status) => {
        const styles = {
            'Present': 'bg-green-100 text-green-800',
            'Absent': 'bg-red-100 text-red-800',
            'Half Day': 'bg-yellow-100 text-yellow-800',
            'Leave': 'bg-blue-100 text-blue-800'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    // Render calendar view for monthly
    const renderCalendarView = () => {
        if (!reportData || !reportData.calendarData) return null;
        
        const calendarData = reportData.calendarData;
        const summary = reportData.summary;
        
        // Get first day of month to calculate padding
        const firstDay = new Date(year, month - 1, 1).getDay();
        
        return (
            <div className="mt-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{summary?.present || 0}</div>
                        <div className="text-sm text-green-700">Present Days</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">{summary?.absent || 0}</div>
                        <div className="text-sm text-red-700">Absent Days</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{summary?.leave || 0}</div>
                        <div className="text-sm text-blue-700">Leave Days</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{summary?.halfDay || 0}</div>
                        <div className="text-sm text-yellow-700">Half Days</div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
                                {day}
                            </div>
                        ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7">
                        {/* Empty cells for days before first of month */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-20 border-t border-r border-gray-100 bg-gray-50"></div>
                        ))}
                        
                        {/* Actual days */}
                        {calendarData.map((day, index) => {
                            const hasRecords = day.records && day.records.length > 0;
                            const presentCount = day.records?.filter(r => r.status === 'Present').length || 0;
                            const absentCount = day.records?.filter(r => r.status === 'Absent').length || 0;
                            const leaveCount = day.records?.filter(r => r.status === 'Leave').length || 0;
                            
                            return (
                                <div key={index} className="h-20 border-t border-r border-gray-100 p-1">
                                    <div className="text-sm font-medium text-gray-700">{day.day}</div>
                                    {hasRecords && (
                                        <div className="mt-1 space-y-1">
                                            {presentCount > 0 && (
                                                <div className="text-xs text-green-600">P: {presentCount}</div>
                                            )}
                                            {absentCount > 0 && (
                                                <div className="text-xs text-red-600">A: {absentCount}</div>
                                            )}
                                            {leaveCount > 0 && (
                                                <div className="text-xs text-blue-600">L: {leaveCount}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    // Render monthly table view
    const renderMonthlyTable = () => {
        if (!reportData || !reportData.staffAttendance) return null;
        
        const staffAttendance = reportData.staffAttendance;
        
        return (
            <div className="mt-6">
                {/* Summary */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{reportData.summary?.totalPresent || 0}</div>
                        <div className="text-sm text-green-700">Total Present</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">{reportData.summary?.totalAbsent || 0}</div>
                        <div className="text-sm text-red-700">Total Absent</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{reportData.summary?.totalLeave || 0}</div>
                        <div className="text-sm text-blue-700">Total Leave</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{reportData.summary?.totalHalfDay || 0}</div>
                        <div className="text-sm text-yellow-700">Total Half Day</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Half Day</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {staffAttendance.map((staff, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                                {staff.staff?.name?.charAt(0) || '?'}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{staff.staff?.name || 'Unknown'}</div>
                                                <div className="text-sm text-gray-500">{staff.staff?.profession || ''}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-green-600 font-medium">{staff.present || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-red-600 font-medium">{staff.absent || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-blue-600 font-medium">{staff.leave || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-yellow-600 font-medium">{staff.halfDay || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {staff.total || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // Render weekly view
    const renderWeeklyView = () => {
        if (!reportData || !reportData.weekData) return null;
        
        const weekData = reportData.weekData;
        const summary = reportData.summary;
        
        return (
            <div className="mt-6">
                {/* Summary */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{summary?.totalPresent || 0}</div>
                        <div className="text-sm text-green-700">Present</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">{summary?.totalAbsent || 0}</div>
                        <div className="text-sm text-red-700">Absent</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{summary?.totalLeave || 0}</div>
                        <div className="text-sm text-blue-700">Leave</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{summary?.totalHalfDay || 0}</div>
                        <div className="text-sm text-yellow-700">Half Day</div>
                    </div>
                </div>

                {/* Week Grid */}
                <div className="grid grid-cols-7 gap-4">
                    {weekData.map((day, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4">
                            <div className="text-center mb-4">
                                <div className="text-sm font-medium text-gray-500">{day.day}</div>
                                <div className="text-lg font-bold text-gray-900">
                                    {new Date(day.date).getDate()}
                                </div>
                            </div>
                            <div className="space-y-2">
                                {day.records && day.records.length > 0 ? (
                                    day.records.map((record, i) => (
                                        <div key={i} className="text-xs p-2 rounded bg-gray-50">
                                            <div className="font-medium">{record.staffId?.name || 'Unknown'}</div>
                                            <div>{getStatusBadge(record.status)}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-400 text-center py-2">No records</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render yearly view
    const renderYearlyView = () => {
        if (!reportData || !reportData.monthlyData) return null;
        
        const monthlyData = reportData.monthlyData;
        const summary = reportData.summary;
        
        return (
            <div className="mt-6">
                {/* Summary */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{summary?.totalPresent || 0}</div>
                        <div className="text-sm text-green-700">Total Present</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">{summary?.totalAbsent || 0}</div>
                        <div className="text-sm text-red-700">Total Absent</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{summary?.totalLeave || 0}</div>
                        <div className="text-sm text-blue-700">Total Leave</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{summary?.totalHalfDay || 0}</div>
                        <div className="text-sm text-yellow-700">Total Half Day</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Half Day</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {monthlyData.map((month, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {month.month}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                                        {month.present}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">
                                        {month.absent}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                                        {month.leave}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-yellow-600 font-medium">
                                        {month.halfDay}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {month.total}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Report</h1>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Tabs */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {['weekly', 'monthly', 'yearly'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                        activeTab === tab 
                                            ? 'bg-white text-primary shadow' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Date Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevious}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <FaChevronLeft />
                            </button>
                            <span className="text-sm font-medium text-gray-700 min-w-[150px] text-center">
                                {getDateRangeLabel()}
                            </span>
                            <button
                                onClick={handleNext}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Report Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : !selectedSalon ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        Please select a salon from the dashboard to view attendance reports.
                    </div>
                ) : (
                    <>
                        {activeTab === 'weekly' && renderWeeklyView()}
                        {activeTab === 'monthly' && (selectedStaff ? renderMonthlyTable() : renderCalendarView())}
                        {activeTab === 'yearly' && renderYearlyView()}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}

export default AttendanceReport;

