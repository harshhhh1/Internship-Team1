import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const RevenueAndReport = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f7ff] font-sans">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-[30px] font-bold mb-7 text-[#111827]">Report & Revenue</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mb-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl p-5.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-[28px] my-2 font-bold text-[#111827]">$120,000</h2>
            <span className="text-green-600 text-[13px] font-medium">+12% from last month</span>
            
            <div className="flex gap-1.5 items-end mt-3.5 h-15">
              {[40, 70, 50, 90, 60, 80].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-linear-to-b from-indigo-600 to-indigo-500 rounded-md transition-transform duration-300 group-hover:scale-y-110"></div>
              ))}
            </div>
          </div>

           {/* Card 2 */}
           <div className="group bg-white rounded-2xl p-5.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
            <p className="text-gray-500 text-sm">Active Patients</p>
            <h2 className="text-[28px] my-2 font-bold text-[#111827]">1,240</h2>
            <span className="text-green-600 text-[13px] font-medium">+5% new patients</span>
            
            <div className="flex gap-1.5 items-end mt-3.5 h-15">
              {[30, 50, 40, 70, 50, 60].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-linear-to-b from-indigo-600 to-indigo-500 rounded-md transition-transform duration-300 group-hover:scale-y-110"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="my-8 flex gap-4">
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="px-4 py-3 rounded-[10px] border border-gray-300 bg-white transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-[#6366f133] w-64 text-gray-700"
          />
          <select className="px-4 py-3 rounded-[10px] border border-gray-300 bg-white transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-[#6366f133] text-gray-700">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[18px] p-6.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4.5 text-xl font-bold text-[#111827]">Financial Overview</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-center text-xs text-gray-500 pb-3 border border-gray-200">ID</th>
                <th className="text-center text-xs text-gray-500 pb-3 border border-gray-200">Patient</th>
                <th className="text-center text-xs text-gray-500 pb-3 border border-gray-200">Date</th>
                <th className="text-center text-xs text-gray-500 pb-3 border border-gray-200">Amount</th>
                <th className="text-center text-xs text-gray-500 pb-3 border border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#1001', name: 'Alice Freeman', date: 'Oct 24, 2023', amount: '$150.00', status: 'Active' },
                { id: '#1002', name: 'Bob Smith', date: 'Oct 23, 2023', amount: '$200.00', status: 'On Leave' },
                { id: '#1003', name: 'Charlie Brown', date: 'Oct 22, 2023', amount: '$75.00', status: 'Inactive' },
                { id: '#1004', name: 'David Green', date: 'Oct 21, 2023', amount: '$300.00', status: 'Active' },
              ].map((row, index) => (
                <tr key={index} className="transition-all duration-200 hover:bg-gray-50 hover:scale-[1.01]">
                  <td className="py-3.5 text-sm border border-gray-200 text-center text-gray-700">{row.id}</td>
                  <td className="py-3.5 text-sm border border-gray-200 text-center text-gray-700">{row.name}</td>
                  <td className="py-3.5 text-sm border border-gray-200 text-center text-gray-700">{row.date}</td>
                  <td className="py-3.5 text-sm border border-gray-200 text-center text-gray-700">{row.amount}</td>
                  <td className="py-3.5 text-sm border border-gray-200 text-center">
                    <span className={`font-semibold ${
                      row.status === 'Active' ? 'text-green-600' : 
                      row.status === 'On Leave' ? 'text-amber-500' : 'text-red-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndReport;