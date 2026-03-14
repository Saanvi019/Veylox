"use client";

import {
  ChartScatter,
  RotateCcwKey,
  ShieldAlert,
  BanknoteX
} from "lucide-react";

export default function Problem() {
  return (
    <section className="bg-[#0a1738] text-white py-32 px-8">

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-bricolage)] tracking-tight">
            Managing API Keys Shouldn't Be This Hard
          </h2>

          <p className="mt-6 text-lg font-sans font-light text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Developers constantly struggle with scattered secrets,
            expired tokens, and insecure sharing across teams.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="bg-[#112b69] p-8 rounded-2xl border border-white/10 hover:border-[#d0833f] transition">
            
            <div className="flex items-center gap-3 mb-4">
              <ChartScatter className="w-6 h-6 text-[#d0833f]" />
              <h3 className="text-xl font-semibold">
                Scattered Secrets
              </h3>
            </div>

            <p className="text-blue-200 font-sans font-light">
              API keys spread across .env files, dashboards,
              and random documents.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#112b69] p-8 rounded-2xl border border-white/10 hover:border-[#d0833f] transition">

            <div className="flex items-center gap-3 mb-4">
              <RotateCcwKey className="w-6 h-6 text-[#d0833f]" />
              <h3 className="text-xl font-semibold">
                Expired Keys
              </h3>
            </div>

            <p className="text-blue-200 font-sans font-light">
              Expired tokens can silently break your production
              deployments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#112b69] p-8 rounded-2xl border border-white/10 hover:border-[#d0833f] transition">

            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-[#d0833f]" />
              <h3 className="text-xl font-semibold">
                Insecure Sharing
              </h3>
            </div>

            <p className="text-blue-200 font-sans font-light">
              Teams often share API keys through chats or
              unsecured documents.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#112b69] p-8 rounded-2xl border border-white/10 hover:border-[#d0833f] transition">

            <div className="flex items-center gap-3 mb-4">
              <BanknoteX className="w-6 h-6 text-[#d0833f]" />
              <h3 className="text-xl font-semibold">
                Billing Surprises
              </h3>
            </div>

            <p className="text-blue-200 font-sans font-light">
              Without monitoring, unexpected API usage can lead
              to huge bills.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}