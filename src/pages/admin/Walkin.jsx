import React, { useState } from 'react';
import { FaUserPlus, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Dummy walk-in data
const walkinQueue = [
    { id: 1, name: 'Raj Kumar', phone: '9876543210', service: 'Hair Cut', waitTime: '10 min', status: 'Waiting' },
    { id: 2, name: 'Meera Patel', phone: '9876543211', service: 'Hair Styling', waitTime: '25 min', status: 'Waiting' },
    { id: 3, name: 'Vikram Singh', phone: '9876543212', service: 'Beard Trim', waitTime: '5 min', status: 'In Service' },
];

const recentWalkins = [
    { id: 4, name: 'Pooja Sharma', phone: '9876543213', service: 'Facial', status: 'Completed', time: '10:30 AM' },
    { id: 5, name: 'Arjun Reddy', phone: '9876543214', service: 'Hair Cut', status: 'Completed', time: '10:00 AM' },
    { id: 6, name: 'Sneha Gupta', phone: '9876543215', service: 'Manicure', status: 'Cancelled', time: '09:45 AM' },
];

const services = [
    'Hair Cut', 'Hair Styling', 'Hair Coloring', 'Beard Trim', 'Facial',
    'Manicure', 'Pedicure', 'Hair Spa', 'Threading', 'Waxing'
];

export default function Walkin() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: 'Hair Cut',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Would add to queue here
        alert('Walk-in added to queue!');
        setShowModal(false);
        setFormData({ name: '', phone: '', service: 'Hair Cut' });
    };

    return (
        <div className="min-h-screen bg-bg-light">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Walk-in Management</h1>
                        <p className="text-gray-500 mt-2">Manage walk-in customers and queues.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <FaUserPlus />
                        Add Walk-in
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <FaClock className="text-yellow-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">In Queue</p>
                                <p className="text-2xl font-bold text-gray-900">3</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaCheckCircle className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Completed Today</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaClock className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg Wait Time</p>
                                <p className="text-2xl font-bold text-gray-900">15 min</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Queue */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Current Queue</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Wait Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {walkinQueue.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.service}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.waitTime}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Waiting' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="text-green-600 hover:text-green-700 text-sm font-medium">Start</button>
                                                <button className="text-red-600 hover:text-red-700 text-sm font-medium">Cancel</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Walk-ins */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Recent Walk-ins</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentWalkins.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.service}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.time}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Walk-in Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Walk-in Customer</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Customer name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    {services.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Add to Queue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
