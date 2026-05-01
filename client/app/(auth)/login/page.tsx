"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle OAuth login - extract token from session
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const handleOAuthSuccess = async () => {
        try {
          // Call backend to get the token
          const response = await fetch(
            "http://localhost:4000/api/auth/oauth-callback",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: session.user.email,
                name: session.user.name,
                provider: "github", // or "google" based on which was used
                providerId: session.user.id,
              }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
          } else {
            setError("Failed to authenticate");
          }
        } catch (err) {
          console.error("OAuth success error:", err);
          setError("Authentication error");
        }
      };

      handleOAuthSuccess();
    }
  }, [status, session, router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.email || !form.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthClick = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error(err);
      setError(`${provider} login failed`);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-200 px-4 md:px-8 flex items-center justify-center overflow-hidden">
      <main className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-stone-300 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] h-[90vh] md:grid-cols-2">
        {/* LEFT FORM (same as signup right side) */}
        <section className="flex items-center p-6 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d0833f]">
                Welcome Back
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Log In
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Use your email and password to access your account.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleOAuthClick("google")}
                disabled={isLoading}
                className="flex items-center gap-2 border bg-black text-white px-3 py-2 rounded-lg text-sm transition hover:border-amber-600 disabled:opacity-50"
              >
                <img src="/google.jpg" alt="Google" className="w-3 h-3" />
                Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthClick("github")}
                disabled={isLoading}
                className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition disabled:opacity-50"
              >
                <img src="/GitHub.svg" alt="GitHub" className="w-5 h-5" />
                GitHub
              </button>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={isLoading}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm focus:border-[#d0833f] focus:ring-2 focus:ring-[#d0833f]/30 outline-none disabled:opacity-50"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm focus:border-[#d0833f] focus:ring-2 focus:ring-[#d0833f]/30 outline-none disabled:opacity-50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#0a1738] px-4 py-3 text-sm font-semibold text-white hover:bg-[#112b69] transition disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>

            {/* SIGNUP REDIRECT */}
            <p className="text-center text-sm text-zinc-600">
              New here?{" "}
              <a
                href="/signup"
                className="font-semibold text-zinc-900 hover:text-[#d0833f]"
              >
                Create an account
              </a>
            </p>
          </form>
        </section>

        {/* RIGHT IMAGE (same as signup left side) */}
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
      </main>
    </div>
  );
}
