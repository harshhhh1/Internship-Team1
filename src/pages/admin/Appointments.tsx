import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';


function Appointments() {
      const appointments = [
    { id: 1, name: 'John Doe', date: '2023-10-27', note: 'Routine Checkup' },
    { id: 2, name: 'Jane Smith', date: '2023-10-28', note: 'Dental Cleaning' },
    { id: 3, name: 'Michael Johnson', date: '2023-10-29', note: 'Consultation' },
    { id: 4, name: 'Emily Davis', date: '2023-10-30', note: 'Follow-up' },
    { id: 5, name: 'David Wilson', date: '2023-10-31', note: 'Vaccination' },
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Appointments</h1>
        <p>View and manage scheduled appointments.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Appointment Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointments
