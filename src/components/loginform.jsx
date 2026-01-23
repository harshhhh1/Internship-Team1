import React from 'react'

function LoginForm() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h2>
                <p className="mb-4 text-sm text-red-600 text-center">

                </p>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required

                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"

                    className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                </button>
            </form>
        </div>
    )
}


export default LoginForm
