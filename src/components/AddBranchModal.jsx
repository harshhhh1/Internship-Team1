import React, { useState } from "react";
import axios from "axios";

const AddBranchModal = ({ close }) => {
  const [form, setForm] = useState({
    businessName: "",
    type: "Salon",
    area: "",
    address: "",
    pincode: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/salon/add-branch", form);
    alert("Branch added successfully");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#fff7ee] w-full max-w-xl rounded-xl p-6 relative">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">Add New Branch</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter location details and configuration
        </p>

        {/* Upload */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
          <p className="text-sm text-gray-500">
            Click to upload cover image
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-3">
          <input
            name="businessName"
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full p-2 rounded border"
          />

          <div className="flex gap-3">
            <select
              name="type"
              className="w-1/2 p-2 rounded border"
            >
              <option>Salon</option>
            </select>

            <input
              name="area"
              onChange={handleChange}
              placeholder="Branch Area"
              className="w-1/2 p-2 rounded border"
            />
          </div>

          <textarea
            name="address"
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full p-2 rounded border"
          />

          <div className="flex gap-3">
            <input
              name="pincode"
              onChange={handleChange}
              placeholder="Pincode"
              className="w-1/2 p-2 rounded border"
            />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              className="w-1/2 p-2 rounded border"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded-lg mt-4"
          >
            Save Branch
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
