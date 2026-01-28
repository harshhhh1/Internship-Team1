import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import KpiCard from '../../components/KpiCard';
import DonutChart from '../../components/DonutChart';
import LegendItem from '../../components/LegendItem';
import AppointmentRow from '../../components/AppointmentRow';
import CalendarWidget from '../../components/CalendarWidget';
import ScheduleItem from '../../components/ScheduleItem';

function Dashboard() {
  return (
  <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f7ff', fontFamily: 'sans-serif' }}>
      <AdminSidebar />
      
      <div style={{ flex: 1, padding: '30px', display: 'flex', gap: '30px', overflowY: 'auto' }}>
        
        {/* Left Column - Main Content */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header */}
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>Dashboard</h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Welcome back, here is your daily overview.</p>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <KpiCard 
              title="Total Earnings" 
              value="$24,500" 
              trend="+12.5%" 
              isPositive={true} 
              icon={<span style={{ fontSize: '24px' }}>💰</span>}
            />
            <KpiCard 
              title="Earnings Last Week" 
              value="$1,250" 
              trend="-2.4%" 
              isPositive={false} 
              icon={<span style={{ fontSize: '24px' }}>📉</span>}
            />
          </div>

          {/* Statistics Card */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>Age Group Distribution</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
              <DonutChart />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <LegendItem color="#9381ff" label="13–17 Years" value="25%" />
                <LegendItem color="#b8b8ff" label="18–29 Years" value="45%" />
                <LegendItem color="#ffd8be" label="30–45 Years" value="30%" />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Upcoming Appointments</h3>
              <button style={{ color: '#9381ff', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AppointmentRow name="Alice Freeman" time="10:00 AM" date="Today" type="Consultation" />
              <AppointmentRow name="Bob Smith" time="11:30 AM" date="Today" type="Check-up" />
              <AppointmentRow name="Charlie Brown" time="02:00 PM" date="Tomorrow" type="Follow-up" />
            </div>
          </div>

        </div>

        {/* Right Column - Calendar & Panel */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', height: '100%' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>Calendar</h3>
            <CalendarWidget />
            
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ffeedd' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule for Oct 27</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ScheduleItem time="09:00 AM" title="Team Meeting" color="#9381ff" />
                <ScheduleItem time="11:00 AM" title="Client Call" color="#b8b8ff" />
                <ScheduleItem time="02:00 PM" title="Project Review" color="#ffd8be" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard
