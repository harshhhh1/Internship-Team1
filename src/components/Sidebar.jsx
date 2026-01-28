import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-6 py-8">
      <p className="text-xs font-semibold text-gray-400 uppercase mb-6">
        Admin Panel
      </p>
      

      <nav className="flex flex-col gap-2">
        {[
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Profile", path: "/admin/profile" },
          { name: "Appointments", path: "/admin/appointments" },
          { name: "Receptionist", path: "/admin/receptionist" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition
               ${
                 isActive
                   ? "bg-blue-50 text-blue-600"
                   : "text-gray-600 hover:bg-gray-100"
               }`
            }
          >
            {item.name}
          </NavLink>
          
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
