import React from 'react';
import KpiCard from '../../components/KpiCard';
import Chart from '../../components/Chart';
import LegendItem from '../../components/LegendItem';
import AppointmentRow from '../../components/AppointmentRow';
import CalendarWidget from '../../components/Calendar';
import ScheduleItem from '../../components/ScheduleItem';

function Dashboard() {
  return (
    <div className="flex gap-8 overflow-y-auto">

      {/* Left Column - Main Content */}
      <div className="flex-[2] flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, here is your daily overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KpiCard
            title="Total Earnings"
            value="$24,500"
            trend="+12.5%"
            isPositive={true}
            icon={<span className="text-2xl">💰</span>}
          />
          <KpiCard
            title="Earnings Last Week"
            value="$1,250"
            trend="-2.4%"
            isPositive={false}
            icon={<span className="text-2xl">📉</span>}
          />
        </div>

        {/* Statistics Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Age Group Distribution</h3>
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <button className="text-primary font-medium text-sm hover:text-secondary transition-colors">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            <AppointmentRow name="Alice Freeman" time="10:00 AM" date="Today" type="Consultation" />
            <AppointmentRow name="Bob Smith" time="11:30 AM" date="Today" type="Check-up" />
            <AppointmentRow name="Charlie Brown" time="02:00 PM" date="Tomorrow" type="Follow-up" />
          </div>
        </div>

      </div>

      {/* Right Column - Calendar & Panel */}
      <div className="flex-1 min-w-[300px] flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">Calendar</h3>
          <CalendarWidget />

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

export default Dashboard
