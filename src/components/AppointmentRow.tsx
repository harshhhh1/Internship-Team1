import React from 'react';

const AppointmentRow = ({ name, time, date, type }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #ffeedd' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffeedd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#4b5563' }}>{name.charAt(0)}</div>
      <div><p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{name}</p><p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{type}</p></div>
    </div>
    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>{time}</p><p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{date}</p></div>
  </div>
);

export default AppointmentRow;