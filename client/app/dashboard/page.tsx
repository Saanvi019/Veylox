"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from 'react';
import { LayoutDashboard, FolderKanban, Home, Settings, LogOut } from 'lucide-react';
import { CircuitBoard, FolderKey, Zap, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to format "time ago"
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return "Never used";
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.clear();

  window.location.href = "/login"; // full reset
};

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allKeys, setAllKeys] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const { status } = useSession();

  useEffect(() => {
  const token = localStorage.getItem("token");

  // wait for session to load
  if (status === "loading") return;

  // 🔥 allow BOTH auth types
  if (!token && status !== "authenticated") {
    router.push("/login");
    return;
  }

  // ===== FETCH DATA =====
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch projects:", res.status);
        setProjects([]);
      }
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

  const fetchUser = async () => {
    if (!token) return; // 🔥 skip for OAuth users

    try {
      const res = await fetch("http://localhost:4000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user:", res.status);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  const fetchKeys = async () => {
    if (!token) return; // 🔥 skip for OAuth users

    try {
      const res = await fetch("http://localhost:4000/api/keys/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAllKeys(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch keys:", res.status);
        setAllKeys([]);
      }
    } catch (err) {
      console.error(err);
      setAllKeys([]);
    }
  };

  fetchUser();
  fetchKeys();
  fetchProjects();

}, [status, router]);

  const totalKeys = allKeys.length;
  const expiredKeys = allKeys.filter(
    (k) => k.expiryDate && new Date(k.expiryDate) < new Date()
  ).length;
  const activeKeys = totalKeys - expiredKeys;

  // Sort keys by lastUsed for the Recent Activity section
  const recentKeys = [...allKeys]
    .filter((k) => k.lastUsed)
    .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
    .slice(0, 4);

  // 🔥 DEFINE FIRST
const today = new Date();


// ================= REMINDERS =================
const reminders = allKeys
  .map((k) => {
    const expiry = k.expiryDate ? new Date(k.expiryDate) : null;

    const daysLeft = expiry
      ? Math.ceil(
          (expiry.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    const usagePercent =
      ((k.usageCount || 0) / (k.limit || 100)) * 100;

    return {
      ...k,
      daysLeft,
      highUsage: usagePercent > 80,
    };
  })
  .filter(
    (k) =>
      (k.daysLeft !== null && k.daysLeft >= 0) || k.highUsage
  )
  .sort((a, b) => {
    // 🔥 show high usage first
    if (a.highUsage && !b.highUsage) return -1;
    if (!a.highUsage && b.highUsage) return 1;

    return (a.daysLeft || 999) - (b.daysLeft || 999);
  })
  .slice(0, 5);


// ================= CALENDAR =================
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// first day of month
const firstDay = new Date(currentYear, currentMonth, 1).getDay();

// total days in month
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// calendar array
const calendarDays: (number | null)[] = [];

// empty slots
for (let i = 0; i < firstDay; i++) {
  calendarDays.push(null);
}

// actual days
for (let day = 1; day <= daysInMonth; day++) {
  calendarDays.push(day);
}


// ================= EXPIRY DATES =================
const expiryMap: Record<number, any[]> = {};

allKeys.forEach((k) => {
  if (!k.expiryDate) return;

  const d = new Date(k.expiryDate);
  const day = d.getDate();

  if (!expiryMap[day]) {
    expiryMap[day] = [];
  }

  expiryMap[day].push(k);
});
const usageData = allKeys.map((k) => ({
  name: k.serviceName || "Unknown",
  usage: k.usageCount || 0,
}));

  
  

  return (
    <div className="min-h-screen bg-[#0a1738] flex">
      {/* ================= SIDEBAR (Unchanged) ================= */}
      {/* ================= SIDEBAR (Enhanced) ================= */}
      <div className="w-[120px] bg-[#0a1738] text-white flex flex-col items-center py-10 gap-8 shrink-0">
        {/* Logo / Brand */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold tracking-tighter">
            V
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-6 w-full items-center">
          {/* Dashboard Button */}
          <button 
            title="Dashboard"
            className="group relative p-3 rounded-2xl transition-all duration-300 hover:bg-amber-400/10 text-amber-400"
          >
            <LayoutDashboard size={28} strokeWidth={1.5} />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-r-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </button>

          {/* Projects Button */}
          <button 
            title="Projects"
            className="group p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 text-white/50 hover:text-white"
          >
            <FolderKanban size={28} strokeWidth={1.5} />
          </button>

          {/* Settings Button */}
          <button 
            title="Settings"
            className="group p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 text-white/50 hover:text-white"
          >
            <Settings size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Optional Spacer to push Logout to bottom */}
        <div className="mt-auto mb-4">
           <button 
            onClick={handleLogout}
            title="Logout"
            className="p-3 rounded-2xl transition-all duration-300 hover:bg-red-500/10 text-white/30 hover:text-red-400"
          >
            <LogOut size={28} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-8 bg-[#f6ecd7] rounded-l-[60px] overflow-y-auto">
        {/* STATS */}
        <div className="flex justify-between items-start mb-12">
          {/* LEFT: GREETING */}
          <div className="max-w-[500px] mt-16 relative">
  {/* Decorative subtle glow background */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-200/30 blur-3xl rounded-full" />
  
  <h1 className="text-6xl italic tracking-tight text-[#0a1738] drop-shadow-sm">
    Welcome back, <span className="italic font-light border-b-2 text-5xl border-amber-400/50">User</span>
  </h1>
  
  <div className="flex items-center gap-3 mt-6">
    <div className="h-[1px] w-12 bg-amber-700/40" />
    <p className="text-sm uppercase tracking-[0.2em] font-medium text-amber-800/80">
      System Overview & Key Management
    </p>
  </div>
</div>

          {/* RIGHT: STATS */}
          <div className="grid grid-cols-2 gap-4 w-[480px] mt-10">
            <div className="bg-[#c271072a] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fff4e6]">
                <CircuitBoard className="w-6 h-6 text-[#d0833f]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a1738]">Projects</p>
                <p className="text-lg font-bold">{projects.length}</p>
              </div>
            </div>

            <div className="bg-[#c271072a] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fff4e6]">
                <FolderKey className="w-6 h-6 text-[#d0833f]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a1738]">API Keys</p>
                <p className="text-lg font-bold">{totalKeys}</p>
              </div>
            </div>

            <div className="col-span-2 bg-[#c271072a] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fff4e6]">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a1738]">Active Keys</p>
                <p className="text-lg font-bold">{activeKeys}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID - Adjusted to include Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* RECENT ACTIVITY SECTION (NEW) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-100 h-[350px]">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-[#0a1738]">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {recentKeys.length > 0 ? (
                recentKeys.map((key) => (
                  <div key={key._id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-gray-700">{key.serviceName || "Unnamed Key"}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400 group-hover:text-amber-600 transition-colors">
                      {formatTimeAgo(key.lastUsed)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm italic">
                  No recent activity found
                </div>
              )}
            </div>
          </div>

          {/* CALENDAR */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-100 h-[350px]">
            <h2 className="text-lg font-bold text-[#0a1738] mb-4">Calendar</h2>
            <div className="grid grid-cols-7 gap-2 text-sm">

  {/* DAYS HEADER */}
  {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
  <div key={`${d}-${index}`} className="text-center text-gray-400 text-xs">
    {d}
  </div>
))}

  {/* CALENDAR CELLS */}
  {calendarDays.map((day, index) => {
    const isToday =
      day === today.getDate();

    const isExpiry = day && expiryMap[day];
const keysForDay = day ? expiryMap[day] : [];
console.log(user);


    return (
      <div
  key={index}
  className={`relative group h-10 flex items-center justify-center rounded-lg text-xs
    ${day ? "bg-gray-50" : ""}
    ${isToday ? "border border-[#d0833f] font-bold" : ""}
    ${isExpiry ? "bg-red-100 text-red-600 font-semibold" : ""}
  `}
>
  {day || ""}

  {/* 🔥 HOVER POPUP */}
  {isExpiry && keysForDay?.length > 0 && (
    <div className="absolute bottom-full mb-2 hidden group-hover:block z-50">
      
      <div className="bg-[#0a1738] text-white text-xs rounded-lg px-3 py-2 shadow-lg w-max max-w-[200px]">

        {keysForDay.map((k) => (
          <div key={k._id}>
            <p className="font-semibold">
              {k.serviceName}
            </p>
            <p className="text-gray-300 text-[10px]">
              {k.projectName || "Project"}
            </p>
          </div>
        ))}

      </div>

      {/* arrow */}
      <div className="w-2 h-2 bg-[#0a1738] rotate-45 mx-auto -mt-1"></div>

    </div>
  )}

</div>
    );
  })}

</div>
          </div>

          {/* API USAGE */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-100 h-[350px]">
            <h2 className="text-lg font-bold text-[#0a1738] mb-4">Usage Overview</h2>
            {usageData.length === 0 ? (
  <div className="h-full flex items-center justify-center text-gray-400">
    No usage data yet
  </div>
) : (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={usageData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="usage" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)}
          </div>

        </div>
      </div>

      {/* ================= PROFILE PANEL (Unchanged) ================= */}
      <div className="w-[320px] bg-white p-8 border-l flex flex-col shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-200 to-[#0a1738] mb-4 shadow-inner" />
          <h2 className="font-bold text-lg text-[#0a1738]">
  {user?.email || "User"}
</h2>
         
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Reminders</h3>
          <div className="space-y-3 text-sm">

  {reminders.length === 0 ? (
    <div className="text-gray-400 text-xs italic">
      No upcoming expirations
    </div>
  ) : (
   reminders.map((key) => (
  <div
    key={key._id}
    className={`p-3 rounded-xl border ${
      key.highUsage
        ? "bg-red-50 text-red-600 border-red-100"
        : key.daysLeft <= 1
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-yellow-50 text-yellow-700 border-yellow-100"
    }`}
  >

    {/* 🔥 USAGE WARNING */}
    {key.highUsage && (
      <p>
        ⚠️ {key.serviceName} near usage limit
      </p>
    )}

    {/* 🔥 EXPIRY WARNING */}
    {key.daysLeft !== null && (
      <p>
        {key.serviceName} expires{" "}
        <span className="font-semibold">
          {key.daysLeft === 0
            ? "today"
            : key.daysLeft === 1
            ? "tomorrow"
            : `in ${key.daysLeft} days`}
        </span>
      </p>
    )}

  </div>
))
  )}

</div>
        </div>


        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Projects</h3>
            <button
              onClick={() => setShowModal(true)}
              className="text-[10px] bg-[#0a1738] text-white px-3 py-1 rounded-full hover:bg-amber-700 transition-colors"
            >
              + NEW
            </button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg group"
              >
                <span
                  onClick={() => router.push(`/dashboard/${project._id}`)}
                  className="cursor-pointer group-hover:text-[#d0833f] font-medium transition-colors"
                >
                  {project.name}
                </span>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem("token");
                    await fetch(`http://localhost:4000/api/projects/${project._id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setProjects((prev) => prev.filter((p) => p._id !== project._id));
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-2xl w-[400px]">
      <h2 className="text-lg font-semibold mb-4">
        Create Project
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        className="border px-3 py-2 rounded w-full mb-4"
      />

      <div className="flex justify-end gap-2">
        
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:4000/api/projects", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (res.ok) {
              setProjects((prev) => [...prev, data]);
              setName("");
              setShowModal(false);
            }
          }}
          className="bg-[#0a1738] text-white px-4 py-2 rounded"
        >
          Create
        </button>
        

      </div>
      
    </div>

  </div>
)}
    </div>
  );
}