"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const projectId =
  typeof params.projectId === "string"
    ? params.projectId
    : "";

  return (
    <div className="min-h-screen bg-[#f5f9ff] p-8">

      <h1 className="text-3xl font-bold text-[#0a1738] mb-6">
        Project Details
      </h1>

      <div className="flex items-center gap-3 mb-6">

  {/* BUTTON */}
  <button
    className="px-4 py-2 rounded-lg border text-sm font-medium bg-white hover:bg-gray-100 transition"
  >
    {copied ? "Copied!" : "Project ID"}
  </button>

  {/* COPY ICON */}
  <button
    onClick={() => {
      navigator.clipboard.writeText(projectId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000); 
    }}
    className="p-2 rounded-lg border hover:bg-gray-100 transition"
  >
    📋
  </button>

</div>

      {/* FUTURE: API KEYS SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          API Keys
        </h2>

        <p className="text-gray-400">
          No keys added yet
        </p>
      </div>

    </div>
  );
}