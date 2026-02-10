import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    email: "",
    password: "",
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
      <select name="role" onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
