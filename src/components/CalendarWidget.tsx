import React from 'react';

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
          <div key={date} style={{ fontSize: '13px', padding: '6px', borderRadius: '8px', cursor: 'pointer', backgroundColor: date === 27 ? '#9381ff' : 'transparent', color: date === 27 ? 'white' : '#374151', fontWeight: date === 27 ? '600' : '400' }}>{date}</div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;