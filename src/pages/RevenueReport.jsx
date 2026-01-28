import React from "react";

const RevenueReport = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Revenue & Report
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Revenue This Month"
          value="₹5,00,000"
          subtitle="↑ 12% from last month"
        />
        <StatCard
          title="Total Income"
          value="₹12,50,000"
          subtitle="↑ 8% from last year"
        />
        <StatCard
          title="Patients"
          value="11,000"
          subtitle="↑ 4% this month"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search doctor..."
          className="w-full md:flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Doctor List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Doctor List
          </h2>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Sr No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total Cases</th>
              <th className="px-6 py-3">Annual Salary</th>
            </tr>
          </thead>

          <tbody>
            {doctorData.map((doctor, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {doctor.name}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doctor.status} />
                </td>
                <td className="px-6 py-4">{doctor.cases}</td>
                <td className="px-6 py-4 font-semibold">
                  ₹{doctor.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------------- Sub Components ---------------- */

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <p className="text-xs text-green-600 mt-2">{subtitle}</p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const base =
    "px-3 py-1 rounded-full text-xs font-medium inline-block";

  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    OnLeave: "bg-yellow-100 text-yellow-700",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};

/* ---------------- Mock Data ---------------- */

const doctorData = [
  {
    name: "Dr. Rahul Sharma",
    status: "Active",
    cases: 320,
    salary: "12,00,000",
  },
  {
    name: "Dr. Anjali Mehta",
    status: "OnLeave",
    cases: 210,
    salary: "9,50,000",
  },
  {
    name: "Dr. Aman Verma",
    status: "Inactive",
    cases: 180,
    salary: "8,20,000",
  },
];

export default RevenueReport;
