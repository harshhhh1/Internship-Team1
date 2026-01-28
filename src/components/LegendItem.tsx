import React from 'react';

const LegendItem = ({ color, label, value }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }}></div>
    <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>{label}</span><span style={{ fontSize: '12px', color: '#9ca3af' }}>{value} users</span></div>
  </div>
);

export default LegendItem;