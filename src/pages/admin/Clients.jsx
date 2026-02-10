import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaPhone, FaEnvelope, FaCalendarAlt, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useSalon } from '../../context/SalonContext';

export default function Clients() {
    const { selectedSalon } = useSalon();
    const [clients, setClients] = useState([]);
    const [stats, setStats] = useState({ totalClients: 0, newThisMonth: 0, activeClients: 0, vipClients: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        isVip: false,
        notes: ''
    });

    const fetchClients = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const url = selectedSalon
                ? `http://localhost:5050/clients?salonId=${selectedSalon._id}`
                : 'http://localhost:5050/clients';
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setClients(data);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = selectedSalon
                ? `http://localhost:5050/clients/stats?salonId=${selectedSalon._id}`
                : 'http://localhost:5050/clients/stats';
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchClients();
        fetchStats();
    }, [selectedSalon]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = {
                ...formData,
                salonId: selectedSalon?._id
            };

            const method = editingClient ? 'PUT' : 'POST';
            const url = editingClient
                ? `http://localhost:5050/clients/${editingClient._id}`
                : 'http://localhost:5050/clients';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                fetchClients();
                fetchStats();
                closeModal();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to save client');
            }
        } catch (error) {
            console.error('Error saving client:', error);
            alert('Error saving client');
        }
    };

    const handleEdit = (client) => {
        setEditingClient(client);
        setFormData({
            name: client.name || '',
            mobile: client.mobile || '',
            email: client.email || '',
            isVip: client.isVip || false,
            notes: client.notes || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5050/clients/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchClients();
                fetchStats();
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingClient(null);
        setFormData({ name: '', mobile: '', email: '', isVip: false, notes: '' });
    };

    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.mobile?.includes(searchTerm) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg-light">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
                        <p className="text-gray-500 mt-2">Manage your salon's client database.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <FaUserPlus />
                        Add Client
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Total Clients</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalClients.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">New This Month</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">+{stats.newThisMonth}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Active Clients</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">{stats.activeClients}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">VIP Clients</p>
                        <p className="text-3xl font-bold text-purple-600 mt-1">{stats.vipClients}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Visits</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Visit</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                                ) : filteredClients.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No clients found</td></tr>
                                ) : (
                                    filteredClients.map((client) => (
                                        <tr key={client._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 ${client.isVip ? 'bg-purple-100' : 'bg-primary/10'} rounded-full flex items-center justify-center`}>
                                                        <span className={`${client.isVip ? 'text-purple-600' : 'text-primary'} font-semibold`}>
                                                            {client.name?.charAt(0) || '?'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-900">{client.name}</span>
                                                        {client.isVip && <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">VIP</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-700 flex items-center gap-2">
                                                        <FaPhone className="text-gray-400 text-xs" /> {client.mobile}
                                                    </span>
                                                    {client.email && (
                                                        <span className="text-sm text-gray-500 flex items-center gap-2">
                                                            <FaEnvelope className="text-gray-400 text-xs" /> {client.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                    {client.visits || 0} visits
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {client.lastVisit ? (
                                                    <span className="flex items-center gap-2">
                                                        <FaCalendarAlt className="text-gray-400" />
                                                        {new Date(client.lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ₹{(client.totalSpent || 0).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleEdit(client)} className="text-primary hover:text-secondary">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(client._id)} className="text-red-500 hover:text-red-700">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Client Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingClient ? 'Edit Client' : 'Add New Client'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Client name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Any notes about this client..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isVip"
                                    checked={formData.isVip}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                />
                                <label className="text-sm text-gray-700">Mark as VIP Client</label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    {editingClient ? 'Save Changes' : 'Add Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
