import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
    const [salons, setSalons] = useState([]);
    const [staffMembers, setStaffMembers] = useState([]);
    const [services, setServices] = useState([]);

    const [selectedSalon, setSelectedSalon] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientMobile, setClientMobile] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Fetch salons on mount
    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const res = await fetch("http://localhost:5050/salons");
                const data = await res.json();
                setSalons(data);
            } catch (err) {
                console.error("Error fetching salons:", err);
            }
        };
        fetchSalons();
    }, []);

    const defaultServices = [
        { _id: "1", name: "Hair Styling & Cutting", duration: "45", price: "500" },
        { _id: "2", name: "Express Facial", duration: "30", price: "800" },
        { _id: "3", name: "Spa & Massage", duration: "60", price: "1200" },
        { _id: "4", name: "Skin Consultation", duration: "20", price: "300" },
        { _id: "5", name: "Coloring & Highlights", duration: "120", price: "2500" },
        { _id: "6", name: "Beauty Products", duration: "15", price: "1000" },
        { _id: "7", name: "Manicure & Pedicure", duration: "60", price: "700" },
        { _id: "8", name: "Bridal Packages", duration: "180", price: "5000" },
    ];

    // Fetch staff and services when salon is selected
    useEffect(() => {
        if (selectedSalon) {
            const fetchData = async () => {
                try {
                    // Fetch staff
                    const staffRes = await fetch(`http://localhost:5050/staff?salonId=${selectedSalon}`);
                    const staffData = await staffRes.json();
                    setStaffMembers(staffData);

                    // Fetch services
                    const servicesRes = await fetch(`http://localhost:5050/services?salonId=${selectedSalon}`);
                    const servicesData = await servicesRes.json();

                    // If backend returns services, use them. Otherwise, use defaults.
                    if (servicesData && servicesData.length > 0) {
                        setServices(servicesData);
                    } else {
                        setServices(defaultServices);
                    }
                } catch (err) {
                    console.error("Error fetching salon data:", err);
                    setServices(defaultServices); // Fallback on error
                }
            };
            fetchData();
        } else {
            setStaffMembers([]);
            setServices([]);
            setSelectedStaff("");
            setSelectedService(null);
        }
    }, [selectedSalon]);

    const openBooking = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!date || !time || !clientName || !clientMobile) {
            alert("Please fill in all required fields (Name, Mobile, Date, Time)");
            return;
        }

        setLoading(true);
        try {
            const appointmentData = {
                salonId: selectedSalon,
                staffId: selectedStaff || null,
                serviceId: selectedService._id,
                clientName: clientName,
                clientMobile: clientMobile,
                date: new Date(`${date}T${time}`),
                note: note,
                price: selectedService.price,
                status: "pending"
            };

            const res = await fetch("http://localhost:5050/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData)
            });

            if (res.ok) {
                alert("Appointment scheduled successfully!");
                setShowModal(false);
                navigate("/");
            } else {
                const err = await res.json();
                alert(err.message || "Failed to schedule appointment");
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert("An error occurred during booking");
        } finally {
            setLoading(false);
        }
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

                <div className="space-y-12">
                    {/* Step 1: Salon */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <label className="block text-lg font-semibold mb-6">
                            Step 1: Select Salon
                        </label>
                        <div className="flex flex-wrap gap-6">
                            {salons.map((salon) => (
                                <div
                                    key={salon._id}
                                    onClick={() => setSelectedSalon(salon._id)}
                                    className={`flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all min-w-[200px] flex-1 sm:flex-none ${selectedSalon === salon._id
                                        ? "border-primary bg-primary/5 shadow-md scale-105"
                                        : "border-gray-100 hover:border-gray-300 shadow-sm"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            🏢
                                        </div>
                                        <span className="text-lg font-bold text-gray-800">{salon.name}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-13">
                                        {salon.branchArea || salon.address || "Main Branch"}
                                    </p>
                                </div>
                            ))}
                            {salons.length === 0 && (
                                <p className="text-gray-400 italic">No salons available at the moment.</p>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Staff */}
                    {selectedSalon && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 mb-8">
                            <label className="block text-lg font-semibold mb-6">
                                Step 2: Choose Stylist
                            </label>
                            <div className="flex flex-wrap gap-6">
                                {staffMembers.length > 0 ? (
                                    staffMembers.map((staff) => (
                                        <div
                                            key={staff._id}
                                            onClick={() => setSelectedStaff(staff._id)}
                                            className={`flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all min-w-[140px] flex-1 sm:flex-none ${selectedStaff === staff._id
                                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                                : "border-gray-100 hover:border-gray-300"
                                                }`}
                                        >
                                            <img
                                                src={staff.avatarUrl || "https://res.cloudinary.com/dgh9uunif/image/upload/v1768719858/Wavy_Buddies_-_Avatar_5_gdbuhf.webp"}
                                                alt={staff.name}
                                                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white shadow-sm"
                                            />
                                            <span className="text-base font-bold text-gray-800">{staff.name}</span>
                                            <span className="text-sm text-gray-500">{staff.profession}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">No staff available for this salon.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 3: Services */}
                {selectedStaff && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6">
                            Step 3: Choose Service
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service._id}
                                    onClick={() => openBooking(service)}
                                    className="bg-white rounded-2xl border p-6 cursor-pointer shadow hover:shadow-xl transition-all hover:border-primary group"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Duration: {service.duration} mins
                                    </p>
                                    <p className="text-primary font-bold mt-3 text-lg">
                                        ₹{service.price}
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
                            {selectedService.name} {selectedStaff && `with ${staffMembers.find(s => s._id === selectedStaff)?.name}`}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={clientMobile}
                                    onChange={(e) => setClientMobile(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        className="w-full border rounded-xl px-4 py-3 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        className="w-full border rounded-xl px-4 py-3 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <textarea
                                placeholder="Special notes (optional)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3 min-h-[100px]"
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
                                disabled={loading}
                                className="px-5 py-2 rounded-xl bg-primary text-white hover:bg-secondary shadow-md disabled:bg-gray-400"
                            >
                                {loading ? "Scheduling..." : "Schedule Appointment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};