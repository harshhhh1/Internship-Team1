const Profile = () => {
  return (
    <div className="pt-24 px-8 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-8">
        Admin Profile
      </h1>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-5xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-gray-900  text-white flex items-center justify-center text-2xl font-semibold">
            N
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Nikita Bhalerao
            </h2>
            <p className="text-slate-500">Administrator • Suntouch IT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["Email", "admin@suntouchit.com"],
            ["Phone", "+91 98765 43210"],
            ["Role", "Administrator"],
            ["Status", "Active"],
            ["Company", "Suntouch IT"],
            ["Joined", "12 Jan 2025"],
          ].map(([label, value]) => (
            <div key={label} className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
