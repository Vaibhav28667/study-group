import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100">
          
            {/* Header Section */}
            <header className="flex-1 flex flex-col justify-center items-center text-center py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Find or Create Your Perfect Study Group</h2>
                <p className="text-xl max-w-2xl mb-8 text-gray-300">
                    Connect, collaborate, and grow with like-minded learners across various subjects.
                </p>
                <Link href="/browse-groups" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 transition-all">
                    Explore Groups
                </Link>
            </header>

            {/* Footer */}
            <footer className="bg-slate-800 text-gray-300 py-6 flex justify-center items-center mt-10 border-t border-purple-500 border-opacity-30">
                <p className="text-center text-sm">© 2025 Tech Tribe — Study Group Finder. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
