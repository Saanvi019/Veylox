"use client";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        

      <div className="absolute inset-0 -z-10">
        <Image
          src="/blueImg.png"
          alt="Background texture"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-white/00 backdrop-blur-[0px] -z-10" />

      <div className="max-w-4xl px-6 text-center text-[#1c1c1c]">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Control Every API Key
          <br />
          From One Secure Vault
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[#4a4a4a] max-w-2xl mx-auto">
          Organize secrets, monitor usage, and protect your developer stack —
          all from a centralized control center built for modern teams.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/signup"
            className="bg-[#1c1c1c] text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-[#1c1c1c] px-6 py-3 rounded-xl hover:bg-[#1c1c1c] hover:text-white transition"
          >
            Login
          </Link>
        </div>

      </div>
    </section>
  );
}