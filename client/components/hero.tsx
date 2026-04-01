"use client";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/orangeBG.jpg"
          alt="Background texture"
          fill
          priority
          className="object-cover scale-105 blur-sm "
        />
      </div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white/0 -z-10 font-[var(--font-bricolage)]" />

      {/* Content */}
      <div className="max-w-3xl text-left font-[var(--font-bricolage)]">

        <h1 className="absolute left-27 px-15 top-0.5 -translate-y-1/2 
               rotate-90 origin-left
               text-[200px] font-bold 
               text-[#0e546cc7] tracking-tight">
  veylox
</h1>

        

    <div className="flex justify-end h-screen items-center ml-350 "> 
  <div className="max-w-xl text-right">

    <h1 className="font-[var(--font-bricolage)] text-4xl md:text-6xl font-light leading-tight tracking-tight text-[#ed9d4d] pl-0 pt-10">
      Control <br /> Every API KEY
    </h1>
    <h1 className="mt-9 text-3xl font-light leading-tight tracking-normal whitespace-nowrap text-[#8ae5fbb7]">
      FROM <span className="text-[#d0943f]">ONE</span> SECURE VAULT
    </h1>

    <p className="mt-8 text-lg md:text-xl text-[#ffffff] font-light">
      Your secrets deserve better than scattered <span className="text-[#d0833f] font-bold">.env</span> files. <br />
      Stay secure while your projects scale. <br />
      Built for developers who care about control and security.
    </p>

    

    <div className="mt-10 flex gap-6 justify-end">
      <Link
        href="/signup"
        className="bg-[#2c1e64] text-[#f8f8f8] px-6 py-3 rounded-xl font-semibold hover:bg-[#e49148] hover:text-white transition"
      >
        Get Started
      </Link>

      <Link
        href="/login"
        className="border border-[#d0833f] text-black px-6 py-3 rounded-xl hover:bg-[#e49148] hover:text-white transition"
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
