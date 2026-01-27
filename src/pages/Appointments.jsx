import React from 'react';

const Appointments = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Client Name</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">Aarav Kumar</td>
              <td className="py-3 px-6">27 Jan 2026</td>
              <td className="py-3 px-6">Confirmed</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-6">2</td>
              <td className="py-3 px-6">Isha Patel</td>
              <td className="py-3 px-6">28 Jan 2026</td>
              <td className="py-3 px-6">Pending</td>
            </tr>
            <tr className="border-b">
    <td className="py-3 px-6">3</td>
    <td className="py-3 px-6">Rohan Mehta</td>
    <td className="py-3 px-6">29 Jan 2026</td>
    <td className="py-3 px-6">Confirmed</td>
  </tr>
  <tr className="border-b">
    <td className="py-3 px-6">4</td>
    <td className="py-3 px-6">Sneha Sharma</td>
    <td className="py-3 px-6">30 Jan 2026</td>
    <td className="py-3 px-6">Pending</td>
  </tr>
  <tr className="border-b">
    <td className="py-3 px-6">5</td>
    <td className="py-3 px-6">Vikram Singh</td>
    <td className="py-3 px-6">31 Jan 2026</td>
    <td className="py-3 px-6">Confirmed</td>
  </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;

