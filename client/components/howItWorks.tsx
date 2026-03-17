"use client";


import { LampContainer } from "@/components/ui/lamp";

export default function HowItWorks() {
  return (
    <LampContainer>

      <section className="w-full max-w-7xl mx-auto py-32 px-8 text-blue-950 mt-40">

        {/* Section Header */}
        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-bricolage)] tracking-tight">
            How Veylox Works
          </h2>

          <p className="mt-6 text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-sans">
            Get started in seconds and take full control of your API keys.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Step 1 */}
          <div className="group bg-[#dbeafe] p-10 rounded-2xl transition-all duration-300 hover:bg-[#0a1738] hover:scale-[1.03] hover:shadow-2xl">

            <div className="flex items-center gap-3 mb-6">
              
              <span className="inline-block after:content-[''] after:w-full after:h-full after:bg-[#0a1738] after:-z-10 relative z-10 group-hover:after:bg-[#d0833f] text-white text-3xl after:absolute after:inset-0 after:-skew-2">
                Step 1
          </span>
            </div>

            <h3 className="text-2xl font-bold text-[#0a1738] group-hover:text-white mb-4">
              Add Your API Keys
            </h3>

            <p className="text-[#1e293b] group-hover:text-blue-200">
              Securely store your API keys in one centralized vault.
            </p>

            {/* Image Placeholder */}
            <img
              src="/placeholder1.png"
              alt="Preview"
              className="mt-6 h-[120px] w-full object-cover rounded-xl border border-white/10"
            />

          </div>

          {/* Step 2 */}
          <div className="group bg-[#dbeafe] p-10 rounded-2xl transition-all duration-300 hover:bg-[#0a1738] hover:scale-[1.03] hover:shadow-2xl">

            <div className="flex items-center gap-3 mb-6">
              
              <span className="inline-block after:content-[''] after:w-full after:h-full after:bg-[#0a1738] after:-z-10 group-hover:after:bg-[#d0833f] relative z-10 text-white text-3xl after:absolute after:inset-0 after:-skew-2">
                Step 2
          </span>
            </div>

            <h3 className="text-2xl font-bold text-[#0a1738] group-hover:text-white mb-4">
              Organize by Project
            </h3>

            <p className="text-[#1e293b] group-hover:text-blue-200">
              Group keys by project, environment, or service for clarity.
            </p>

            {/* Image Placeholder */}
            <img
              src="/placeholder2.png"
              alt="Preview"
              className="mt-6 h-[120px] w-full object-cover rounded-xl border border-white/10"
            />

          </div>

          {/* Step 3 */}
          <div className="group bg-[#dbeafe] p-10 rounded-2xl transition-all duration-300 hover:bg-[#0a1738] hover:scale-[1.03] hover:shadow-2xl">

            <div className="flex items-center gap-3 mb-6">
              
              <span className="inline-block after:content-[''] after:w-full after:h-full after:bg-[#0a1738] after:-z-10 group-hover:after:bg-[#d0833f] relative z-10 text-white text-3xl after:absolute after:inset-0 after:-skew-2 ">
                Step 3
          </span>
            </div>

            <h3 className="text-2xl font-bold text-[#0a1738] group-hover:text-white mb-4">
              Monitor & Stay Protected
            </h3>

            <p className="text-[#1e293b] group-hover:text-blue-200">
              Track usage and get alerts before issues impact your system.
            </p>

            {/* Image Placeholder */}
            <img
              src="/placeholder3.png"
              alt="Preview"
              className="mt-6 h-[120px] w-full object-cover rounded-xl border border-white/10"
            />

          </div>

        </div>

      </section>

    </LampContainer>
  );
}