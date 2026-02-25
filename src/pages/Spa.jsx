import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Spa() {
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        setLoading(true);
        // Fetch spas filtered by type from backend
        const res = await fetch("http://localhost:5050/salons?type=spa");
        if (!res.ok) {
          throw new Error("Failed to fetch spas");
        }
        const data = await res.json();
        setSpas(data);
      } catch (err) {
        console.error("Error fetching spas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  const handleExplore = (spaId) => {
    navigate(`/spa/${spaId}`);
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
            Our <span className="text-secondary">Spas</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Relax and rejuvenate with our premium spa treatments and wellness services
          </p>
        </div>

        {/* Filter/Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            to="/salon"
            className="px-6 py-2 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            Salon
          </Link>
          <Link
            to="/spa"
            className="px-6 py-2 bg-secondary text-white rounded-full font-semibold shadow-md"
          >
            Spa
          </Link>
        </div>

        {/* Spa Cards */}
        {spas.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🧖</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Spas Available</h3>
            <p className="text-gray-500">Please check back later for available spas.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spas.map((spa) => (
              <div
                key={spa._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card Image */}
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-6xl">🧖‍♀️</span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                      Spa
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {spa.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {spa.description || "Relaxing spa treatments and wellness services"}
                  </p>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3 text-sm text-gray-500">
                    <span className="mt-0.5">📍</span>
                    <span>
                      {spa.address}, {spa.branchArea}
                    </span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <span>📞</span>
                    <span>{spa.contactNumber || spa.phoneNumber}</span>
                  </div>

                  {/* Explore Button */}
                  <button
                    onClick={() => handleExplore(spa._id)}
                    className="w-full py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    Explore Spa
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

