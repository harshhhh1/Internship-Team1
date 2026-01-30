import React from 'react'

function LoginForm() {
  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Enter your email" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" type="password" placeholder="Enter your password" />
        </div>
        <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2">
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-primary hover:text-secondary font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}


export default LoginForm
