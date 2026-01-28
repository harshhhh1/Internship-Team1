import React from 'react';

const DonutChart = () => (
  <div style={{ position: 'relative', width: '160px', height: '160px' }}>
    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffeedd" strokeWidth="3" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffd8be" strokeWidth="3" strokeDasharray="30, 100" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#b8b8ff" strokeWidth="3" strokeDasharray="45, 100" strokeDashoffset="-30" />
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#9381ff" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-75" />
    </svg>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}><span style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>100%</span></div>
  </div>
);

export default DonutChart;