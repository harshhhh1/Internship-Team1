import ResizableTh from '../ResizableTh';
import { FaEdit } from 'react-icons/fa';

const RevenueTable = ({ stylists, onEditSalary }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="p-6 text-xl font-bold text-gray-900 border-b border-gray-100">Stylist List</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50 text-sm font-semibold text-gray-500 uppercase">
                            <ResizableTh className="p-4 border-b border-gray-100">Sr No</ResizableTh>
                            <ResizableTh className="p-4 border-b border-gray-100">Name</ResizableTh>
                            <ResizableTh className="p-4 border-b border-gray-100">Status</ResizableTh>
                            <ResizableTh className="p-4 border-b border-gray-100">Appointments</ResizableTh>
                            <ResizableTh className="p-4 border-b border-gray-100">Annual Salary</ResizableTh>
                            <ResizableTh className="p-4 border-b border-gray-100 text-center">Actions</ResizableTh>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {stylists.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    Nothing to see here
                                </td>
                            </tr>
                        ) : (
                            stylists.map((d) => (
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
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => onEditSalary && onEditSalary(d)}
                                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                                title="Edit Salary"
                                            >
                                                <FaEdit />
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

export default RevenueTable;
