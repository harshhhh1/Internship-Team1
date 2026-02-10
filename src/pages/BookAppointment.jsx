import React, { useState } from "react";

const salons = ["Luxe Andheri", "Luxe Bandra", "Luxe Thane"];
const staffMembers = ["Riya", "Amit", "Neha"];

const services = [
  { name: "Haircut", duration: "30 mins", price: "₹499" },
  { name: "Hair Spa", duration: "60 mins", price: "₹999" },
  { name: "Facial", duration: "45 mins", price: "₹799" },
  { name: "Makeup", duration: "90 mins", price: "₹1999" },
  { name: "Manicure", duration: "40 mins", price: "₹599" },
  { name: "Pedicure", duration: "50 mins", price: "₹699" },
];

export default function BookAppointment() {
  const [selectedSalon, setSelectedSalon] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const openBooking = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const confirmBooking = () => {
    alert(
      `Booked ${selectedService.name} on ${date} at ${time}`
    );
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-bg-light py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Book Your <span className="text-primary">Appointment</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Choose your preferred salon, stylist & service
          </p>
        </div>

        {/* Step 1 & 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Salon */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Step 1: Select Salon
              </label>
              <select
                value={selectedSalon}
                onChange={(e) => setSelectedSalon(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Choose a salon</option>
                {salons.map((salon, i) => (
                  <option key={i}>{salon}</option>
                ))}
              </select>
            </div>

            {/* Staff */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Step 2: Select Staff
              </label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                disabled={!selectedSalon}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none disabled:bg-gray-100"
              >
                <option value="">Choose staff</option>
                {staffMembers.map((staff, i) => (
                  <option key={i}>{staff}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Step 3: Services */}
        {selectedStaff && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Step 3: Choose Service
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  onClick={() => openBooking(service)}
                  className="bg-white rounded-2xl border p-6 cursor-pointer shadow hover:shadow-xl transition-all hover:border-primary"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Duration: {service.duration}
                  </p>
                  <p className="text-primary font-bold mt-3">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in">
            <h3 className="text-xl font-bold mb-2">
              Confirm Appointment
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedService.name} with {selectedStaff}
            </p>

            <div className="space-y-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-5 py-2 rounded-xl bg-primary text-white hover:bg-secondary shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
