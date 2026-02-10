import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // ✅ Save token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ ROLE BASED REDIRECT
      if (data.role === "staff") {
        navigate("/staff-dashboard");
      } else if (data.role === "admin") {
        navigate("/manager-dashboard");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select name="role" onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Enter your email" type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2">
            Login
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <a href="/signup" className="text-primary hover:text-secondary font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
