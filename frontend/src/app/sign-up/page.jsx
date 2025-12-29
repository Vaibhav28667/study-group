'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Link from 'next/link';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name too short').max(30, 'Name too long').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/\W/, "Must contain at least one special character")
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password')], 'Passwords must match')
})

const SignUP = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsSubmitting(true);
                const result = await axios.post('http://localhost:5000/user/add', values);
                toast.success("Registration successful! 🎉");
                resetForm();
                router.push('/login');
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || "Registration failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        },
        validationSchema: SignupSchema,
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                        Join Tech Tribe
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Create your account and start learning with others
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl shadow-2xl p-8">

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-3 text-sm font-medium rounded-lg border border-gray-700 bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-purple-500 transition-all duration-300"
                    >
                        <svg className="w-4 h-4" width="46" height="47" viewBox="0 0 46 47" fill="none">
                            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="py-4 flex items-center text-xs text-gray-500 uppercase font-semibold before:flex-1 before:border-t before:border-gray-700 before:me-4 after:flex-1 after:border-t after:border-gray-700 after:ms-4">
                        Or
                    </div>

                    {/* Form */}
                    <form onSubmit={signupForm.handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                                👤 Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.name}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                            />
                            {signupForm.errors.name && signupForm.touched.name && (
                                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                    ⚠️ {signupForm.errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                                📧 Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.email}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                            />
                            {signupForm.errors.email && signupForm.touched.email && (
                                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                    ⚠️ {signupForm.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                                🔐 Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Min 8 chars, uppercase, number & special char"
                                    onChange={signupForm.handleChange}
                                    onBlur={signupForm.handleBlur}
                                    value={signupForm.values.password}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {signupForm.errors.password && signupForm.touched.password && (
                                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                    ⚠️ {signupForm.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                                🔒 Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Re-enter your password"
                                    onChange={signupForm.handleChange}
                                    onBlur={signupForm.handleBlur}
                                    value={signupForm.values.confirmPassword}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
                                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                                    ⚠️ {signupForm.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 py-2">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="mt-1 rounded border-gray-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-300">
                                I agree to the{" "}
                                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium underline">
                                    Terms of Service
                                </a>
                                {" "}and{" "}
                                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                    Creating account...
                                </span>
                            ) : (
                                "✨ Create Account"
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-400 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold underline">
                            Sign in here
                        </Link>
                    </p>
                </div>

                {/* Security Info */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Your data is secure and encrypted. We respect your privacy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUP
