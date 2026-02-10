import { useState } from "react";
import axios from "axios";

export default function AddStaff({ salonId, refresh }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    contact: "",
    email: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/staff/add", {
      ...form,
      salon: salonId
    });
    setForm({ name: "", role: "", contact: "", email: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Staff</h2>

      <input className="input" name="name" placeholder="Name" onChange={handleChange} />
      <input className="input" name="role" placeholder="Role" onChange={handleChange} />
      <input className="input" name="contact" placeholder="Contact" onChange={handleChange} />
      <input className="input" name="email" placeholder="Email" onChange={handleChange} />

      <button className="mt-4 w-full bg-black text-white py-2 rounded">
        Add Staff
      </button>
    </form>
  );
}
