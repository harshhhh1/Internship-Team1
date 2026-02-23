import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const navigate = useNavigate();

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedCustomerEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Handle account lockout timer
  useEffect(() => {
    let interval;
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    let fieldError = "";
    if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'password') {
      fieldError = validatePassword(value);
    }
    
    setErrors(prev => ({ ...prev, [name]: fieldError, global: null }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    let fieldError = "";
    if (name === 'email') {
      fieldError = validateEmail(formData.email);
    } else if (name === 'password') {
      fieldError = validatePassword(formData.password);
    }
    
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };
    
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setErrors(prev => ({ 
        ...prev, 
        global: `Account temporarily locked. Please try again in ${lockTimer} seconds.` 
      }));
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/customer/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset login attempts on success
        setLoginAttempts(0);
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedCustomerEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedCustomerEmail');
        }
        
        // Store customer token and info
        localStorage.setItem('customerToken', data.token);
        localStorage.setItem('customerId', data.customer.id);
        localStorage.setItem('customerName', data.customer.name);
        localStorage.setItem('userRole', 'customer');
        
        // Redirect to booking page
        navigate('/book-appointment');
      } else {
        // Increment login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          setIsLocked(true);
          setLockTimer(300); // 5 minutes lockout
          setErrors(prev => ({ 
            ...prev, 
            global: "Too many failed attempts. Account locked for 5 minutes." 
          }));
        } else {
          const remainingAttempts = 5 - newAttempts;
          setErrors(prev => ({ 
            ...prev, 
            global: `${data.message || "Login failed"}. ${remainingAttempts} attempts remaining.` 
          }));
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(prev => ({ ...prev, global: "An error occurred during login. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Customer Login</h2>
      <p className="text-center text-gray-500 mb-8">Login to book appointments</p>
      
      {/* Global Error Message */}
      {errors.global && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm text-center">
          {errors.global}
        </div>
      )}
      
      {/* Lockout Warning */}
      {loginAttempts > 0 && loginAttempts < 5 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg mb-4 text-xs text-center">
          Warning: {5 - loginAttempts} login attempts remaining before temporary lockout
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={isLocked}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all disabled:bg-gray-100`}
            placeholder="Enter your email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isLocked}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password && touched.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all disabled:bg-gray-100 pr-12`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex="-1"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm text-primary hover:text-secondary font-medium">
            Forgot password?
          </a>
        </div>
        <button 
          type="submit" 
          disabled={loading || isLocked}
          className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2 disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : isLocked ? `Locked (${lockTimer}s)` : 'Login'}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/customer-signup" className="text-primary hover:text-secondary font-medium">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default CustomerLogin;
