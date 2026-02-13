import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useSalon } from '../../context/SalonContext';
import { FaFileAlt, FaUsers, FaCalendarAlt, FaRupeeSign, FaChartLine, FaDownload } from 'react-icons/fa';

const COLORS = ['#9381ff', '#b8b8ff', '#ffd8be', '#ff8fa3', '#7a67e0'];

function Reports() {
  const { selectedSalon } = useSalon();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');
  
  const [reportData, setReportData] = useState({
    summary: {
      totalAppointments: 0,
      completedAppointments: 0,
      cancelledAppointments: 0,
      newClients: 0,
      totalRevenue: 0,
      revenueGrowth: 0
    },
    staffPerformance: [],
    appointments: [],
    clients: [],
    revenue: {
      payments: [],
      summary: {
        totalRevenue: 0,
        previousRevenue: 0,
        growth: 0,
        transactionCount: 0,
        averageTransaction: 0
      },
      dailyRevenue: []
    }
  });

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const salonId = selectedSalon?._id || '';
      
      // Fetch dashboard report
      const dashboardRes = await fetch(
        `http://localhost:5050/reports/dashboard?salonId=${salonId}&filter=${filter}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Fetch revenue report
      const revenueRes = await fetch(
        `http://localhost:5050/reports/revenue?salonId=${salonId}&filter=${filter}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Fetch appointments report
      const appointmentsRes = await fetch(
        `http://localhost:5050/reports/appointments?salonId=${salonId}&filter=${filter}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Fetch clients report
      const clientsRes = await fetch(
        `http://localhost:5050/reports/clients?salonId=${salonId}&filter=${filter}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        setReportData(prev => ({
          ...prev,
          summary: dashboardData.summary,
          staffPerformance: dashboardData.staffPerformance || []
        }));
      }

      if (revenueRes.ok) {
        const revenueData = await revenueRes.json();
        setReportData(prev => ({
          ...prev,
          revenue: revenueData
        }));
      }

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json();
        setReportData(prev => ({
          ...prev,
          appointments: appointmentsData.appointments || [],
          summary: {
            ...prev.summary,
            totalAppointments: appointmentsData.summary?.total || 0,
            completedAppointments: appointmentsData.summary?.completed || 0,
            cancelledAppointments: appointmentsData.summary?.cancelled || 0
          }
        }));
      }

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setReportData(prev => ({
          ...prev,
          clients: clientsData.clients || [],
          summary: {
            ...prev.summary,
            newClients: clientsData.summary?.newClients || 0
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSalon) {
      fetchReportData();
    }
  }, [selectedSalon, filter]);

  const formatCurrency = (value) => {
    if (!value) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getFilterLabel = () => {
    switch (filter) {
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'annually': return 'This Year';
      default: return 'This Month';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
    { id: 'appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { id: 'clients', label: 'Clients', icon: <FaUsers /> },
    { id: 'revenue', label: 'Revenue', icon: <FaRupeeSign /> },
    { id: 'staff', label: 'Staff', icon: <FaUsers /> }
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">View comprehensive reports and analytics</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
            {['weekly', 'monthly', 'annually'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">Loading reports...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Appointments"
                    value={reportData.summary.totalAppointments}
                    icon={<FaCalendarAlt className="text-primary" />}
                    color="primary"
                  />
                  <StatCard
                    title="Completed"
                    value={reportData.summary.completedAppointments}
                    icon={<FaCalendarAlt className="text-green-500" />}
                    color="green"
                  />
                  <StatCard
                    title="New Clients"
                    value={reportData.summary.newClients}
                    icon={<FaUsers className="text-blue-500" />}
                    color="blue"
                  />
                  <StatCard
                    title="Revenue"
                    value={formatCurrency(reportData.summary.totalRevenue)}
                    trend={reportData.summary.revenueGrowth}
                    icon={<FaRupeeSign className="text-purple-500" />}
                    color="purple"
                  />
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend - {getFilterLabel()}</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reportData.revenue.dailyRevenue || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          tickLine={false}
                          tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
                        />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(value), 'Revenue']}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#9381ff" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: '#9381ff' }}
                          activeDot={{ r: 6, fill: '#9381ff', stroke: 'white', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Appointment Status Pie Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: reportData.summary.completedAppointments },
                              { name: 'Pending/Confirmed', value: reportData.summary.totalAppointments - reportData.summary.completedAppointments - reportData.summary.cancelledAppointments },
                              { name: 'Cancelled', value: reportData.summary.cancelledAppointments }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {[0, 1, 2].map((index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <LegendItem color={COLORS[0]} label="Completed" />
                      <LegendItem color={COLORS[1]} label="Pending" />
                      <LegendItem color={COLORS[2]} label="Cancelled" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Staff Performance</h3>
                    <div className="space-y-4">
                      {reportData.staffPerformance.slice(0, 5).map((staff, index) => (
                        <div key={staff.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="font-medium text-gray-900">{staff.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">{staff.completedAppointments}</span>
                            <span className="text-xs text-gray-500 ml-1">appointments</span>
                          </div>
                        </div>
                      ))}
                      {reportData.staffPerformance.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No staff data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard title="Total" value={reportData.summary.totalAppointments} color="primary" />
                  <StatCard title="Completed" value={reportData.summary.completedAppointments} color="green" />
                  <StatCard title="Pending/Confirmed" value={reportData.summary.totalAppointments - reportData.summary.completedAppointments - reportData.summary.cancelledAppointments} color="yellow" />
                  <StatCard title="Cancelled" value={reportData.summary.cancelledAppointments} color="red" />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Staff</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reportData.appointments.slice(0, 10).map((apt) => (
                          <tr key={apt._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <span className="font-medium text-gray-900">{apt.clientName || 'N/A'}</span>
                                <span className="block text-xs text-gray-500">{apt.clientMobile}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {new Date(apt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {apt.staffId?.name || 'Unassigned'}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(apt.price)}
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={apt.status} />
                            </td>
                          </tr>
                        ))}
                        {reportData.appointments.length === 0 && (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                              No appointments found for this period
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard title="Total Clients" value={reportData.revenue.summary?.transactionCount || 0} color="primary" />
                  <StatCard title="New Clients" value={reportData.summary.newClients} color="blue" />
                  <StatCard title="Revenue" value={formatCurrency(reportData.summary.totalRevenue)} color="purple" />
                  <StatCard title="Avg. Transaction" value={formatCurrency(reportData.revenue.summary?.averageTransaction || 0)} color="green" />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mobile</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Visits</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reportData.clients.slice(0, 10).map((client) => (
                          <tr key={client._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-primary font-semibold text-sm">
                                    {client.name?.charAt(0) || '?'}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900">{client.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{client.mobile}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{client.visits || 0}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(client.totalSpent || 0)}
                            </td>
                            <td className="px-6 py-4">
                              {client.isVip ? (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">VIP</span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Regular</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {reportData.clients.length === 0 && (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                              No clients found for this period
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard 
                    title="Total Revenue" 
                    value={formatCurrency(reportData.revenue.summary?.totalRevenue || 0)} 
                    trend={reportData.revenue.summary?.growth}
                    color="green" 
                  />
                  <StatCard 
                    title="Previous Period" 
                    value={formatCurrency(reportData.revenue.summary?.previousRevenue || 0)} 
                    color="gray" 
                  />
                  <StatCard 
                    title="Transactions" 
                    value={reportData.revenue.summary?.transactionCount || 0} 
                    color="blue" 
                  />
                  <StatCard 
                    title="Avg. Transaction" 
                    value={formatCurrency(reportData.revenue.summary?.averageTransaction || 0)} 
                    color="purple" 
                  />
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue - {getFilterLabel()}</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.revenue.dailyRevenue || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          tickLine={false}
                          tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
                        />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(value), 'Revenue']}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="revenue" fill="#9381ff" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Staff Tab */}
            {activeTab === 'staff' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Staff Name</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Appointments</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Completed</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Revenue Generated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reportData.staffPerformance.map((staff) => (
                          <tr key={staff.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-primary font-semibold text-sm">
                                    {staff.name?.charAt(0) || '?'}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-900">{staff.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{staff.role}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{staff.totalAppointments}</td>
                            <td className="px-6 py-4 text-sm text-green-600 font-medium">{staff.completedAppointments}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(staff.revenue)}
                            </td>
                          </tr>
                        ))}
                        {reportData.staffPerformance.length === 0 && (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                              No staff performance data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color = 'primary', trend }) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs previous
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Legend Item Component
function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const statusStyles = {
    completed: 'bg-green-100 text-green-700',
    confirmed: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
}

export default Reports;

