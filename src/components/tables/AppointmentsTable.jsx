import ResizableTh from '../ResizableTh';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const AppointmentsTable = ({ appointments, onEdit, onDelete, onMarkComplete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <ResizableTh className="p-4">Name</ResizableTh>
                            <ResizableTh className="p-4">Mobile</ResizableTh>
                            <ResizableTh className="p-4">Staff</ResizableTh>
                            <ResizableTh className="p-4">Appointment Date</ResizableTh>
                            <ResizableTh className="p-4">Service Type</ResizableTh>
                            <ResizableTh className="p-4 text-center">Actions</ResizableTh>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{appointment.name}</td>
                                <td className="p-4 text-gray-600">{appointment.mobile}</td>
                                <td className="p-4 text-gray-600">{appointment.staff}</td>
                                <td className="p-4 text-gray-600">{appointment.date}</td>
                                <td className="p-4 text-gray-600">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                                        {appointment.serviceType}
                                    </span>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentsTable;
