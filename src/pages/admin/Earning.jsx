import React from 'react';
import { FaMoneyBillWave, FaCalendarCheck, FaCut, FaChartLine } from 'react-icons/fa';

// Dummy earning data
const earningsData = {
    thisMonth: 45000,
    lastMonth: 38500,
    totalYear: 425000,
    pending: 8500,
};

const recentEarnings = [
    { id: 1, date: '2026-02-09', service: 'Hair Styling', client: 'Priya Sharma', amount: 1500, status: 'Paid' },
    { id: 2, date: '2026-02-08', service: 'Hair Coloring', client: 'Rahul Verma', amount: 3500, status: 'Paid' },
    { id: 3, date: '2026-02-08', service: 'Facial Treatment', client: 'Anita Gupta', amount: 2000, status: 'Pending' },
    { id: 4, date: '2026-02-07', service: 'Manicure & Pedicure', client: 'Neha Singh', amount: 1200, status: 'Paid' },
    { id: 5, date: '2026-02-07', service: 'Bridal Makeup', client: 'Kavita Reddy', amount: 8000, status: 'Paid' },
    { id: 6, date: '2026-02-06', service: 'Hair Spa', client: 'Deepak Kumar', amount: 1800, status: 'Paid' },
];

export default function Earning() {
    return (
        <div className="min-h-screen bg-bg-light">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Earnings</h1>
                    <p className="text-gray-500 mt-2">Track your earnings and commission from services.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">₹{earningsData.thisMonth.toLocaleString()}</p>
                                <p className="text-sm text-green-500 mt-1">+16.8% from last month</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaMoneyBillWave className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Last Month</p>
                                <p className="text-2xl font-bold text-gray-900">₹{earningsData.lastMonth.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaChartLine className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total This Year</p>
                                <p className="text-2xl font-bold text-gray-900">₹{earningsData.totalYear.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <FaCalendarCheck className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Pending</p>
                                <p className="text-2xl font-bold text-orange-500">₹{earningsData.pending.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <FaCut className="text-orange-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Earnings Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Recent Earnings</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentEarnings.map((earning) => (
                                    <tr key={earning.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {new Date(earning.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{earning.service}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{earning.client}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{earning.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${earning.status === 'Paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {earning.status}
                                            </span>
                                        </td>
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
