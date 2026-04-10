"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allKeys, setAllKeys] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchKeys = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:4000/api/keys/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  setAllKeys(data);
};

fetchKeys();

    fetchProjects();
  }, []);

  const totalKeys = allKeys.length;

const expiredKeys = allKeys.filter(
  (k) => k.expiryDate && new Date(k.expiryDate) < new Date()
).length;

const activeKeys = totalKeys - expiredKeys;

  return (
  <div className="min-h-screen bg-[#0a1738] flex">

    {/* ================= SIDEBAR ================= */}
    <div className="w-[120px] bg-[#0a1738] text-white flex flex-col items-center py-6 gap-6">
      <div className="text-xl font-bold">V</div>

      <button className="p-2 hover:bg-white/10 rounded-lg">🏠</button>
      <button className="p-2 hover:bg-white/10 rounded-lg">📁</button>
    </div>

    {/* ================= MAIN ================= */}
    <div className="flex-1 p-8 bg-[#f6ecd7] rounded-l-[60px] ">

      {/* STATS */}
      <div className="flex justify-end mb-8">

        <h1 className="text-5xl font-medium text-[#0a1738] mr-65 mt-15">
        Hello, User
      </h1>

  <div className="grid grid-cols-2 gap-4 w-[520px]">

    {/* PROJECTS */}
    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#eaf2ff] text-xl">
        📁
      </div>

      <div>
        <p className="text-sm font-semibold text-[#0a1738]">
          Projects
        </p>
        <p className="text-xs text-gray-400">
          Total projects
        </p>
        <p className="text-lg font-bold mt-1">
          {projects.length}
        </p>
      </div>
    </div>

    {/* API KEYS */}
    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#fff4e6] text-xl">
        🔑
      </div>

      <div>
        <p className="text-sm font-semibold text-[#0a1738]">
          API Keys
        </p>
        <p className="text-xs text-gray-400">
          Stored keys
        </p>
        <p className="text-lg font-bold mt-1">
          {totalKeys}
        </p>
      </div>
    </div>

    {/* ACTIVE (FULL WIDTH) */}
    <div className="col-span-2 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#e8fff3] text-xl">
        ⚡
      </div>

      <div>
        <p className="text-sm font-semibold text-[#0a1738]">
          Active
        </p>
        <p className="text-xs text-gray-400">
          Active keys
        </p>
        <p className="text-lg font-bold mt-1">
          {activeKeys}
        </p>
      </div>
    </div>

  </div>

</div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-2 gap-6">

        {/* CALENDAR (placeholder) */}
        <div className="bg-white p-6 rounded-2xl shadow h-[300px]">
          <h2 className="text-lg font-semibold mb-4">
            Calendar
          </h2>

          <div className="h-full flex items-center justify-center text-gray-400">
            Calendar coming soon
          </div>
        </div>

        {/* API USAGE */}
        <div className="bg-white p-6 rounded-2xl shadow h-[300px]">
          <h2 className="text-lg font-semibold mb-4">
            API Usage Overview
          </h2>

          <div className="h-full flex items-center justify-center text-gray-400">
            Chart coming soon
          </div>
        </div>

      </div>

      {/* PROJECTS LIST */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Projects</h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0a1738] text-white px-3 py-1 rounded text-sm"
          >
            + New
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span
                onClick={() => router.push(`/dashboard/${project._id}`)}
                className="cursor-pointer hover:text-[#d0833f]"
              >
                {project.name}
              </span>

              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");

                  await fetch(
                    `http://localhost:4000/api/projects/${project._id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  setProjects((prev) =>
                    prev.filter((p) => p._id !== project._id)
                  );
                }}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* ================= PROFILE PANEL ================= */}
    <div className="w-[300px] bg-white p-6 border-l flex flex-col">

      {/* PROFILE */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300 mb-3" />
        <h2 className="font-semibold">User Name</h2>
        <p className="text-xs text-gray-400">user@email.com</p>
      </div>

      {/* REMINDERS */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Reminders</h3>

        <div className="space-y-3 text-sm">

          <div className="p-3 rounded-lg bg-red-50 text-red-600">
            Stripe key expires soon
          </div>

          <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
            OpenAI key expires tomorrow
          </div>

        </div>
      </div>

    </div>

  </div>
);
}