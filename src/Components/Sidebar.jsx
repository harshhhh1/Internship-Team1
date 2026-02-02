import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiBarChart2,
  FiMessageSquare,
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
    { name: "Appointments", path: "/dashboard/appointments", icon: <FiCalendar /> },
    { name: "Revenue Report", path: "/dashboard/revenuereport", icon: <FiBarChart2 /> },
    { name: "Reviews", path: "/dashboard/reviews", icon: <FiMessageSquare /> },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">

      {/* Admin Header */}
      <div>
        <div className="flex items-center gap-5 px-8 py-8 border-b border-gray-100">
          <div className="bg-red-500 p-4 rounded-2xl shadow-md">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-gray-900 tracking-wide">
              Admin Panel
            </h3>
            <p className="text-red-500 text-base font-medium mt-1">
              Super Admin
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 px-6 space-y-5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-red-100 text-red-600 shadow-md"
                    : "text-gray-800 hover:bg-gray-100 hover:text-red-500"
                }`}
              >
                <span className="text-2xl">
                  {item.icon}
                </span>
                <span className="tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-100 cursor-pointer transition duration-300">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            G
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Gaurav
            </p>
            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}










