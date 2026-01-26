import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-100 relative overflow-hidden">
            {/* Fixed background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Header Section */}
            <header className="flex-1 flex flex-col justify-center items-center text-center py-20 px-6 relative z-10">
                <div className="relative z-10 animate-fade-in max-w-4xl">
                    {/* Tech Tribe Logo with Advanced Animations */}
                    <div className="mb-12 flex justify-center animate-scale-in">
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
                                aria-label="Tech Tribe Logo"
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
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3 animate-text-shimmer">
                            TECH TRIBE
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 font-semibold tracking-widest animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            Learn. Connect. Grow.
                        </p>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        Find Your Perfect Study Group
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        Connect with passionate learners, share knowledge, and ace your studies together. Join or create study groups tailored to your interests.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up mb-16" style={{ animationDelay: '0.7s' }}>
                        <Link href="/browse-groups" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 animate-button-glow hover:animate-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300">
                            🔍 Explore Groups
                        </Link>
                        <Link href="/add-detail" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 animate-button-glow hover:animate-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300" style={{ animationDelay: '0.1s' }}>
                            ➕ Create a Group
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center animate-fade-in-up p-6 rounded-xl bg-slate-800 bg-opacity-40 border border-purple-500 border-opacity-10 hover:border-opacity-30 transition-all" style={{ animationDelay: '0.8s' }}>
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-count-up">500+</div>
                            <p className="text-gray-400 text-sm">Active Groups</p>
                        </div>
                        <div className="text-center animate-fade-in-up p-6 rounded-xl bg-slate-800 bg-opacity-40 border border-pink-500 border-opacity-10 hover:border-opacity-30 transition-all" style={{ animationDelay: '0.9s' }}>
                            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-count-up" style={{ animationDelay: '0.2s' }}>10K+</div>
                            <p className="text-gray-400 text-sm">Study Members</p>
                        </div>
                        <div className="text-center animate-fade-in-up p-6 rounded-xl bg-slate-800 bg-opacity-40 border border-blue-500 border-opacity-10 hover:border-opacity-30 transition-all" style={{ animationDelay: '1s' }}>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-count-up" style={{ animationDelay: '0.4s' }}>50+</div>
                            <p className="text-gray-400 text-sm">Subjects</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Footer */}
            <footer className="bg-slate-900 bg-opacity-80 text-gray-400 py-10 border-t border-purple-500 border-opacity-30 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium">© 2025 Tech Tribe — Study Group Finder. All Rights Reserved.</p>
                        <p className="text-xs text-gray-500">Empowering learners to grow together</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
