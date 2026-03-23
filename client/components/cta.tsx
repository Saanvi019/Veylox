"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="-mb-10 px-8 bg-[#f5f9ff]">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl bg-[#0a1738] px-10 py-16 md:px-16 md:py-20 text-white">

          {/* RIGHT RADIAL EFFECT */}
          <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full 
          bg-gradient-to-r from-[#d0833f]/90 to-transparent blur-4xl opacity-60"></div>

          <div className="absolute -bottom-8 right-[250px] w-[230px] h-[230px] rounded-full 
bg-[#d0833f] blur-4xl opacity-70 pointer-events-none"></div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-xl">

            <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-bricolage)] leading-tight">
              Take control of your API keys today
            </h2>

            <p className="mt-6 text-blue-200 font-sans">
              Start for free. No credit card required.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/signup"
                className="bg-[#d0833f] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="bg-white/10 border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}