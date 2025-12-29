'use client'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(7, 'Password too short').required('Password is required')
})

const Login = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const result = await axios.post('http://localhost:5000/user/authenticate', values)
                toast.success("Login successful! 🎉");
                localStorage.setItem('userToken', result.data.token)
                localStorage.setItem('userId', result.data.userId)
                localStorage.setItem('userName', values.email)
                router.push('/browse-groups');
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || "Login failed. Please check your credentials.")
            } finally {
                setIsSubmitting(false);
            }
        },
        validationSchema: LoginSchema,
    })

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
            {/* Navbar */}
            <nav className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-lg py-4 px-6 md:px-8 border-b border-purple-500 border-opacity-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
                            TECH TRIBE
                        </h1>
                    </Link>
                    <ul className="hidden md:flex gap-8 text-base font-medium">
                        <li>
                            <Link href="/" className="text-gray-300 hover:text-purple-400 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/browse-groups" className="text-gray-300 hover:text-purple-400 transition">
                                Browse Groups
                            </Link>
                        </li>
                        <li>
                            <Link href="/sign-up" className="text-gray-300 hover:text-purple-400 transition">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Login Form */}
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Sign in to your Tech Tribe account
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl shadow-2xl p-8">
                        {/* Google OAuth Button */}
                        <button
                            type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-3 text-sm font-medium rounded-lg border border-gray-700 bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-purple-500 transition-all duration-300"
                        >
                            <svg
                                className="w-4 h-4"
                                width={46}
                                height={47}
                                viewBox="0 0 46 47"
                                fill="none"
                            >
                                <path
                                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                                    fill="#EB4335"
                                />
                            </svg>
                            Sign in with Google
                        </button>

                        <div className="py-4 flex items-center text-xs text-gray-500 uppercase font-semibold before:flex-1 before:border-t before:border-gray-700 before:me-4 after:flex-1 after:border-t after:border-gray-700 after:ms-4">
                            Or
                        </div>

                        {/* Form */}
                        <form onSubmit={loginForm.handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-200 mb-2"
                                >
                                    📧 Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={loginForm.handleChange}
                                    onBlur={loginForm.handleBlur}
                                    value={loginForm.values.email}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                                {
                                    (loginForm.errors.email && loginForm.touched.email) && (
                                        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                            ⚠️ {loginForm.errors.email}
                                        </p>
                                    )
                                }
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-200"
                                    >
                                        🔐 Password
                                    </label>
                                    <Link
                                        className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline"
                                        href="#"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        onChange={loginForm.handleChange}
                                        onBlur={loginForm.handleBlur}
                                        value={loginForm.values.password}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all pr-10"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {
                                    (loginForm.errors.password && loginForm.touched.password) && (
                                        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                            ⚠️ {loginForm.errors.password}
                                        </p>
                                    )
                                }
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="rounded border-gray-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="remember-me" className="text-sm text-gray-300">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    "🚀 Sign In"
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Don't have an account?{" "}
                            <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 font-semibold underline">
                                Create one here
                            </Link>
                        </p>
                    </div>

                    {/* Security Info */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            🔒 Your credentials are secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;