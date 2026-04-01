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
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

      {/* CREATE PROJECT */}
      <div className="mb-6 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project name"
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={async () => {
            if (!name.trim()) return;

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
            }
          }}
          className="bg-[#0a1738] text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="p-4 border rounded-xl flex justify-between items-center"
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
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}