"use client";

import { ShieldCheck, KeyRound, BellRing, Users } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";

export default function Features() {
  return (
    <LampContainer>

     <section className="w-full max-w-7xl mx-auto py-32 px-8 text-blue-950 mt-40">

        {/* Section Header */}
        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-bricolage)] tracking-tight">
            Everything You Need to Manage API Keys
          </h2>

          <p className="mt-6 text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-sans">
            Veylox gives developers complete visibility and control
            over their API secrets and usage.
          </p>

        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Feature 1 */}
          <div className="space-y-4">

            <ShieldCheck className="w-7 h-7 text-[#d0833f]" />

            <h3 className="text-xl font-semibold">
              Secure Vault
            </h3>

            <p className="text-amber-900 font-sans">
              Store API keys safely with encryption designed
              specifically for developer secrets.
            </p>

          </div>

          {/* Feature 2 */}
          <div className="space-y-4">

            <KeyRound className="w-7 h-7 text-[#d0833f]" />

            <h3 className="text-xl font-semibold">
              Key Organization
            </h3>

            <p className="text-amber-900 ">
              Organize API keys by project, environment,
              and service in one centralized dashboard.
            </p>

          </div>

          {/* Feature 3 */}
          <div className="space-y-4">

            <BellRing className="w-7 h-7 text-[#d0833f]" />

            <h3 className="text-xl font-semibold">
              Smart Alerts
            </h3>

            <p className="text-amber-900 ">
              Get notified when usage spikes or
              keys are about to expire.
            </p>

          </div>

          {/* Feature 4 */}
          <div className="space-y-4">

            <Users className="w-7 h-7 text-[#d0833f]" />

            <h3 className="text-xl font-semibold">
              Team Access
            </h3>

            <p className="text-amber-900 ">
              Share secrets safely with teammates
              using role-based access control.
            </p>

          </div>

        </div>

      </section>

    </LampContainer>
  );
}