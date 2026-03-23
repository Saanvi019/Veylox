"use client";

import Link from "next/link";
import Image from "next/image";
import {KeyRound} from "lucide-react"

export default function Footer() {
  return (
    <section className=" pt-70">

      {/* BIG CONTAINER (like reference black box) */}
      <div className="w-full mx-auto  rounded-3xl px-8 pt-40 md:pt-48 pb-16 relative ">
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10 ">
          <Image
            src="/blueImg2.png"
            alt="Footer background"
            fill
            className="object-cover  scale-100"
          />
        </div>
        <div className="absolute inset-0 bg-[#090d3b]/20 -z-10" />

        {/* CTA CARD */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-full max-w-7xl  px-4 -mt-20 ">

          <div className="relative overflow-hidden rounded-3xl bg-[#0a1738] px-10 py-14 md:px-16 md:py-30 shadow-2xl">

            {/* ORBS */}
            <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full 
          bg-gradient-to-r from-[#d0833f]/90 to-transparent blur-4xl opacity-60"></div>

          <div className="absolute -bottom-8 right-[250px] w-[230px] h-[230px] rounded-full 
bg-[#d0833f] blur-4xl opacity-70 pointer-events-none"></div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-xl text-white">

              <h2 className="text-4xl font-bold font-[var(--font-bricolage)]">
                Take control of your API keys today
              </h2>

              <p className="mt-4 text-blue-200">
                Start for free. No credit card required.
              </p>

              <div className="mt-8 flex gap-4">
                <Link href="/signup" className="bg-[#d0833f] text-black px-6 py-3 rounded-full font-semibold">
                  Get Started
                </Link>

                <Link href="/login" className="border border-white/20 px-6 py-3 rounded-full">
                  Login
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER CONTENT */}
        <div className="flex flex-col md:flex-row justify-between mt-40 text-white gap-10">

  {/* LEFT SIDE */}
  <div className="-mt-14 ml-5">
    <KeyRound className="text-[#d0833f] w-7 h-7 -mr-2"/>
    <h3 className="text-5xl font-bold ">Veylox<span className="text-[#d0833f]">.</span></h3>
    <p className="text-gray-400 mt-3 text-lg max-w-xs">
      Secure API key management for modern developers.
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex gap-16 mr-20 -mt-10">

    <div>
      <h4 className="mb-3 text-[#121655] text-xl font-bold">Product</h4>
      <ul className="space-y-2 text-gray-500 text-sm ">
        <li>Features</li>
        <li>Security</li>
        <li>Pricing</li>
      </ul>
    </div>

    <div>
      <h4 className="mb-3 text-[#121655] text-xl font-bold">Company</h4>
      <ul className="space-y-2 text-gray-500 text-sm">
        <li>About</li>
        <li>Careers</li>
      </ul>
    </div>

    <div>
      <h4 className="mb-3 text-[#121655] text-xl font-bold">Legal</h4>
      <ul className="space-y-2 text-gray-500 text-sm">
        <li>Privacy</li>
        <li>Terms</li>
      </ul>
    </div>

  </div>

</div>

        {/* BOTTOM */}
        <div className="text-center text-gray-200 text-sm mt-16">
          © {new Date().getFullYear()} Veylox. All rights reserved.
        </div>

      </div>

    </section>
  );
}