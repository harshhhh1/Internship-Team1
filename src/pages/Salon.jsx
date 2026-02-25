import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Salon() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        // Fetch salons filtered by type from backend
        const res = await fetch("http://localhost:5050/salons?type=salon");
        if (!res.ok) {
          throw new Error("Failed to fetch salons");
        }
        const data = await res.json();
        setSalons(data);
      } catch (err) {
        console.error("Error fetching salons:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleExplore = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Salons</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience premium hair styling and beauty services at our expert salons
          </p>
        </div>

        {/* Filter/Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            to="/salon"
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold shadow-md"
          >
            Salon
          </Link>
          <Link
            to="/spa"
            className="px-6 py-2 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            Spa
          </Link>
        </div>

        {/* Salon Cards */}
        {salons.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💇</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Salons Available</h3>
            <p className="text-gray-500">Please check back later for available salons.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <div
                key={salon._id}
                className="bg-white rounded-2xl shadow-lg shadow-xl transition-shadow duration-300"
              >
                {/* overflow-hidden hover: Card Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl">💇‍♀️</span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      Salon
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {salon.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {salon.description || "Premium hair styling and beauty services"}
                  </p>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3 text-sm text-gray-500">
                    <span className="mt-0.5">📍</span>
                    <span>
                      {salon.address}, {salon.branchArea}
                    </span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <span>📞</span>
                    <span>{salon.contactNumber || salon.phoneNumber}</span>
                  </div>

                  {/* Explore Button */}
                  <button
                    onClick={() => handleExplore(salon._id)}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
                  >
                    Explore Salon
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

