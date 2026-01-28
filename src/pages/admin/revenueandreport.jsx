import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';

const RevenueReport = () => {
  const doctors = [
    { id: 1, name: "Dr. Rahul Sharma", status: "Active", cases: 320, salary: "₹12,00,000" },
    { id: 2, name: "Dr. Anjali Mehta", status: "On Leave", cases: 210, salary: "₹9,50,000" },
    { id: 3, name: "Dr. Aman Verma", status: "Inactive", cases: 180, salary: "₹8,20,000" },
    { id: 4, name: "Dr. Sneha Patil", status: "Active", cases: 402, salary: "₹14,00,000" },
    { id: 5, name: "Dr. Rakesh Nair", status: "Active", cases: 298, salary: "₹11,80,000" },
    { id: 6, name: "Dr. Pooja Singh", status: "On Leave", cases: 165, salary: "₹7,90,000" },
    { id: 7, name: "Dr. Arjun Kapoor", status: "Active", cases: 510, salary: "₹18,00,000" },
    { id: 8, name: "Dr. Kavita Joshi", status: "Inactive", cases: 120, salary: "₹6,40,000" },
    { id: 9, name: "Dr. Mohit Jain", status: "Active", cases: 356, salary: "₹13,50,000" },
    { id: 10, name: "Dr. Neha Kulkarni", status: "Active", cases: 289, salary: "₹10,20,000" },
    { id: 11, name: "Dr. Sameer Khan", status: "On Leave", cases: 198, salary: "₹8,90,000" },
  ];

  const data1 = [
    { name: 'Aug 23', value: 30 },
    { name: 'Sep 23', value: 50 },
    { name: 'Oct 23', value: 45 },
    { name: 'Nov 23', value: 60 },
    { name: 'Dec 23', value: 55 },
    { name: 'Jan 24', value: 70 },
    { name: 'Feb 24', value: 65 }
  ];

  const data2 = [
    { name: 'Aug 23', value: 40 },
    { name: 'Sep 23', value: 35 },
    { name: 'Oct 23', value: 55 },
    { name: 'Nov 23', value: 65 },
    { name: 'Dec 23', value: 60 },
    { name: 'Jan 24', value: 75 },
    { name: 'Feb 24', value: 80 }
  ];

  const data3 = [
    { name: 'Aug 23', value: 20 },
    { name: 'Sep 23', value: 30 },
    { name: 'Oct 23', value: 40 },
    { name: 'Nov 23', value: 35 },
    { name: 'Dec 23', value: 50 },
    { name: 'Jan 24', value: 45 },
    { name: 'Feb 24', value: 60 }
  ];

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Revenue & Report</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Revenue This Month" value="₹5,00,000" trend="↑ 12%" data={data1} color="#9381ff" />
          <StatCard title="Total Income" value="₹12,50,000" trend="↑ 8%" data={data2} color="#b8b8ff" />
          <StatCard title="Patients" value="11,000" trend="↑ 4%" data={data3} color="#ffd8be" />
        </div>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center">
          <input
            className="flex-1 min-w-[300px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            placeholder="Search doctor..."
          />
          <div className="flex items-center gap-2">
            <input
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm w-44"
              type="date"
              placeholder="From date"
            />
            <span className="text-gray-400">—</span>
            <input
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm w-44"
              type="date"
              placeholder="To date"
            />
          </div>
          <select className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-white w-40">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="p-6 text-xl font-bold text-gray-900 border-b border-gray-100">Doctor List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-sm font-semibold text-gray-500 uppercase">
                  <th className="p-4 border-b border-gray-100">Sr No</th>
                  <th className="p-4 border-b border-gray-100">Name</th>
                  <th className="p-4 border-b border-gray-100">Status</th>
                  <th className="p-4 border-b border-gray-100">Total Cases</th>
                  <th className="p-4 border-b border-gray-100">Annual Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-700">{d.id}</td>
                    <td className="p-4 font-medium text-gray-900">{d.name}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                        ${d.status === 'Active' ? 'bg-green-100 text-green-700' :
                          d.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{d.cases}</td>
                    <td className="p-4 text-gray-700 font-mono">{d.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}

function StatCard({ title, value, trend, data, color }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border flex flex-col justify-between h-[250px] transform hover:scale-[1.02] transition-transform duration-300 ">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide ">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-3xl font-bold text-gray-900 text-green-400">{value}</h2>
          <span className="text-sm font-semibold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>
        </div>
      </div>
      <div className="w-full h-[120px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              interval="preserveStartEnd"
              hide={true}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color || "#9381ff"}
              strokeWidth={4}
              dot={{ r: 4, fill: color, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueReport;
