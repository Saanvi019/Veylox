"use client";
import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";


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
          className="object-cover scale-105 blur-md  "
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


        

    <div className="flex justify-end w-full mt-10">
  <div className="max-w-xl text-center">

    <h1 className="text-4xl md:text-7xl font-light leading-tight ml-150  tracking-tight text-[#ed9d4d] whitespace-nowrap">
      Control Every API Key
    </h1>

    <h2 className=" text-3xl tracking-widest font-light text-[#4d817e9b] w-full ml-197">
      FROM ONE SECURE VAULT
    </h2>
    <div className="ml-200 w-full mt-20 flex gap-6 justify-center">
      <HoverBorderGradient
  as="button"
  containerClassName="rounded-xl"
  className=" text-white px-6 py-3 font-semibold "
>
  <Link href="/signup">Get Started</Link>
</HoverBorderGradient>

      
    </div>

    <p className=" mt-50 text-lg font-extralight text-left md:text-xl ml-25 text-white/40 w-full"> Your secrets deserve better than scattered <span className="text-[#d0833f] font-bold">.env</span> files. <br /> Stay secure while your projects scale. <br /> Built for developers who care about control and security. </p>

    

  </div>
</div>

      </div>
    </section>
  );
}
