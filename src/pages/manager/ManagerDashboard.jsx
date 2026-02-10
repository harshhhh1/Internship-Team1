import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Manager Panel</h2>
        <ul className="space-y-4">
          <li>Staff Management</li>
          <li>Reports</li>
          <li>Revenue</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manager Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow">Total Staff</div>
          <div className="bg-white p-6 rounded shadow">Monthly Revenue</div>
          <div className="bg-white p-6 rounded shadow">Bookings</div>
          <div className="bg-white p-6 rounded shadow">Performance</div>
        </div>
      </main>
    </div>
  );
}
