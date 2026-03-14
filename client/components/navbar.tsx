"use client"
import { useState } from "react";

export default function Navbar() {
  
  type DropdownType = "services" | "products" | "pricing";
  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(null);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50">
  <nav
  className="
   mt-4 w-[90%] h-[60] max-w-5xl
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  text-black
  rounded-full
  px-8 py-4
  flex items-center justify-between
  shadow-2xl
  "
>

        {/* LEFT LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-black font-bold w-8 h-8 flex items-center justify-center rounded-md">
            A
          </div>
          <span className="font-semibold text-lg">Veylox</span>
        </div>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-10 relative">

          {/* SERVICES */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-gray-300 transition">
              Services
            </button>

            {activeDropdown === "services" && (
              <div className="absolute top-10 left-0 bg-black rounded-2xl p-6 w-64 shadow-xl">
                <ul className="space-y-4 text-gray-300">
                  <li className="hover:text-white cursor-pointer">Web Development</li>
                  <li className="hover:text-white cursor-pointer">Interface Design</li>
                  <li className="hover:text-white cursor-pointer">Search Engine Optimization</li>
                  <li className="hover:text-white cursor-pointer">Branding</li>
                </ul>
              </div>
            )}
          </div>

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-gray-300 transition">
              Products
            </button>

            {activeDropdown === "products" && (
              <div className="absolute top-10 -left-40 bg-black rounded-2xl p-6 w-[500px] shadow-xl flex gap-6">

                <div className="w-1/2">
                  <div className="bg-gray-800 h-24 rounded-lg mb-3"></div>
                  <h3 className="font-semibold">Algochurn</h3>
                  <p className="text-gray-400 text-sm">
                    Prepare for tech interviews like never before.
                  </p>
                </div>

                <div className="w-1/2">
                  <div className="bg-gray-800 h-24 rounded-lg mb-3"></div>
                  <h3 className="font-semibold">Tailwind Master Kit</h3>
                  <p className="text-gray-400 text-sm">
                    Production ready Tailwind components.
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* PRICING */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("pricing")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-gray-300 transition">
              Pricing
            </button>

            {activeDropdown === "pricing" && (
              <div className="absolute top-10 left-0 bg-black rounded-2xl p-6 w-48 shadow-xl">
                <ul className="space-y-3 text-gray-300">
                  <li className="hover:text-white cursor-pointer">Hobby</li>
                  <li className="hover:text-white cursor-pointer">Individual</li>
                  <li className="hover:text-white cursor-pointer">Team</li>
                  <li className="hover:text-white cursor-pointer">Enterprise</li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT CTA */}
        <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:scale-105 transition">
          Book a call
        </button>
      </nav>
    </div>
  );
}