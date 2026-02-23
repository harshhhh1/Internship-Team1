import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    if (!nameRegex.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  // Get password strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength <= 2) return { label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    let fieldError = "";
    switch (name) {
      case 'name':
        fieldError = validateName(value);
        break;
      case 'email':
        fieldError = validateEmail(value);
        break;
      case 'phone':
        fieldError = validatePhone(value);
        break;
      case 'password':
        fieldError = validatePassword(value);
        // Also validate confirm password if it has been touched
        if (touched.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword':
        fieldError = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    let fieldError = "";
    switch (name) {
      case 'name':
        fieldError = validateName(formData.name);
        break;
      case 'email':
        fieldError = validateEmail(formData.email);
        break;
      case 'phone':
        fieldError = validatePhone(formData.phone);
        break;
      case 'password':
        fieldError = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        fieldError = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password)
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    });
    
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/customer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and redirect
        localStorage.setItem('customerToken', data.token);
        localStorage.setItem('customerId', data.customer.id);
        localStorage.setItem('customerName', data.customer.name);
        localStorage.setItem('userRole', 'customer');
        navigate('/book-appointment');
      } else {
        setErrors(prev => ({ ...prev, global: data.message || "Signup failed" }));
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors(prev => ({ ...prev, global: "An error occurred during signup" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Customer Sign Up</h2>
      <p className="text-center text-gray-500 mb-8">Create an account to book appointments</p>
      
      {/* Global Error Message */}
      {errors.global && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm text-center">
          {errors.global}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg border ${errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            placeholder="Enter your name"
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            placeholder="Enter your email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone && touched.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            placeholder="Enter your phone number"
            maxLength={10}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg border ${errors.password && touched.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            placeholder="Create a password"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getPasswordStrengthLabel(getPasswordStrength(formData.password)).color}`}
                    style={{ width: `${(getPasswordStrength(formData.password) / 6) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {getPasswordStrengthLabel(getPasswordStrength(formData.password)).label}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-4 disabled:bg-gray-400"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/customer-login" className="text-primary hover:text-secondary font-medium">Login</a>
        </p>
      </form>
    </div>
  );
}
