import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function SalonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking form state
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientMobile, setClientMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const isSpa = window.location.pathname.includes("/spa/");

  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        setLoading(true);
        
        // Fetch salon details
        const salonRes = await fetch(`http://localhost:5050/salons/${id}`);
        if (!salonRes.ok) {
          throw new Error("Failed to fetch salon details");
        }
        const salonData = await salonRes.json();
        setSalon(salonData);

        // Fetch services for this salon
        const servicesRes = await fetch(`http://localhost:5050/services?salonId=${id}`);
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        // Staff is already populated in salon data
        if (salonData.staff && salonData.staff.length > 0) {
          setStaff(salonData.staff);
        }
      } catch (err) {
        console.error("Error fetching salon data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSalonData();
    }
  }, [id]);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
    // Pre-fill customer info if logged in
    const customerName = localStorage.getItem('customerName');
    if (customerName) setClientName(customerName);
  };

  const confirmBooking = async () => {
    if (!clientName || !clientMobile || !date || !time) {
      setBookingError("Please fill in all required fields");
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(clientMobile)) {
      setBookingError("Please enter a valid 10-digit mobile number");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      const customerId = localStorage.getItem('customerId');
      const customerToken = localStorage.getItem('customerToken');
      
      const appointmentData = {
        salonId: id,
        staffId: selectedStaff || null,
        serviceId: selectedService?._id || "1",
        clientName: clientName,
        clientMobile: clientMobile,
        date: new Date(`${date}T${time}`),
        timeSlot: time,
        note: note,
        price: selectedService?.price || 0,
        status: "pending",
        customerId: customerId
      };

      const headers = { "Content-Type": "application/json" };
      if (customerToken) {
        headers["Authorization"] = `Bearer ${customerToken}`;
      }

      const res = await fetch("http://localhost:5050/appointments", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(appointmentData)
      });

      if (res.ok) {
        alert("Appointment booked successfully!");
        setShowBookingModal(false);
        navigate("/my-bookings");
      } else {
        const err = await res.json();
        setBookingError(err.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setBookingError("An error occurred during booking");
    } finally {
      setBookingLoading(false);
    }
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
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

  if (error || !salon) {
    return (
      <div className="min-h-screen bg-bg-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">Error: {error || "Salon not found"}</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <span>←</span> Back to {isSpa ? "Spa" : "Salon"}
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-1/3 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
              <span className="text-8xl">{isSpa ? "🧖‍♀️" : "💇‍♀️"}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  isSpa ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                }`}>
                  {isSpa ? "Spa" : "Salon"}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{salon.name}</h1>
              
              <p className="text-gray-600 mb-4">
                {salon.description || `Premium ${isSpa ? "spa" : "salon"} services at your fingertips`}
              </p>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-lg">📍</span>
                  <span>{salon.address}, {salon.branchArea}, {salon.pincode}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-lg">📞</span>
                  <span>{salon.contactNumber || salon.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        {staff.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our {isSpa ? "Therapists" : "Stylists"}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {staff.map((member) => (
                <div key={member._id} className="text-center">
                  <img
                    src={member.avatarUrl || "https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow"
                  />
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.profession}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div 
                  key={service._id}
                  className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Duration: {service.duration} mins
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xl font-bold ${isSpa ? "text-secondary" : "text-primary"}`}>
                      ₹{service.price}
                    </span>
                    <button
                      onClick={() => handleBookNow(service)}
                      className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                        isSpa 
                          ? "bg-secondary hover:bg-purple-600" 
                          : "bg-primary hover:bg-secondary"
                      }`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
            <p className="text-gray-600 mb-6">
              {selectedService?.name} {selectedStaff && `with ${staff.find(s => s._id === selectedStaff)?.name}`}
            </p>

            {bookingError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{bookingError}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Staff Selection */}
              {staff.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select {isSpa ? "Therapist" : "Stylist"} (Optional)
                  </label>
                  <select
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any available staff</option>
                    {staff.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} - {member.profession}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile"
                  value={clientMobile}
                  onChange={(e) => setClientMobile(e.target.value)}
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Time *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Special Notes (Optional)
                </label>
                <textarea
                  placeholder="Any special requirements..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 min-h-[80px] focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Service Price</span>
                  <span className={`text-xl font-bold ${isSpa ? "text-secondary" : "text-primary"}`}>
                    ₹{selectedService?.price || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                disabled={bookingLoading}
                className={`px-5 py-2 rounded-xl text-white font-medium disabled:opacity-50 ${
                  isSpa 
                    ? "bg-secondary hover:bg-purple-600" 
                    : "bg-primary hover:bg-secondary"
                }`}
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

