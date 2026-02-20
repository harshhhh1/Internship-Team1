import React, { useState } from 'react';
import { FaTimes, FaStore } from 'react-icons/fa';

const AddSalonModal = ({ isOpen, onClose, onSubmit }) => {
    const [salonData, setSalonData] = useState({
        name: '',
        address: '',
        contactNumber: '',
        type: '',
        branchArea: '',
        pincode: '',
        phoneNumber: '',
        description: '',
        imageUrl: ''
    });

    const handleSalonChange = (e) => {
        const { name, value } = e.target;
        setSalonData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(salonData);
        setSalonData({
            name: '',
            address: '',
            contactNumber: '',
            type: '',
            branchArea: '',
            pincode: '',
            phoneNumber: '',
            description: '',
            imageUrl: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-md animate-in fade-in duration-200 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative zoom-in-95 overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                            <FaStore size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Add New Branch</h2>
                            <p className="text-sm text-gray-500">Enter the details for your new salon branch.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-8 overflow-y-auto scrollbar-hide flex-1">
                    <form id="add-salon-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">

                        {/* Salon Name */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Salon Name</label>
                            <input
                                type="text"
                                name="name"
                                value={salonData.name}
                                onChange={handleSalonChange}
                                required
                                placeholder="e.g. Luxe Beauty Spa"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Type */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Salon</label>
                            <div className="relative">
                                <select
                                    name="type"
                                    value={salonData.type}
                                    onChange={handleSalonChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Hair Salon">Hair Salon</option>
                                    <option value="Beauty Salon">Beauty Salon</option>
                                    <option value="Spa">Spa</option>
                                    <option value="Barber Shop">Barber Shop</option>
                                    <option value="Nail Salon">Nail Salon</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                            <input
                                type="text"
                                name="address"
                                value={salonData.address}
                                onChange={handleSalonChange}
                                required
                                placeholder="Street address, building, suite..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Branch Area */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Branch Area</label>
                            <input
                                type="text"
                                name="branchArea"
                                value={salonData.branchArea}
                                onChange={handleSalonChange}
                                required
                                placeholder="e.g. Downtown"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Pincode */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={salonData.pincode}
                                onChange={handleSalonChange}
                                required
                                placeholder="e.g. 10001"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Contact</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={salonData.contactNumber}
                                onChange={handleSalonChange}
                                required
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Phone</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={salonData.phoneNumber}
                                onChange={handleSalonChange}
                                required
                                placeholder="Backup number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <textarea
                                name="description"
                                value={salonData.description}
                                onChange={handleSalonChange}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 resize-none"
                                placeholder="Tell us more about this branch..."
                            />
                        </div>

                        {/* Image URL */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={salonData.imageUrl}
                                onChange={handleSalonChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer - Pinned */}
                <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3 rounded-b-3xl sticky bottom-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-700 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="add-salon-form"
                        className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-[#7a67e0] transition-all shadow-md shadow-primary/25 active:scale-95"
                    >
                        Confirm & Add Branch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSalonModal;
