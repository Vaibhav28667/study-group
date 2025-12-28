"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-400">
                    TECH TRIBE
                </Link>

                {/* Hamburger Menu */}
                <button
                    className="md:hidden block text-white"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                {/* Menu */}
                <ul
                    className={`md:flex md:items-center md:gap-6 absolute md:static bg-gray-900 w-full left-0 
          md:w-auto transition-all duration-300 ease-in-out 
         ${open ? "top-16 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"}`}
                >
                    <li>
                        <Link href="/" className="block py-2 md:py-0 hover:text-blue-400">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/groups"
                            className="block py-2 md:py-0 hover:text-blue-400"
                        >
                            Browse Groups 
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/add-details"
                            className="block py-2 md:py-0 hover:text-blue-400"
                        >
                         add-detail
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/view-details"
                            className="block py-2 md:py-0 hover:text-blue-400"
                        >
                            View Details
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/profile"
                            className="block py-2 md:py-0 hover:text-blue-400"
                        >
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
