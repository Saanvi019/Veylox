"use client";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/blueImg.png"
          alt="Background texture"
          fill
          priority
          className="object-cover"
          
        />
      </div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white/0 -z-10 font-[var(--font-bricolage)]" />

      {/* Content */}
      <div className="max-w-3xl text-left font-[var(--font-bricolage)]">

        <h1 className="font-[var(--font-bricolage)] text-4xl md:text-5xl font-light leading-tight tracking-tight text-[#112962]">
          Control Every API Key
        </h1>
        

        <p className="mt-8 text-lg md:text-xl text-[#070707] max-w-xl font-light">
          Your secrets deserve better than scattered <span className="text-[#d0833f] font-bold">.env</span> files. <br />
          Stay secure while your projects scale. <br />
          Built for developers who care about control and security.
        </p>
        

       <h1 className="mt-9 text-8xl font-bold leading-tight tracking-tight whitespace-nowrap text-[#112b69]">
  From <span className="text-[#d0833f]">One</span> Secure Vault
</h1>
    

    

        <div className="mt-10 flex gap-6">
          <Link
            href="/signup"
            className="bg-[#2c1e64] text-[#f8f8f8] px-6 py-3 rounded-xl font-semibold hover:bg-[#e49148]  hover:text-white transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-[#d0833f] text-black px-6 py-3 rounded-xl hover:bg-[#e49148]  hover:text-white transition"
          >
            Login
          </Link>
        </div>
  
      </div>
    </section>
  );
}