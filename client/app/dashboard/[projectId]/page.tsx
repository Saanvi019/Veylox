"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const params = useParams();

  const projectId =
    typeof params.projectId === "string"
      ? params.projectId
      : "";

  const [copied, setCopied] = useState(false);

  const [keys, setKeys] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [apiKey, setApiKey] = useState("");

  // 🔥 FETCH KEYS
  useEffect(() => {
    const fetchKeys = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/api/keys/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setKeys(data);
    };

    if (projectId) fetchKeys();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-[#f5f9ff] p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#0a1738] mb-6">
        Project Details
      </h1>

      {/* PROJECT ID COPY */}
      <div className="flex items-center gap-3 mb-6">
        <button className="px-4 py-2 rounded-lg border text-sm font-medium bg-white">
          {copied ? "Copied!" : "Project ID"}
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(projectId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="p-2 rounded-lg border hover:bg-gray-100 transition"
        >
          📋
        </button>
      </div>

      {/* 🔥 ADD KEY FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Add API Key</h2>

        <div className="flex gap-3">
          <input
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Service (OpenAI, Stripe...)"
            className="border px-3 py-2 rounded w-1/3"
          />

          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key"
            className="border px-3 py-2 rounded w-full"
          />

          <button
            onClick={async () => {
              if (!serviceName || !apiKey) return;

              const token = localStorage.getItem("token");

              const res = await fetch("http://localhost:4000/api/keys", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  serviceName,
                  apiKey,
                  projectId,
                }),
              });

              const data = await res.json();

              if (res.ok) {
                // 🔥 Better: refetch instead of fake mask
                const updated = await fetch(
                  `http://localhost:4000/api/keys/${projectId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                const updatedData = await updated.json();
                setKeys(updatedData);

                setServiceName("");
                setApiKey("");
              }
            }}
            className="bg-[#0a1738] text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔥 KEYS LIST */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">API Keys</h2>

        {keys.length === 0 ? (
          <p className="text-gray-400">No keys added yet</p>
        ) : (
          <div className="space-y-3">
            {keys.map((key) => (
              <div
                key={key._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{key.serviceName}</p>
                  <p className="text-gray-500 text-sm">
                    {key.maskedKey}
                  </p>
                </div>

                <div className="flex gap-2">

                  {/* COPY */}
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      const res = await fetch(
                        `http://localhost:4000/api/keys/single/${key._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      const data = await res.json();

                      navigator.clipboard.writeText(data.apiKey);
                    }}
                    className="text-sm border px-2 py-1 rounded"
                  >
                    Copy
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");

                      await fetch(
                        `http://localhost:4000/api/keys/${key._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      setKeys((prev) =>
                        prev.filter((k) => k._id !== key._id)
                      );
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}