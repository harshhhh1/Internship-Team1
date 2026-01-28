import React from 'react';

const InfoField = ({ label, value, fullWidth }: { label: string, value: string, fullWidth?: boolean }) => (
  <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
    <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px', fontWeight: '500' }}>{label}</label>
    <div style={{ fontSize: '15px', color: '#111827', fontWeight: '500', padding: '10px 12px', backgroundColor: '#f8f7ff', borderRadius: '8px', border: '1px solid #ffeedd' }}>{value}</div>
  </div>
);

export default InfoField;