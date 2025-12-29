"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('userToken'));
            const user = localStorage.getItem('userName');
            setUserName(user);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/';
    }

    return (
        <nav className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-gradient-to-r from-cyan-500 to-purple-500 border-opacity-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4 md:py-5">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 md:gap-4 shrink-0 group">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                            ⚡
                        </span>
                        <span className="hidden sm:block text-sm md:text-base font-bold text-cyan-400 group-hover:text-cyan-300 transition">{'<'}</span>
                    </div>
                    <span className="hidden sm:block text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        TECH TRIBE
                    </span>
                    <span className="hidden sm:block text-sm md:text-base font-bold text-purple-400 group-hover:text-purple-300 transition">{'>'}</span>
                </Link>

                {/* Hamburger Menu */}
                <button
                    className="md:hidden block text-white text-2xl hover:text-cyan-400 transition"
                    onClick={() => setOpen(!open)}
                >
                    {open ? '✕' : '☰'}
                </button>

                {/* Menu */}
                <ul
                    className={`md:flex md:items-center md:gap-2 absolute md:static bg-gradient-to-b md:bg-transparent from-slate-900 via-slate-800 to-slate-900 w-full left-0 
          md:w-auto transition-all duration-300 ease-in-out 
         ${open ? "top-[72px] opacity-100 shadow-2xl" : "top-[-500px] opacity-0 md:opacity-100"} md:top-0`}
                >
                    <li>
                        <Link
                            href="/"
                            className="block px-5 py-3 md:py-2.5 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 md:hover:bg-transparent rounded-lg md:rounded-full md:hover:border md:hover:border-cyan-500 md:hover:border-opacity-30 transition-all duration-300"
                            onClick={() => setOpen(false)}
                        >
                            🏠 Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/browse-groups"
                            className="block px-5 py-3 md:py-2.5 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 md:hover:bg-transparent rounded-lg md:rounded-full md:hover:border md:hover:border-cyan-500 md:hover:border-opacity-30 transition-all duration-300"
                            onClick={() => setOpen(false)}
                        >
                            🔍 Browse
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/my-groups"
                            className="block px-5 py-3 md:py-2.5 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 md:hover:bg-transparent rounded-lg md:rounded-full md:hover:border md:hover:border-cyan-500 md:hover:border-opacity-30 transition-all duration-300"
                            onClick={() => setOpen(false)}
                        >
                            👥 My Groups
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/sharing-resource"
                            className="block px-5 py-3 md:py-2.5 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 md:hover:bg-transparent rounded-lg md:rounded-full md:hover:border md:hover:border-cyan-500 md:hover:border-opacity-30 transition-all duration-300"
                            onClick={() => setOpen(false)}
                        >
                            📚 Resources
                        </Link>
                    </li>

                    {token && (
                        <li>
                            <Link
                                href="/add-detail"
                                className="block px-5 py-3 md:py-2.5 text-gray-300 hover:text-purple-300 hover:bg-purple-500 hover:bg-opacity-10 md:hover:bg-transparent rounded-lg md:rounded-full md:hover:border md:hover:border-purple-500 md:hover:border-opacity-30 transition-all duration-300"
                                onClick={() => setOpen(false)}
                            >
                                ➕ Create
                            </Link>
                        </li>
                    )}

                    {/* CTA Button Section */}
                    <li className="px-5 py-4 md:py-0 md:pl-6 md:ml-2 border-t md:border-t-0 md:border-l border-gray-700 md:border-opacity-20">
                        {token ? (
                            <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800 border border-cyan-500 border-opacity-20 md:border-0 md:bg-transparent">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                        {userName?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                    <span className="hidden md:block text-sm text-gray-300 font-semibold">
                                        {userName || 'User'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                    className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-3">
                                <Link
                                    href="/login"
                                    className="block text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={() => setOpen(false)}
                                >
                                    🔐 Login
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={() => setOpen(false)}
                                >
                                    ✨ Sign Up
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
