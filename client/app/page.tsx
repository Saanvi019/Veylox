
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import ProblemsSolutions from "@/components/problemSolutions";
import Image from "next/image";
import HowItWorks from "@/components/howItWorks";
import Security from "@/components/security";
import Pricing from "@/components/pricing";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
    <div>
      <Navbar/>
      <Hero/>
      <HowItWorks/>
      <ProblemsSolutions/>
      <Security/>
      <Pricing/>
      
      <Footer/>
    </div>
    
    </>
  );
}

/*<span className="inline-block after:content-[''] after:w-full after:h-full after:bg-rose-600 after:-z-10 relative z-10 text-white after:absolute after:inset-0 after:-skew-2"
          >Every</span>*/