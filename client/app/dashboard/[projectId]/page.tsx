"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId =
    typeof params.projectId === "string" ? params.projectId : "";

  const [copied, setCopied] = useState(false);
  const [keys, setKeys] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [label, setLabel] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    const fetchKeys = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:4000/api/keys/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setKeys(data);
    };
    if (projectId) fetchKeys();
  }, [projectId]);

  const handleAddKey = async () => {
    if (!serviceName.trim()) {
  alert("Service name is required");
  return;
}

if (!apiKey.trim()) {
  alert("API key is required");
  return;
}

if (apiKey.length < 10) {
  alert("API key seems too short");
  return;
}

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
        label,
        expiryDate,
      }),
    });

    if (res.ok) {
      const updated = await fetch(
        `http://localhost:4000/api/keys/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedData = await updated.json();
      setKeys(updatedData);

      setServiceName("");
      setApiKey("");
      setLabel("");
      setExpiryDate("");
    }
    if (!res.ok) {
  const errorData = await res.json();
  alert(errorData.message || "Something went wrong");
  return;
}
  };

  return (
    <div className="flex min-h-screen bg-[#0a1738] text-slate-900 font-sans">

      {/* ================= SIDEBAR ================= */}
      <div className="w-[120px] bg-[#0a1738] text-white flex flex-col items-center py-6 gap-6">
        <div className="text-xl font-bold">V</div>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a1738] hover:bg-[#dbe7ff]/10 transition"
        >
          🏠
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg">📁</button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6 md:p-10 rounded-l-[60px] bg-[#f6ecd7]">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 ml-10 mt-7 gap-4">
          <div>
            <h1 className="text-5xl font-medium italic tracking-tight text-slate-900">
              Project Workspace
            </h1>
            <p className="text-slate-500 mt-1">
              Manage, rotate, and monitor your production API keys.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm mr-9">
            <code className="text-xs font-mono px-3 text-slate-600">
              {copied
                ? "Copied to clipboard!"
                : `ID: ${projectId.slice(0, 12)}...`}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(projectId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              title="Copy Project ID"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Panel */}
          <aside className="lg:col-span-1 ml-10">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-10">
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                 Create New Key
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    Service Name
                  </label>
                  <input
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. OpenAI, Stripe"
                    className="w-full border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full border border-slate-200 px-4 py-2.5 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    Label
                  </label>
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Development / Production"
                    className="w-full border border-slate-200 px-4 py-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-2.5 rounded-xl"
                  />
                </div>

                <button
                  onClick={handleAddKey}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl mt-2"
                >
                  Generate Key
                </button>

              </div>
            </div>
          </aside>

          {/* List Panel */}
          <main className="lg:col-span-2 mr-9">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50/50">
                <h2 className="font-semibold">Active Keys</h2>
                <span className="text-xs bg-slate-200 px-2 py-1 rounded-full">
                  {keys.length} Total
                </span>
              </div>

              <div className="divide-y">
                {keys.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    No API keys found
                  </div>
                ) : (
                  keys.map((key) => (
                    <div key={key._id} className="p-6 flex justify-between">

                      <div>
                        <h3 className="font-bold">{key.serviceName}</h3>

                        {key.label && (
                          <p className="text-xs text-blue-500">
                            {key.label}
                          </p>
                        )}

                        <code className="text-sm text-slate-500">
                          {key.maskedKey}
                        </code>

                        {key.expiryDate && (
                          <p className="text-xs text-slate-400">
                            Expires {new Date(key.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                        {/* 🔥 USAGE + LIMIT */}
                        {(
  <div className="mt-2">
    <p className="text-xs text-slate-500">
      Usage: {key.usageCount || 0} / {key.limit || 100}
    </p>

    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{
          width: `${
            Math.min(
              ((key.usageCount || 0) / (key.limit || 100)) * 100,
              100
            )
          }%`,
        }}
      />
    </div>
  </div>
)}
                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={async () => {
                            const token = localStorage.getItem("token");
                            const res = await fetch(
                              `http://localhost:4000/api/keys/single/${key._id}`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            const data = await res.json();
                            navigator.clipboard.writeText(data.apiKey);
                          }}
                          className="border px-3 py-1 rounded"
                        >
                          Copy
                        </button>

                        <button
                          onClick={async () => {
                            const token = localStorage.getItem("token");
                            await fetch(
                              `http://localhost:4000/api/keys/${key._id}`,
                              {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            setKeys((prev) =>
                              prev.filter((k) => k._id !== key._id)
                            );
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </main>

        </div>

      </div>
    </div>
  );
}