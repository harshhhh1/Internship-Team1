import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Update global user context
      setUser(res.data.user);

      // Navigate to profile page
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:text-secondary font-medium">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
