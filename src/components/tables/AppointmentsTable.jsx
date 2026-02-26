import ResizableTh from '../ResizableTh';
import { FaEdit, FaTrash, FaCheck, FaUser, FaStar, FaUserCheck } from 'react-icons/fa';

const AppointmentsTable = ({ appointments, onEdit, onDelete, onMarkComplete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <ResizableTh className="p-4">Client</ResizableTh>
                            <ResizableTh className="p-4">Contact</ResizableTh>
                            <ResizableTh className="p-4">Category</ResizableTh>
                            <ResizableTh className="p-4">Customer Type</ResizableTh>
                            <ResizableTh className="p-4">Staff</ResizableTh>
                            <ResizableTh className="p-4">Service</ResizableTh>
                            <ResizableTh className="p-4">Date</ResizableTh>
                            <ResizableTh className="p-4">Price</ResizableTh>
                            <ResizableTh className="p-4">Status</ResizableTh>
                            <ResizableTh className="p-4 text-center">Actions</ResizableTh>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="p-8 text-center text-gray-500">
                                    No appointments found
                                </td>
                            </tr>
                        ) : (
                            appointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="font-medium text-gray-900">{appointment.name}</div>
                                            {appointment.clientDetails?.isVip && (
                                                <FaStar className="text-yellow-500" title="VIP Client" />
                                            )}
                                        </div>
                                        {appointment.clientDetails && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                <span className="inline-flex items-center gap-1">
                                                    <FaUser className="text-xs" />
                                                    {appointment.clientDetails.visits} visits
                                                </span>
                                                <span className="ml-2">• ₹{appointment.clientDetails.totalSpent.toLocaleString()} spent</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900">{appointment.mobile}</div>
                                        {appointment.clientDetails?.email && (
                                            <div className="text-xs text-gray-500">{appointment.clientDetails.email}</div>
                                        )}
                                        {appointment.customerDetails?.email && (
                                            <div className="text-xs text-primary">{appointment.customerDetails.email}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <CategoryBadge category={appointment.category} />
                                    </td>
                                    <td className="p-4">
                                        {appointment.isRegisteredCustomer ? (
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                                    <FaUserCheck className="text-xs" />
                                                    Registered
                                                </span>
                                                {appointment.customerDetails && (
                                                    <div className="text-xs text-gray-500">
                                                        {appointment.customerDetails.name}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                                <FaUser className="text-xs" />
                                                Walk-in
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-600">{appointment.staff}</td>
                                    <td className="p-4">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                                            {appointment.serviceType}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{appointment.date}</td>
                                    <td className="p-4 text-gray-600 font-semibold">₹{appointment.price}</td>
                                    <td className="p-4">
                                        <StatusBadge status={appointment.status} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            {appointment.status !== 'completed' && onMarkComplete && (
                                                <button
                                                    onClick={() => onMarkComplete(appointment.id)}
                                                    className="text-green-500 hover:text-green-700 transition-colors"
                                                    title="Mark as Complete"
                                                >
                                                    <FaCheck />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEdit(appointment)}
                                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => onDelete(appointment.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                title="Delete"
                                            >
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
    );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
    const styles = {
        completed: 'bg-green-100 text-green-700',
        confirmed: 'bg-blue-100 text-blue-700',
        pending: 'bg-yellow-100 text-yellow-700',
        waiting: 'bg-orange-100 text-orange-700',
        cancelled: 'bg-red-100 text-red-700'
    };
    const labels = {
        completed: 'Completed',
        confirmed: 'Confirmed',
        pending: 'Pending',
        waiting: 'Waiting',
        cancelled: 'Cancelled'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
            {labels[status] || status}
        </span>
    );
};

// Category Badge Component
const CategoryBadge = ({ category }) => {
    const styles = {
        'online': 'bg-blue-100 text-blue-700',
        'walk in': 'bg-purple-100 text-purple-700'
    };
    const labels = {
        'online': 'Online',
        'walk in': 'Walk-in'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category] || 'bg-gray-100 text-gray-700'}`}>
            {labels[category] || category || 'Online'}
        </span>
    );
};

export default AppointmentsTable;
