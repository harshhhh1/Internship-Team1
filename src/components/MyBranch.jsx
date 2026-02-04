import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaEdit } from "react-icons/fa";

function MyBranch({ onEdit }) {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSalon();
  }, []);

  const fetchSalon = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5001/api/salon", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch salon");
      }

      setSalon(data.salon);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)]">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)]">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!salon) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)]">
        <p className="text-gray-500 text-center">No salon added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_20px_40px_rgba(147,129,255,0.15)] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-1">
            {salon.name}
          </h2>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
            {salon.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-[#7a67e0] transition-colors text-sm"
        >
          <FaEdit size={14} />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <FaMapMarkerAlt className="text-secondary" size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Address</p>
            <p className="text-gray-600 text-sm mt-1">
              {salon.address.street}, {salon.address.city}, {salon.address.state}{" "}
              {salon.address.zipCode}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-peach/20 flex items-center justify-center flex-shrink-0">
            <FaPhone className="text-accent-peach" size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-gray-600 text-sm mt-1">{salon.contact.phone}</p>
            {salon.contact.alternatePhone && (
              <p className="text-gray-500 text-xs">
                Alt: {salon.contact.alternatePhone}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaEnvelope className="text-red-500" size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-gray-600 text-sm mt-1">{salon.contact.email}</p>
          </div>
        </div>

        {/* Timings */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FaClock className="text-blue-500" size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Working Hours</p>
            <p className="text-gray-600 text-sm mt-1">
              {salon.timings.opening} - {salon.timings.closing}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {salon.timings.workingDays?.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Last updated: {new Date(salon.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default MyBranch;

