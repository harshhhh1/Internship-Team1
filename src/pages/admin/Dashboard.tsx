import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';


function Dashboard() {
  return (
  <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
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
                <LegendItem color="#3b82f6" label="13–17 Years" value="25%" />
                <LegendItem color="#8b5cf6" label="18–29 Years" value="45%" />
                <LegendItem color="#10b981" label="30–45 Years" value="30%" />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Upcoming Appointments</h3>
              <button style={{ color: '#3b82f6', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
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
            
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule for Oct 27</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ScheduleItem time="09:00 AM" title="Team Meeting" color="#3b82f6" />
                <ScheduleItem time="11:00 AM" title="Client Call" color="#10b981" />
                <ScheduleItem time="02:00 PM" title="Project Review" color="#f59e0b" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const KpiCard = ({ title, value, trend, isPositive, icon }: any) => (
  <div style={{ flex: 1, minWidth: '240px', backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div>
      <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{title}</p>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{value}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ backgroundColor: isPositive ? '#ecfdf5' : '#fef2f2', color: isPositive ? '#059669' : '#dc2626', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>{trend}</span>
        <span style={{ color: '#9ca3af', fontSize: '12px' }}>vs last month</span>
      </div>
    </div>
    <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '12px' }}>{icon}</div>
  </div>
);

const DonutChart = () => (
  <div style={{ position: 'relative', width: '160px', height: '160px' }}>
    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="3" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="30, 100" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="45, 100" strokeDashoffset="-30" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-75" />
    </svg>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}><span style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>100%</span></div>
  </div>
);

const LegendItem = ({ color, label, value }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }}></div>
    <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>{label}</span><span style={{ fontSize: '12px', color: '#9ca3af' }}>{value} users</span></div>
  </div>
);

const AppointmentRow = ({ name, time, date, type }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#4b5563' }}>{name.charAt(0)}</div>
      <div><p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{name}</p><p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{type}</p></div>
    </div>
    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>{time}</p><p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{date}</p></div>
  </div>
);

const CalendarWidget = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontWeight: '600', color: '#374151' }}>October 2023</span>
        <div style={{ display: 'flex', gap: '8px' }}><span style={{ cursor: 'pointer', color: '#9ca3af' }}>&lt;</span><span style={{ cursor: 'pointer', color: '#9ca3af' }}>&gt;</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
        {days.map(d => <div key={d} style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>{d}</div>)}
        {Array.from({ length: 2 }).map((_, i) => <div key={`empty-${i}`} />)}
        {dates.map(date => (
          <div key={date} style={{ fontSize: '13px', padding: '6px', borderRadius: '8px', cursor: 'pointer', backgroundColor: date === 27 ? '#3b82f6' : 'transparent', color: date === 27 ? 'white' : '#374151', fontWeight: date === 27 ? '600' : '400' }}>{date}</div>
        ))}
      </div>
    </div>
  );
};

const ScheduleItem = ({ time, title, color }: any) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
    <div style={{ fontSize: '12px', color: '#6b7280', minWidth: '60px', paddingTop: '2px' }}>{time}</div>
    <div style={{ padding: '8px 12px', backgroundColor: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: '4px', flex: 1 }}>
      <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: 0 }}>{title}</p>
    </div>
  </div>
  )

export default Dashboard
