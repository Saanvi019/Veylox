"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

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

    fetchProjects();
  }, []);

  return (
  <div className="min-h-screen bg-[#f5f9ff] p-8">

    {/* HEADER */}
    <h1 className="text-3xl font-bold text-[#0a1738] mb-8">
      Dashboard
    </h1>

    {/* STATS */}
    <div className="grid grid-cols-4 gap-6 mb-8">
      
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Projects</p>
        <h2 className="text-2xl font-bold">{projects.length}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">API Keys</p>
        <h2 className="text-2xl font-bold">0</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Active</p>
        <h2 className="text-2xl font-bold">0</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Expiring</p>
        <h2 className="text-2xl font-bold text-red-500">0</h2>
      </div>

    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-3 gap-6">

      {/* LEFT LARGE PANEL */}
      <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          API Usage Overview
        </h2>

        <div className="h-[200px] flex items-center justify-center text-gray-400">
          Chart coming soon
        </div>
      </div>

      {/* RIGHT PROJECT PANEL */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Your Projects
        </h2>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{project.name}</span>

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

        {/* CREATE */}
        <div className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New project"
            className="border px-2 py-1 rounded text-sm w-full"
          />

          <button
            onClick={async () => {
              const token = localStorage.getItem("token");

              const res = await fetch(
                "http://localhost:4000/api/projects",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ name }),
                }
              );

              const data = await res.json();

              if (res.ok) {
                setProjects((prev) => [...prev, data]);
                setName("");
              }
            }}
            className="bg-[#0a1738] text-white px-3 py-1 rounded text-sm"
          >
            +
          </button>
        </div>

      </div>

    </div>

  </div>
);
}