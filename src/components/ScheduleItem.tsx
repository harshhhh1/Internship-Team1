import React from 'react';

const ScheduleItem = ({ time, title, color }: any) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
    <div style={{ fontSize: '12px', color: '#6b7280', minWidth: '60px', paddingTop: '2px' }}>{time}</div>
    <div style={{ padding: '8px 12px', backgroundColor: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: '4px', flex: 1 }}>
      <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: 0 }}>{title}</p>
    </div>
  </div>
);

export default ScheduleItem;