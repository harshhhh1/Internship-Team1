import React, { useState, useEffect } from 'react';
import KpiCard from '../../components/KpiCard';
import Chart from '../../components/Chart';
import LegendItem from '../../components/LegendItem';
import AppointmentRow from '../../components/AppointmentRow';
import CalendarWidget from '../../components/Calendar';
import ScheduleItem from '../../components/ScheduleItem';
import { useSalon } from '../../context/SalonContext';

function Dashboard() {
  const { selectedSalon } = useSalon();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
          const filteredData = selectedSalon
            ? data.filter(app => app.salonId?._id === selectedSalon._id || app.salonId === selectedSalon._id)
            : data;

          setAppointments(filteredData);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [selectedSalon]);
  return (
    // 'flex-col' for Mobile (stacks vertically), 'lg:flex-row' for Desktop (side-by-side)
    <div className="flex flex-col lg:flex-row gap-8 overflow-y-auto">

      {/* Left Column - Main Content */}
      {/* On Mobile, this block appears first. On Desktop, it takes up 2/3 space. */}
      <div className="flex-2 flex flex-col gap-6 w-full">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, here is your daily overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KpiCard
            title="Total Earnings"
            value="₹24,500"
            trend="+12.5%"
            isPositive={true}
            icon={<span className="text-2xl">💰</span>}
          />
          <KpiCard
            title="Earnings Last Week"
            value="₹1,250"
            trend="-2.4%"
            isPositive={false}
            icon={<span className="text-2xl">📉</span>}
          />
        </div>

        {/* Statistics Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Age Group</h3>
          <div className="flex items-center justify-around flex-wrap gap-5">
            <Chart />
            <div className="flex flex-col gap-3">
              <LegendItem color="var(--primary)" label="13–17 Years" value="25%" />
              <LegendItem color="var(--secondary)" label="18–29 Years" value="45%" />
              <LegendItem color="var(--accent-peach)" label="30–45 Years" value="30%" />
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {/* This is the last item in the Left Column, so on mobile, the Calendar (next div) will appear right after this. */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate ? `Appointments for ${selectedDate.toLocaleDateString()}` : 'Upcoming Appointments'}
            </h3>
            {selectedDate ? (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Clear
              </button>
            ) : (
              <button className="text-primary font-medium text-sm hover:text-secondary transition-colors">View All</button>
            )}
          </div>
          <div className="flex flex-col gap-4 min-w-75">
            {appointments
              .filter(app => {
                if (!selectedDate) return true; // Show all (or strictly limit to upcoming) if no date selected
                return new Date(app.date).toDateString() === selectedDate.toDateString();
              })
              .slice(0, selectedDate ? 50 : 5) // Show more if filtered, else limit to 5
              .map(app => (
                <AppointmentRow
                  key={app._id}
                  name={app.clientName}
                  time={app.time ? new Date(`1970-01-01T${app.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                  date={new Date(app.date).toLocaleDateString()}
                  type={app.serviceId?.name || 'Service'}
                />
              ))}
            {appointments.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No appointments found.</p>
            )}
          </div>
        </div>

      </div>

      {/* Right Column - Calendar & Panel */}
      {/* On Mobile, this block stacks naturally below the Left Column. */}
      <div className="flex-1 w-full lg:min-w-75 flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">Calendar</h3>
          <CalendarWidget
            appointments={appointments}
            onDateClick={setSelectedDate}
            selectedDate={selectedDate}
          />

          <div className="mt-8 pt-5 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Schedule for Oct 27</h4>
            <div className="flex flex-col gap-4">
              <ScheduleItem time="09:00 AM" title="Team Meeting" color="var(--primary)" />
              <ScheduleItem time="11:00 AM" title="Client Call" color="var(--secondary)" />
              <ScheduleItem time="02:00 PM" title="Project Review" color="var(--accent-peach)" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;