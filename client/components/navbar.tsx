"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50">
      
      <nav
        className="
        mt-4 w-[90%] max-w-5xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-full
        px-8 py-4
        flex items-center justify-between
        shadow-2xl
        text-black
        "
      >

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-black font-bold w-8 h-8 flex items-center justify-center rounded-md">
            V
          </div>
          <span className="font-semibold text-lg">Veylox</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          <a href="#features" className="hover:text-gray-600 transition">
            Features
          </a>

          <a href="#how" className="hover:text-gray-600 transition">
            How It Works
          </a>

          <a href="#security" className="hover:text-gray-600 transition">
            Security
          </a>

          <a href="#pricing" className="hover:text-gray-600 transition">
            Pricing
          </a>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <Link href="/login" className="text-sm hover:text-gray-600">
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#d0833f] text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition"
          >
            Get Started
          </Link>

        </div>

      </nav>
    </div>
  );
}