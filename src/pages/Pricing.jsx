import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import axios from "axios";

function Pricing() {
  const userId = localStorage.getItem("userId"); // IMPORTANT







const upgradePlan = async (plan) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5001/api/plans/upgrade", // ✅ correct URL
      { plan },                                 // ✅ no userId
      {
        headers: {
          Authorization: `Bearer ${token}`,     // ✅ token added
        },
      }
    );

    alert("Plan upgraded successfully");
    window.location.href = "/settings";
  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Error upgrading plan");
  }
};











  return (
    <div className="flex min-h-screen font-sans bg-linear-to-br from-bg-light to-accent-cream">
      {/* LEFT SIDEBAR */}
      <DashboardSidebar />

      {/* RIGHT CONTENT (same as Settings) */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Pricing & Plans
            </h1>
            <p className="text-gray-600">
              Choose the best plan for your salon business
            </p>
          </div>

          {/* PLANS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* BASIC */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Starter
              </span>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                Basic Salon
              </h2>
              <p className="text-gray-500 mb-6">
                Perfect for single-branch salons
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-gray-500 text-sm"> / month</span>
              </div>

              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                <li>✔ 1 Salon Branch</li>
                <li>✔ Staff Management</li>
                <li>✔ Appointment Booking</li>
                <li>✔ Basic Reports</li>
              </ul>

              <button
                onClick={() => upgradePlan("basic")}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
              >
                Get Started
              </button>
            </div>

            {/* STANDARD */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-primary shadow-[0_30px_60px_rgba(147,129,255,0.25)] scale-[1.03]">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 text-xs rounded-full">
                Most Popular
              </span>

              <span className="text-xs font-semibold text-primary uppercase">
                Growth
              </span>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                Standard Salon
              </h2>
              <p className="text-gray-500 mb-6">
                Ideal for growing salons
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">₹999</span>
                <span className="text-gray-500 text-sm"> / month</span>
              </div>

              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                <li>✔ Up to 5 Branches</li>
                <li>✔ Advanced Staff Roles</li>
                <li>✔ Online Booking</li>
                <li>✔ Revenue Reports</li>
                <li>✔ Priority Support</li>
              </ul>

              <button
                onClick={() => upgradePlan("standard")}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-[#7a67e0]"
              >
                Upgrade to Standard
              </button>
            </div>

            {/* PREMIUM */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
              <span className="text-xs font-semibold text-gray-300 uppercase">
                Enterprise
              </span>

              <h2 className="text-2xl font-bold mt-2">
                Premium Salon
              </h2>
              <p className="text-gray-300 mb-6">
                Built for franchise businesses
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">₹1649</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>

              <ul className="space-y-3 text-sm text-gray-200 mb-8">
                <li>✔ Up to 10 Branches</li>
                <li>✔ Franchise Dashboard</li>
                <li>✔ Advanced Analytics</li>
                <li>✔ Custom Roles</li>
                <li>✔ Dedicated Support</li>
              </ul>

              <button
                onClick={() => upgradePlan("premium")}
                className="w-full py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100"
              >
                Go Premium
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
