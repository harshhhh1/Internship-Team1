import React from 'react';

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
    <div style={{ backgroundColor: '#ffeedd', padding: '12px', borderRadius: '12px' }}>{icon}</div>
  </div>
);

export default KpiCard;