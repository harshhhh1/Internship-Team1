import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import InfoField from '../../components/InfoField';

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  email: string;
  avatar: string;
  diagnosis: string;
  notes: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  zipCode: string;
  memberStatus: string;
  registeredDate: string;
}

function DashboardProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchProfileData = async () => {
      try {
        // Replace this with actual API call
        // const response = await fetch('/api/patient/profile');
        // const data = await response.json();
        
        // Mock data
        const mockData: ProfileData = {
          id: '1',
          firstName: 'Marcus',
          lastName: 'Horizon',
          age: 24,
          phone: '+1 (555) 000-1234',
          email: 'marcus.h@example.com',
          avatar: 'https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp',
          diagnosis: 'Seasonal Allergies',
          notes: 'Patient reports mild symptoms during spring. Recommended daily antihistamine.',
          dob: 'June 12, 1999',
          gender: 'Male',
          address: '123 Health St, Wellness City',
          city: 'San Francisco',
          zipCode: '94103',
          memberStatus: 'Active Member',
          registeredDate: 'Jan 15, 2023'
        };

        setProfile(mockData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f7ff', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>Loading profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f7ff', fontFamily: 'sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Patient Profile</h1>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Column - Profile Card (40%) */}
          <div style={{ flex: '2', minWidth: '300px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Avatar */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#b8b8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '48px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span ><img role="img"  aria-label="avatar" src={profile.avatar} alt={`${profile.firstName}'s avatar`} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /></span>
            </div>

            {/* Name & Age */}
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px', textAlign: 'center' }}>{profile.firstName} {profile.lastName}</h2>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '20px', fontWeight: '500' }}>{profile.age} Years Old</p>

            {/* Mobile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', color: '#374151', backgroundColor: '#ffeedd', padding: '8px 16px', borderRadius: '9999px' }}>
              <span role="img" aria-label="phone">📞</span>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>{profile.phone}</span>
            </div>

            {/* Diagnosis */}
            <div style={{ width: '100%', marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>Diagnosed with</p>
              <div style={{ backgroundColor: '#ffeedd', color: '#9381ff', padding: '12px', borderRadius: '12px', fontWeight: '600', textAlign: 'center', border: '1px solid #ffd8be' }}>
                {profile.diagnosis}
              </div>
            </div>

            {/* Notes */}
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>Notes</p>
              <textarea 
                style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '12px', border: '1px solid #ffd8be', resize: 'none', fontSize: '14px', color: '#4b5563', backgroundColor: '#f8f7ff', outline: 'none', fontFamily: 'inherit' }}
                defaultValue={profile.notes}
              />
            </div>

          </div>

          {/* Right Column - Personal Information (60%) */}
          <div style={{ flex: '3', minWidth: '300px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px', borderBottom: '1px solid #ffeedd', paddingBottom: '16px' }}>Personal Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <InfoField label="First Name" value={profile.firstName} />
              <InfoField label="Last Name" value={profile.lastName} />
              <InfoField label="Email Address" value={profile.email} />
              <InfoField label="Phone" value={profile.phone} />
              <InfoField label="Date of Birth" value={profile.dob} />
              <InfoField label="Gender" value={profile.gender} />
              <InfoField label="Address" value={profile.address} fullWidth />
              <InfoField label="City" value={profile.city} />
              <InfoField label="Zip Code" value={profile.zipCode} />
              <InfoField label="Member Status" value={profile.memberStatus} />
              <InfoField label="Registered Date" value={profile.registeredDate} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardProfile;