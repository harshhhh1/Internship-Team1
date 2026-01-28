
const Dashboard = () => {
  return (
    <div className="pt-24 px-8 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Dashboard
      </h1>
      <p className="text-slate-500 mb-8">
        Overview of Suntouch IT system
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Users", value: "1,245", color: "text-blue-600" },
          { title: "Appointments", value: "98", color: "text-emerald-600" },
          { title: "Revenue", value: "₹2.4L", color: "text-indigo-600" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl border shadow-sm p-6"
          >
            <p className="text-slate-500 text-sm">{item.title}</p>
            <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold text-slate-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>✔ New user registered</li>
          <li>✔ Appointment booked</li>
          <li>✔ Profile updated</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
