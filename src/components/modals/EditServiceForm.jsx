import React, { useState, useEffect } from "react";

export default function EditServiceForm({ isOpen, onClose, onSave, service, salonId }) {
    const [form, setForm] = useState({
        name: "",
        categoryId: "",
        description: "",
        price: "",
        duration: "",
        image: null,
        status: true,
        notes: "",
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (isOpen && salonId) {
            fetchCategories();
        }
    }, [isOpen, salonId]);

    useEffect(() => {
        if (service) {
            setForm({
                name: service.name || "",
                categoryId: service.categoryId?._id || service.categoryId || "",
                description: service.description || "",
                price: service.price || "",
                duration: service.duration || "",
                image: null,
                status: service.status ?? true,
                notes: service.notes || "",
            });
        }
    }, [service]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`http://localhost:5050/categories?salonId=${salonId}`);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") setForm({ ...form, [name]: checked });
        else if (type === "file") setForm({ ...form, [name]: files[0] });
        else setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.categoryId || !form.price || !form.duration) {
            alert("Please fill all required fields!");
            return;
        }
        onSave({ ...form, _id: service._id, salonId });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border-t-4 border-purple-600">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">Edit Service</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Service Name */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Service Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g., Men's Haircut"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Category *</label>
                        <select
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Short description of the service"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Price & Duration */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-medium text-gray-700 mb-1">Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="₹500"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                            <input
                                type="number"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                placeholder="30"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="status"
                            checked={form.status}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label className="font-medium text-gray-700">Active</label>
                    </div>

                    {/* Special Notes */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Special Notes</label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Optional notes"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Update Service
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
