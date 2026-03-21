"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = {
  free: {
    title: "Free",
    price: "₹0",
    desc: "Perfect for individuals getting started.",
    features: [
      "Up to 5 API keys with secure storage",  
      "Basic usage monitoring and tracking",  
      "Single project organization",  
      "Access from any device",  
      "Community support"
    ],
  },
  pro: {
    title: "Pro",
    price: "₹299/month",
    desc: "Best for growing developers.",
    features: [
      "Unlimited API keys across projects",  
      "Real-time usage analytics and insights",  
      "Smart alerts for expiry and unusual activity",  
      "Environment-based key organization",  
      "Priority email support",  
      "Secure sharing with limited access controls"
    ],
  },
  advanced: {
    title: "Advanced",
    price: "₹999/month",
    desc: "For teams and scaling products.",
    features: [
      "Everything in Pro, plus:",  
      "Team collaboration with shared vaults",  
      "Role-based access control for team members",  
      "Advanced security rules and permissions",   
      "Custom alerts and usage thresholds",  
      "Priority support with faster response times"
    ],
  },
};

export default function Pricing() {
  const [selected, setSelected] = useState<"free" | "pro" | "advanced">("pro");

  const current = plans[selected];

  return (
    <section className="relative bg-[#f5f9ff] py-32 px-8 overflow-hidden">
       <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[400px] rounded-full 
bg-gradient-to-br from-[#f8ad0b] to-[#1d3576] blur-3xl opacity-900 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#0a1738] font-[var(--font-bricolage)]">
            Choose the ideal plan
          </h2>
          <p className="mt-4 text-gray-600 font-sans">
            Flexible pricing designed for developers at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT PANEL */}
          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-md 
bg-gradient-to-br from-[#112b69]/30 via-[#f5f9ff] to-[#d0833f]/30">

            <h3 className="text-2xl font-semibold text-[#0a1738] mb-4">
              {current.title}
            </h3>

            <p className="text-gray-600 mb-6">
              {current.desc}
            </p>

            <ul className="space-y-4">
              {current.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[#334155]">
                  <Check className="w-5 h-5 text-[#d0833f]" />
                  {f}
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT PLANS */}
          <div className="space-y-6">

            {/* FREE */}
            <div
              onClick={() => setSelected("free")}
              className={`cursor-pointer border rounded-2xl p-6 flex justify-between items-center transition ${
                selected === "free"
                  ? "border-[#d0833f] bg-[#0a1738] text-white"
                  : "border-[#d0833f]  bg-gradient-to-br  from-[#112b69]/30 via-[#f5f9ff] to-[#d0833f]/30"
              }`}
            >
              <div>
                <h4 className="font-semibold text-xl">Free</h4>
                <p className="text-sm opacity-70">For beginners</p>
              </div>
              <p className="font-mono text-3xl">₹0</p>
            </div>

            {/* PRO */}
            <div
              onClick={() => setSelected("pro")}
              className={`cursor-pointer border rounded-2xl p-6 flex justify-between items-center transition ${
                selected === "pro"
                  ? "border-[#d0833f] bg-[#0a1738] text-white"
                  : "border-[#d0833f]  bg-gradient-to-br  from-[#112b69]/30 via-[#f5f9ff] to-[#d0833f]/30"
              }`}
            >
              <div>
                <h4 className="font-semibold text-xl">Pro</h4>
                <p className="text-sm opacity-70">Most popular</p>
              </div>
              <p className="font-mono text-3xl">₹299/mo</p>
            </div>

            {/* ADVANCED */}
            <div
              onClick={() => setSelected("advanced")}
              className={`cursor-pointer border rounded-2xl p-6 flex justify-between items-center transition ${
                selected === "advanced"
                  ? "border-[#d0833f] bg-[#0a1738] text-white"
                  : "border-[#d0833f]  bg-gradient-to-br  from-[#112b69]/30 via-[#f5f9ff] to-[#d0833f]/30"
              }`}
            >
              <div>
                <h4 className="font-semibold text-xl">Advanced</h4>
                <p className="text-sm opacity-70">For teams</p>
              </div>
              <p className="font-mono text-3xl">₹999/mo</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}