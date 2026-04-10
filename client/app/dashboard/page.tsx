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
        <h2 className="text-2xl font-bold">{totalKeys}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Active</p>
        <h2 className="text-2xl font-bold">{activeKeys}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Expiring</p>
        <h2 className="text-2xl font-bold text-red-500">
  {expiredKeys}
</h2>
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
    {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => {
        setShowModal(false);
        setName("");
      }}
    />

    {/* MODAL */}
    <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

      <h2 className="text-xl font-semibold mb-4">
        Create New Project
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter project name"
        className="w-full border px-4 py-2 rounded-lg mb-4"
        autoFocus
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowModal(false);
            setName("");
          }}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!name.trim()) return;

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
              setShowModal(false);
            }
          }}
          className="bg-[#d0833f] text-black px-4 py-2 rounded-lg"
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