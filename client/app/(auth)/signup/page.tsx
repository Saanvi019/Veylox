"use client";

import Image from "next/image";
import Link from "next/link"; // ✅ added
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    } 
    if (form.password.length < 6) {
     setError("Password must be at least 6 characters");
     return;
    }


    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        
        router.push("/dashboard"); 
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="h-screen bg-stone-200 px-4 md:px-8 flex items-center justify-center overflow-hidden">
      <main className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-stone-300 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] h-[90vh] md:grid-cols-2">
        
        {/* LEFT IMAGE (unchanged) */}
        <section className="relative min-h-[300px] md:min-h-full">
          <Image
            src="/signup.jpg"
            alt="Veylox secure vault"
            fill
            priority
            className="object-cover object-[50%_78%]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1738]/80 via-[#0a1738]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-sm text-white md:bottom-10 md:left-10">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
              Veylox
            </p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
              Secure your API keys. Organize everything in one vault.
            </h1>
          </div>
        </section>

        {/* RIGHT FORM (unchanged layout) */}
        <section className="flex items-center p-6 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d0833f]">
                Get Started
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Start managing your API keys securely with Veylox.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
  
             <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 border bg-black text-white px-3 py-2 rounded-lg text-sm  transition hover:border-amber-600 "
              >
               <img src="/google.jpg" alt="Google" className="w-3 h-3" />
               Google
             </button>
             <button
               onClick={() => signIn("github")}
               className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
              >
              <img src="/GitHub.svg" alt="GitHub" className="w-5 h-5" />
                 GitHub
            </button>


            </div>

            {/* NAME */}
            <input name="name" onChange={handleChange} placeholder="Your name" className="input" />

            {/* EMAIL */}
            <input name="email" onChange={handleChange} placeholder="you@example.com" className="input" />

            {/* PASSWORD */}
            <input name="password" type="password" onChange={handleChange} placeholder="Create a password" className="input" />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button className="btn">Create Account</button>

            <p className="text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-zinc-900 hover:text-[#d0833f]"
              >
                Log in
              </Link>
            </p>

          </form>
        </section>

      </main>
    </div>
  );
}