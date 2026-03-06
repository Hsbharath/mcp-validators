"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ValidatorPanel from "@/components/ValidatorPanel";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [selectedServer, setSelectedServer] = useState(null);
  const [view, setView] = useState("dashboard"); // "dashboard" | "validator"

  const handleSelectServer = (server) => {
    setSelectedServer(server);
    setView("validator");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedServer(null);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar selectedServer={selectedServer} onSelectServer={handleSelectServer} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-800 bg-gray-950/80 backdrop-blur flex-shrink-0">
          {view === "validator" && selectedServer ? (
            <>
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
              </button>
              <span className="text-gray-700">/</span>
              <span className="text-xs text-gray-400 font-medium">{selectedServer.name}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400 font-medium">Dashboard</span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-600">Mock API Active</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-screen-lg mx-auto">
            {view === "dashboard" ? (
              <Dashboard onSelectServer={handleSelectServer} />
            ) : selectedServer ? (
              <ValidatorPanel key={selectedServer.id} server={selectedServer} />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
