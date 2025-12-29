import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-100">

            {/* Header Section */}
            <header className="flex-1 flex flex-col justify-center items-center text-center py-20 px-6 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                <div className="relative z-10">
                    {/* Tech Tribe Logo with Advanced Animations */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative animate-float">
                            {/* Animated background glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-3xl opacity-40 -z-10 animate-glow-pulse"></div>

                            {/* Rotating outer ring */}
                            <div className="absolute -inset-6 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-border animate-spin-slow opacity-50"></div>

                            <svg
                                className="w-32 h-32 md:w-40 md:h-40 relative z-10"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Background circle with gradient */}
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a78bfa" />
                                        <stop offset="50%" stopColor="#ec4899" />
                                        <stop offset="100%" stopColor="#60a5fa" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Outer circle with filter */}
                                <circle cx="100" cy="100" r="95" stroke="url(#logoGradient)" strokeWidth="3" opacity="0.8" filter="url(#glow)" />

                                {/* Inner decorative circle */}
                                <circle cx="100" cy="100" r="85" fill="none" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.4" />

                                {/* Central brain/knowledge icon */}
                                <g transform="translate(100, 100)">
                                    {/* Brain lobes with glow */}
                                    <circle cx="-20" cy="-15" r="15" fill="url(#logoGradient)" opacity="0.9" filter="url(#glow)" />
                                    <circle cx="20" cy="-15" r="15" fill="url(#logoGradient)" opacity="0.9" filter="url(#glow)" />
                                    <circle cx="-15" cy="15" r="12" fill="url(#logoGradient)" opacity="0.8" filter="url(#glow)" />
                                    <circle cx="15" cy="15" r="12" fill="url(#logoGradient)" opacity="0.8" filter="url(#glow)" />

                                    {/* Connecting lines (neurons) */}
                                    <line x1="-20" y1="0" x2="20" y2="0" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />
                                    <line x1="0" y1="-15" x2="0" y2="15" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />

                                    {/* Center dot pulsing */}
                                    <circle cx="0" cy="0" r="4" fill="url(#logoGradient)" filter="url(#glow)" />
                                </g>
                            </svg>

                            {/* Decorative animated circles */}
                            <div className="absolute -inset-4 rounded-full border border-purple-500 border-opacity-30 animate-pulse-scale"></div>
                            <div className="absolute -inset-8 rounded-full border border-pink-500 border-opacity-20 animate-rotate-circle"></div>
                        </div>
                    </div>

                    {/* Brand name with logo */}
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            TECH TRIBE
                        </h1>
                        <p className="text-sm md:text-base text-gray-400 font-semibold tracking-widest">
                            Learn. Connect. Grow.
                        </p>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                        Find Your Perfect Study Group
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300 leading-relaxed">
                        Connect with passionate learners, share knowledge, and ace your studies together. Join or create study groups tailored to your interests.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/browse-groups" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                            🔍 Explore Groups
                        </Link>
                        <Link href="/add-detail" className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                            ➕ Create a Group
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">500+</div>
                            <p className="text-gray-400 text-sm mt-2">Active Groups</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-400">10K+</div>
                            <p className="text-gray-400 text-sm mt-2">Study Members</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">50+</div>
                            <p className="text-gray-400 text-sm mt-2">Subjects</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Footer */}
            <footer className="bg-slate-900 text-gray-400 py-8 border-t border-purple-500 border-opacity-30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <p className="text-sm">© 2025 Tech Tribe — Study Group Finder. All Rights Reserved.</p>
                        <p className="text-xs text-gray-500 mt-2">Empowering learners to grow together</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
