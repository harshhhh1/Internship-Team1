import React, { useState } from "react";

export default function AddServiceForm({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    image: null,
    status: true,
    notes: "",
  });

  const [categories, setCategories] = useState(["Hair", "Nails", "Spa", "Massage"]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.duration) {
      alert("Please fill all required fields!");
      return;
    }
    onSave(form);
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      image: null,
      status: true,
      notes: "",
    });
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setForm({ ...form, category: newCategory });
    }
    setNewCategory("");
    setShowAddCategory(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border-t-4 border-purple-600">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Add New Service</h2>
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

          {/* Category with inline add */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category *</label>
            <div className="flex gap-2 items-center">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                + Add
              </button>
            </div>
            {showAddCategory && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            )}
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

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Image Upload</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
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
              Add Service
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
