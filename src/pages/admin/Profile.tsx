import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

function DashboardProfile() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Patient Profile</h1>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Column - Profile Card (40%) */}
          <div style={{ flex: '2', minWidth: '300px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Avatar */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '48px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span ><img role="img"  aria-label="avatar" src="https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp" alt="" /></span>
            </div>

            {/* Name & Age */}
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px', textAlign: 'center' }}>Marcus Horizon</h2>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '20px', fontWeight: '500' }}>24 Years Old</p>

            {/* Mobile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', color: '#374151', backgroundColor: '#f9fafb', padding: '8px 16px', borderRadius: '9999px' }}>
              <span role="img" aria-label="phone">📞</span>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>+1 (555) 000-1234</span>
            </div>

            {/* Diagnosis */}
            <div style={{ width: '100%', marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>Diagnosed with</p>
              <div style={{ backgroundColor: '#fff7ed', color: '#b45309', padding: '12px', borderRadius: '12px', fontWeight: '600', textAlign: 'center', border: '1px solid #ffedd5' }}>
                Seasonal Allergies
              </div>
            </div>

            {/* Notes */}
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>Notes</p>
              <textarea 
                style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', resize: 'none', fontSize: '14px', color: '#4b5563', backgroundColor: '#f9fafb', outline: 'none', fontFamily: 'inherit' }}
                defaultValue="Patient reports mild symptoms during spring. Recommended daily antihistamine."
              />
            </div>

          </div>

          {/* Right Column - Personal Information (60%) */}
          <div style={{ flex: '3', minWidth: '300px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>Personal Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <InfoField label="First Name" value="Marcus" />
              <InfoField label="Last Name" value="Horizon" />
              <InfoField label="Email Address" value="marcus.h@example.com" />
              <InfoField label="Phone" value="+1 (555) 000-1234" />
              <InfoField label="Date of Birth" value="June 12, 1999" />
              <InfoField label="Gender" value="Male" />
              <InfoField label="Address" value="123 Health St, Wellness City" fullWidth />
              <InfoField label="City" value="San Francisco" />
              <InfoField label="Zip Code" value="94103" />
              <InfoField label="Member Status" value="Active Member" />
              <InfoField label="Registered Date" value="Jan 15, 2023" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const InfoField = ({ label, value, fullWidth }: { label: string, value: string, fullWidth?: boolean }) => (
  <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
    <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px', fontWeight: '500' }}>{label}</label>
    <div style={{ fontSize: '15px', color: '#111827', fontWeight: '500', padding: '10px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #f3f4f6' }}>{value}</div>
  </div>
);

export default DashboardProfile;