"use client";

import { ShieldCheck, Lock, KeyRound, Eye, CheckCheck } from "lucide-react";

export default function Security() {
  return (
    <section className="bg-[#0a1738] text-white py-32 px-8">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-bricolage)] tracking-tight">
            Built with <span className="inline-block after:content-[''] after:w-full after:h-full after:bg-[#d0833f] after:-z-10 relative z-10 text-white after:absolute after:inset-0 after:-skew-2"
          >Security</span> First
          </h2>

          <p className="mt-6 text-lg text-blue-200 leading-relaxed font-sans">
            Your API keys are sensitive. Veylox is designed to protect
            them with modern security practices from day one.
          </p>

          {/* POINTS */}
          <div className="mt-10 space-y-6">

            <div className="flex items-start gap-4">
              <CheckCheck  className="w-7 h-7 text-[#d0833f]" />
              <div>
                <h4 className="font-semibold">End-to-End Encryption</h4>
                <p className="text-blue-200 text-sm">
                  Your secrets are encrypted before storage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCheck  className="w-7 h-7 text-[#d0833f]" />
              <div>
                <h4 className="font-semibold">Secure Authentication</h4>
                <p className="text-blue-200 text-sm">
                  Protected with JWT-based authentication and access control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCheck  className="w-7 h-7 text-[#d0833f]" />
              <div>
                <h4 className="font-semibold">Role-Based Access</h4>
                <p className="text-blue-200 text-sm">
                  Share keys safely with fine-grained permissions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCheck  className="w-7 h-7 text-[#d0833f]" />
              <div>
                <h4 className="font-semibold">Real-Time Monitoring</h4>
                <p className="text-blue-200 text-sm">
                  Detect unusual activity and prevent misuse instantly.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          <div className="w-full h-[350px] rounded-2xl border border-white/10 bg-[#112b69]/40 backdrop-blur-md shadow-2xl flex items-center justify-center">

            <div className="text-center">
              <Lock className="w-10 h-10 mx-auto text-[#d0833f] mb-4" />
              <p className="text-white/60 text-sm tracking-wide">
                Secure Vault Preview
              </p>
            </div>

          </div>

          {/* glow effect */}
          <div className="absolute -z-10 inset-0 bg-[#d0833f]/20 blur-3xl rounded-full"></div>

        </div>

      </div>

    </section>
  );
}