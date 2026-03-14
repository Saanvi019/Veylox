import Features from "@/components/features";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Problem from "@/components/problem";
import ProblemsSolutions from "@/components/problemSolutions";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div>
      <Navbar/>
      <Hero/>
      <ProblemsSolutions/>
    </div>
    
    </>
  );
}

/*<span className="inline-block after:content-[''] after:w-full after:h-full after:bg-rose-600 after:-z-10 relative z-10 text-white after:absolute after:inset-0 after:-skew-2"
          >Every</span>*/