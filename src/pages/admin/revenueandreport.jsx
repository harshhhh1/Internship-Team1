import React, { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';
import RevenueTable from '../../components/tables/RevenueTable';

import { useSalon } from '../../context/SalonContext';

const RevenueReport = () => {
  const { selectedSalon } = useSalon();
  const [stylists, setStylists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [salaryInput, setSalaryInput] = useState('');
  const [loading, setLoading] = useState(true);

  // Stats state
  const [revenueStats, setRevenueStats] = useState({
    revenueThisMonth: { value: 0, trend: '0', data: [] },
    totalIncome: { value: 0, trend: '0', data: [] },
    clients: { value: 0, trend: '0', data: [] }
  });

  // Fetch revenue stats for graphs
  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = selectedSalon
          ? `http://localhost:5050/appointments/revenue-stats?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/appointments/revenue-stats';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRevenueStats(data);
        }
      } catch (error) {
        console.error("Error fetching revenue stats:", error);
      }
    };
    fetchRevenueStats();
  }, [selectedSalon]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = selectedSalon
          ? `http://localhost:5050/appointments?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/appointments';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [selectedSalon]);

  // Fetch staff and calculate appointment counts
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const url = selectedSalon
          ? `http://localhost:5050/staff?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/staff';
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Filter for stylists if needed, or just show all staff
          const mappedData = data.map((staff, index) => {
            // Count completed appointments for this stylist
            const completedCount = appointments.filter(
              apt => apt.staffId?._id === staff._id && apt.status === 'completed'
            ).length;

            return {
              id: index + 1,
              realId: staff._id,
              name: staff.name,
              status: staff.isActive ? 'Active' : 'Inactive',
              cases: completedCount,
              salary: staff.salary ? `₹${staff.salary.toLocaleString()}` : '₹0'
            };
          });
          setStylists(mappedData);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [selectedSalon, appointments]);

  const handleEditSalary = (staff) => {
    setSelectedStaff(staff);
    setSalaryInput('');
    setShowSalaryModal(true);
  };

  const handleSaveSalary = async () => {
    if (!salaryInput || isNaN(salaryInput)) {
      alert('Please enter a valid salary amount');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/staff/${selectedStaff.realId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ salary: parseFloat(salaryInput) })
      });

      if (response.ok) {
        // Refresh staff list
        const url = selectedSalon
          ? `http://localhost:5050/staff?salonId=${selectedSalon._id}`
          : 'http://localhost:5050/staff';
        const staffResponse = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (staffResponse.ok) {
          const data = await staffResponse.json();
          const mappedData = data.map((staff, index) => {
            const completedCount = appointments.filter(
              apt => apt.staffId?._id === staff._id && apt.status === 'completed'
            ).length;

            return {
              id: index + 1,
              realId: staff._id,
              name: staff.name,
              status: staff.isActive ? 'Active' : 'Inactive',
              cases: completedCount,
              salary: staff.salary ? `₹${staff.salary.toLocaleString()}` : '₹0'
            };
          });
          setStylists(mappedData);
        }
        setShowSalaryModal(false);
        alert('Salary updated successfully!');
      } else {
        alert('Failed to update salary');
      }
    } catch (error) {
      console.error('Error updating salary:', error);
      alert('Error updating salary');
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value.toLocaleString()}`;
  };

  // Format trend
  const formatTrend = (trend) => {
    const num = parseFloat(trend);
    if (num > 0) return `↑ ${num}%`;
    if (num < 0) return `↓ ${Math.abs(num)}%`;
    return '0%';
  };

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Revenue & Report</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Revenue This Month"
            value={formatCurrency(revenueStats.revenueThisMonth.value)}
            trend={formatTrend(revenueStats.revenueThisMonth.trend)}
            data={revenueStats.revenueThisMonth.data.length > 0 ? revenueStats.revenueThisMonth.data : [{ name: 'No data', value: 0 }]}
            color="#9381ff"
          />
          <StatCard
            title="Total Income"
            value={formatCurrency(revenueStats.totalIncome.value)}
            trend={formatTrend(revenueStats.totalIncome.trend)}
            data={revenueStats.totalIncome.data.length > 0 ? revenueStats.totalIncome.data : [{ name: 'No data', value: 0 }]}
            color="#b8b8ff"
          />
          <StatCard
            title="Clients"
            value={revenueStats.clients.value.toLocaleString()}
            trend={formatTrend(revenueStats.clients.trend)}
            data={revenueStats.clients.data.length > 0 ? revenueStats.clients.data : [{ name: 'No data', value: 0 }]}
            color="#ffd8be"
          />
        </div>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row flex-wrap gap-4 items-center">
          <input
            className="w-full md:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            placeholder="Search staff..."
          />
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <input
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm w-full md:w-44"
              type="date"
              placeholder="From date"
            />
            <span className="text-gray-400 hidden md:inline">—</span>
            <input
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm w-full md:w-44"
              type="date"
              placeholder="To date"
            />
          </div>
          <select className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-white w-full md:w-40">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">Loading staff data...</div>
        ) : (
          <RevenueTable stylists={stylists} onEditSalary={handleEditSalary} />
        )}
      </div>

      {/* Salary Edit Modal */}
      {showSalaryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative shadow-xl">
            <button
              onClick={() => setShowSalaryModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Salary</h2>
            <p className="text-gray-600 mb-4">Update salary for <span className="font-semibold">{selectedStaff?.name}</span></p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Salary (₹)</label>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="Enter salary amount"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveSalary}
                className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setShowSalaryModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

function StatCard({ title, value, trend, data, color }) {
  const isPositive = trend.includes('↑');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border flex flex-col justify-between h-62.5 transform hover:scale-[1.02] transition-transform duration-300 ">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide ">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
            }`}>{trend}</span>
        </div>
      </div>
      <div className="w-full h-30 mt-4">
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
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Value']}
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
