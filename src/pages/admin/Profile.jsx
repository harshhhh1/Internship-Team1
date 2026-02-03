import React, { useState, useEffect } from 'react';
import InfoField from '../../components/InfoField';

function DashboardProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        let userData = {};

        if (userId) {
          const response = await fetch(`http://localhost:5050/profile/${userId}`);
          if (response.ok) {
            userData = await response.json();
          }
        }

        // Mock data for fields not yet in backend
        const mockData = {
          id: userData._id || '1',
          firstName: userData.username || 'Marcus', // Fallback to Marcus if no username or just map username
          lastName: '', // Backend doesn't have last name yet
          role: (userData.role || 'Staff').charAt(0).toUpperCase() + (userData.role || 'Staff').slice(1), // Capitalize role
          age: 24,
          phone: '+1 (555) 000-1234',
          email: userData.email || 'marcus.h@example.com',
          avatar: 'https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp',
          diagnosis: 'Seasonal Allergies',
          notes: 'Patient reports mild symptoms during spring. Recommended daily antihistamine.',
          dob: 'June 12, 1999',
          gender: 'Male',
          address: '123 Health St, Wellness City',
          city: 'San Francisco',
          zipCode: '94103',
          memberStatus: 'Active Member',
          registeredDate: userData.registeredAt ? new Date(userData.registeredAt).toLocaleDateString() : 'Jan 15, 2023'
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
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Patient Profile</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Column - Profile Card (40%) */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">

            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-sm overflow-hidden ring-4 ring-accent-cream">
              <img src={profile.avatar} alt={`${profile.firstName}'s avatar`} className="w-full h-full object-cover" />
            </div>

            {/* Name & Age */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-500 font-medium mb-6">{profile.age} Years Old</p>

            {/* Mobile */}
            <div className="flex items-center gap-3 mb-8 text-gray-700 bg-accent-cream/50 px-5 py-2 rounded-full">
              <span role="img" aria-label="phone">📞</span>
              <span className="font-semibold text-sm">{profile.phone}</span>
            </div>

            {/* Diagnosis */}
            <div className="w-full mb-6">
              <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Diagnosed with</p>
              <div className="bg-accent-cream text-primary p-3 rounded-xl font-semibold text-center border border-accent-peach">
                {profile.diagnosis}
              </div>
            </div>

            {/* Notes */}
            <div className="w-full">
              <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Notes</p>
              <textarea
                className="w-full h-32 p-3 rounded-xl border border-accent-peach/50 resize-none text-sm text-gray-600 bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                defaultValue={profile.notes}
              />
            </div>

          </div>

          {/* Right Column - Personal Information (60%) */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="First Name" value={profile.firstName} />
              <InfoField label="Last Name" value={profile.lastName} />
              <InfoField label="Role" value={profile.role} /> {/* Added Role Field */}
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