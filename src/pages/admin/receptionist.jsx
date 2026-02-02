import React from 'react'
import { useState } from 'react';
import CalendarWidget from '../../components/Calendar';

function Receptionist() {
  const [showNewPatientPopup, setShowNewPatientPopup] = useState(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const appointments = [
    { id: 1, time: "09:30", name: "Amit Sharma", gender: "Male", age: 28, reason: "General Checkup", doctor: "Dr. Mehta", status: "checked" },
    { id: 2, time: "09:45", name: "Shravani Chavan", gender: "Female", age: 21, reason: "General Checkup", doctor: "Dr. Mehta", status: "checked" },
    { id: 3, time: "10:00", name: "Rohit Vishwakarma", gender: "Male", age: 21, reason: "General Checkup", doctor: "Dr. Mehta", status: "checked" },
    { id: 4, time: "10:15", name: "Ajay Bhalerao", gender: "Male", age: 24, reason: "General Checkup", doctor: "Dr. Mehta", status: "checked" },
    { id: 5, time: "10:30", name: "Harsh Patil", gender: "Male", age: 22, reason: "General Checkup", doctor: "Dr. Mehta", status: "checked" },
    { id: 6, time: "10:45", name: "Neha Verma", gender: "Female", age: 32, reason: "Consultation", doctor: "Dr. Singh", status: "waiting" },
    { id: 7, time: "11:00", name: "Rahul Patil", gender: "Male", age: 45, reason: "Follow-up", doctor: "Dr. Joshi", status: "completed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked': return 'bg-blue-100 text-blue-700';
      case 'waiting': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'checked': return 'Checked In';
      case 'waiting': return 'Waiting';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Today's Appointments</h1>
        <p className="text-gray-500">Wed, Jan 29, 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                  <th className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  <th className="p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">{appointment.time}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{appointment.name}</span>
                        <span className="text-xs text-gray-500">{appointment.gender} • {appointment.age}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{appointment.reason}</td>
                    <td className="p-4 text-sm text-gray-600">{appointment.doctor}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <CalendarWidget />
          </div>

          {/* Action Buttons */}
          <button
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setShowNewPatientPopup(true)}
          >
            + New Patient Registration
          </button>

          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setShowEmergencyPopup(true)}
          >
            🚨 Emergency Entry
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {(showNewPatientPopup || showEmergencyPopup) && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-down">
            {/* Popup Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {showNewPatientPopup ? "New Patient Registration" : "Emergency Entry"}
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                &times;
              </button>
            </div>

            {/* Popup Body */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                {showNewPatientPopup && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        placeholder="Enter age"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                      <input
                        type="text"
                        placeholder="Reason for visit"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </>
                )}

                {showEmergencyPopup && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                      <input
                        type="text"
                        placeholder="Describe emergency"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white">
                        <option>Dr. Mehta</option>
                        <option>Dr. Singh</option>
                        <option>Dr. Joshi</option>
                      </select>
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Popup Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                Save
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
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

export default Receptionist
