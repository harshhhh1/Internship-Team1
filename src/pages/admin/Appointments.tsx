import React, { useState } from 'react';


function Appointments() {
  const [showModal, setShowModal] = useState(false);

  const appointments = [
    { id: 1, name: 'John Doe', date: '2023-10-27', note: 'Routine Checkup' },
    { id: 2, name: 'Jane Smith', date: '2023-10-28', note: 'Dental Cleaning' },
    { id: 3, name: 'Michael Johnson', date: '2023-10-29', note: 'Consultation' },
    { id: 4, name: 'Emily Davis', date: '2023-10-30', note: 'Follow-up' },
    { id: 5, name: 'David Wilson', date: '2023-10-31', note: 'Vaccination' },
  ];

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-500">View and manage scheduled appointments.</p>
          </div>
          <button
            className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setShowModal(true)}
          >
            + Create New Appointment
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Appointment Date</th>
                <th className="p-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-700">#{appointment.id}</td>
                  <td className="p-4 font-medium text-gray-900">{appointment.name}</td>
                  <td className="p-4 text-gray-600">{appointment.date}</td>
                  <td className="p-4 text-gray-600">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {appointment.note}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Create New Appointment</h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white">
                    <option value="">Select type</option>
                    <option value="checkup">Routine Checkup</option>
                    <option value="consultation">Consultation</option>
                    <option value="followup">Follow-up</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="dental">Dental Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => {
                  // Handle save logic here
                  setShowModal(false);
                }}
              >
                Save
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments
