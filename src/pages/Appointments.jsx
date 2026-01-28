const Appointments = () => {
  return (
    <div className="ml-0  pt-24  bg-[#F8FAFC] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Appointments
            </h1>
            <p className="text-sm text-slate-500">
              Manage client appointments
            </p>
          </div>

          <button className="px-5 py-2 bg-gray-900  text-white rounded-xl hover:bg-blue-700 transition">
            + New Appointment
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left text-sm text-slate-600">
                <th className="p-4">Client</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm text-slate-700">
              <tr className="border-t">
                <td className="p-4">Rahul Sharma</td>
                <td className="p-4">Web Development</td>
                <td className="p-4">28 Jan 2026</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-4">Neha Yadav</td>
                <td className="p-4">UI/UX Design</td>
                <td className="p-4">30 Jan 2026</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Priya Sharma</td>
                <td className="p-4">Web Design</td>
                <td className="p-4">1 Feb 2026</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Anjali Patel</td>
                <td className="p-4">UI/UX Design</td>
                <td className="p-4">30 Jan 2026</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
