import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('customerToken');
            const customerId = localStorage.getItem('customerId');

            if (!token || !customerId) {
                // Not logged in, redirect to login
                navigate('/customer-login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5050/customer/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else if (response.status === 401) {
                    // Token expired, clear storage and redirect
                    localStorage.removeItem('customerToken');
                    localStorage.removeItem('customerId');
                    localStorage.removeItem('customerName');
                    localStorage.removeItem('userRole');
                    navigate('/customer-login');
                } else {
                    setError('Failed to load bookings');
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('An error occurred while loading bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerId');
        localStorage.removeItem('customerName');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        setCancellingId(bookingId);
        const token = localStorage.getItem('customerToken');

        try {
            const response = await fetch(`http://localhost:5050/appointments/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'cancelled' })
            });

            if (response.ok) {
                // Update local state
                setBookings(prev => prev.map(booking => 
                    booking._id === bookingId 
                        ? { ...booking, status: 'cancelled' }
                        : booking
                ));
                setError(null);
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to cancel booking');
            }
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('An error occurred while cancelling the booking');
        } finally {
            setCancellingId(null);
        }
    };

    const canCancel = (status, date) => {
        // Can only cancel pending or confirmed bookings
        if (status !== 'pending' && status !== 'confirmed') {
            return false;
        }
        // Can only cancel if booking is in the future
        const bookingDate = new Date(date);
        const now = new Date();
        return bookingDate > now;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light py-14 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-gray-500">Loading your bookings...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light py-14 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                        <p className="text-gray-500 mt-1">View and manage your appointments</p>
                    </div>
                    <div className="flex gap-4">
                        <a 
                            href="/customer-profile" 
                            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            My Profile
                        </a>
                        <a 
                            href="/book-appointment" 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        >
                            Book New Appointment
                        </a>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Bookings List */}
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                        <a 
                            href="/book-appointment" 
                            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        >
                            Book Your First Appointment
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div 
                                key={booking._id} 
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {booking.salonId?.name || 'Salon'}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>
                                                <span className="font-medium">Service:</span> {booking.serviceId?.name || 'Service'}
                                            </p>
                                            {booking.staffId && (
                                                <p>
                                                    <span className="font-medium">Stylist:</span> {booking.staffId.name}
                                                </p>
                                            )}
                                            <p>
                                                <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString('en-US', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                            <p>
                                                <span className="font-medium">Time:</span> {booking.timeSlot || 'Not specified'}
                                            </p>
                                            <p>
                                                <span className="font-medium">Price:</span> ₹{booking.price}
                                            </p>
                                            {booking.note && (
                                                <p>
                                                    <span className="font-medium">Note:</span> {booking.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col gap-2">
                                        <p className="text-xs text-gray-500">
                                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                                        </p>
                                        {canCancel(booking.status, booking.date) && (
                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                disabled={cancellingId === booking._id}
                                                className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                                            >
                                                {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
