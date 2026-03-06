"use client";

import { useState } from "react";
import { MCP_SERVERS, getAllCategories } from "@/data/mcpServers";

const CATEGORY_ICONS = {
  Automotive: "🚗",
  "Human Resources": "👥",
  Healthcare: "🏥",
  Logistics: "📦",
  Finance: "💰",
  "E-Commerce": "🛍️",
  "Real Estate": "🏠",
  Insurance: "🛡️",
  Education: "📚",
  Hospitality: "🏨",
  Security: "🔒",
  Sales: "📈",
  Manufacturing: "🏭",
  Marketing: "📣",
  IoT: "📡",
  Productivity: "⚡",
  Travel: "✈️",
  Energy: "⚡",
  Legal: "⚖️",
  Events: "🎪",
  Agriculture: "🌾",
  Sports: "🏀",
  Government: "🏛️",
};

export default function Sidebar({ selectedServer, onSelectServer }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(new Set(getAllCategories()));

  const categories = getAllCategories();

  const filteredServers = MCP_SERVERS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const serversByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filteredServers.filter((s) => s.category === cat);
    return acc;
  }, {});

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <aside className="w-72 flex-shrink-0 bg-gray-950 border-r border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white">M</div>
          <h1 className="text-sm font-semibold text-white">MCP Validator</h1>
        </div>
        <p className="text-xs text-gray-500">Schema contract testing tool</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-800">
        <div className="relative">
          <svg className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search MCP servers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <p className="text-xs text-gray-600 mt-1.5">{filteredServers.length} of {MCP_SERVERS.length} servers</p>
      </div>

      {/* Server List */}
      <div className="flex-1 overflow-y-auto">
        {categories.map((cat) => {
          const servers = serversByCategory[cat];
          if (!servers || servers.length === 0) return null;
          const isExpanded = expandedCategories.has(cat);

          return (
            <div key={cat}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-400 hover:bg-gray-900/50 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span>{CATEGORY_ICONS[cat] || "📁"}</span>
                  <span className="uppercase tracking-wider">{cat}</span>
                  <span className="text-gray-700 font-normal">({servers.length})</span>
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Servers in category */}
              {isExpanded && (
                <div>
                  {servers.map((server) => {
                    const isSelected = selectedServer?.id === server.id;
                    return (
                      <button
                        key={server.id}
                        onClick={() => onSelectServer(server)}
                        className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 transition-colors border-l-2 ${
                          isSelected
                            ? "bg-blue-950/40 border-blue-500 text-white"
                            : "border-transparent text-gray-400 hover:bg-gray-900/60 hover:text-gray-300"
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: server.color }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">{server.name}</p>
                          <p className="text-xs text-gray-600 truncate">{server.endpoints.length} endpoint{server.endpoints.length !== 1 ? "s" : ""}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 text-xs text-gray-700 text-center">
        {MCP_SERVERS.length} MCP servers configured
      </div>
    </aside>
  );
}
