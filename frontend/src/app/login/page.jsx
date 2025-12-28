'use client'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is mandatory'),
    password: Yup.string().min(7, 'Password too short').required('Password is mandatory..!')
})

const Login = () => {

    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            console.log(values);

            axios.post('http://localhost:5000/user/authenticate', values)
                .then((result) => {
                    console.log(result);
                    toast.success("Login Successfully");
                    localStorage.setItem('userToken', result.data.token)
                    localStorage.setItem('userId', result.data.userId)
                    router.push('/browse-groups');
                }).catch((err) => {
                    console.log(err);
                    toast.error("Login failed")
                })

        },
        validationSchema: LoginSchema,
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="w-full bg-slate-800 shadow-lg py-4 px-8 flex justify-between items-center border-b border-purple-500 border-opacity-30">
                <Link href="/">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">Tech Tribe</h1>
                </Link>
                <ul className="flex gap-6 text-lg font-medium">
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
            </nav>

            {/* Login Form */}
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
                <div className="w-full max-w-md bg-slate-800 border border-purple-500 border-opacity-30 rounded-2xl shadow-2xl">
                    <div className="p-8">
                        <div className="text-center">
                            <h1 className="block text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                                Sign in
                            </h1>
                            <p className="mt-3 text-sm text-gray-400">
                                Don't have an account yet?
                                <Link
                                    className="text-purple-400 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ms-1"
                                    href="/sign-up"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8">
                            <button
                                type="button"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-purple-500 border-opacity-30 bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-purple-400 transition"
                            >
                                <svg
                                    className="w-4 h-auto"
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
                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-purple-500 before:border-opacity-30 before:me-6 after:flex-1 after:border-t after:border-purple-500 after:border-opacity-30 after:ms-6">
                                Or
                            </div>

                            {/* Form */}
                            <form onSubmit={loginForm.handleSubmit}>
                                <div className="grid gap-y-4">
                                    {/* Email Input */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm mb-2 text-gray-300"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={loginForm.handleChange}
                                            value={loginForm.values.email}
                                            className="py-3 px-4 block w-full border border-purple-500 border-opacity-30 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                                            placeholder="Enter your email"
                                            required
                                        />
                                        {
                                            (loginForm.errors.email && loginForm.touched.email) && (
                                                <p className="text-xs text-red-400 mt-2">
                                                    {loginForm.errors.email}
                                                </p>
                                            )
                                        }
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <div className="flex flex-wrap justify-between items-center gap-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm mb-2 text-gray-300"
                                            >
                                                Password
                                            </label>
                                            <Link
                                                className="inline-flex items-center gap-x-1 text-sm text-purple-400 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                                                href="#"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={loginForm.handleChange}
                                            value={loginForm.values.password}
                                            className="py-3 px-4 block w-full border border-purple-500 border-opacity-30 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        {
                                            (loginForm.errors.password && loginForm.touched.password) && (
                                                <p className="text-xs text-red-400 mt-2">
                                                    {loginForm.errors.password}
                                                </p>
                                            )
                                        }
                                    </div>

                                    {/* Remember Me Checkbox */}
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="shrink-0 mt-0.5 border-purple-500 border-opacity-30 rounded-sm text-purple-600 focus:ring-purple-500 bg-slate-700"
                                        />
                                        <label htmlFor="remember-me" className="text-sm text-gray-300 ms-3">
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition shadow-lg hover:shadow-purple-500/50"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;