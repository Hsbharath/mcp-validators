"use client";

import { useState, useCallback } from "react";
import { MCP_SERVERS } from "@/data/mcpServers";
import { callMCPEndpoint } from "@/lib/mockApi";
import { validateSchema, summarizeDiffs } from "@/lib/schemaValidator";

export default function Dashboard({ onSelectServer }) {
  const [runningHealthCheck, setRunningHealthCheck] = useState(false);
  const [healthResults, setHealthResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const runFullHealthCheck = useCallback(async () => {
    setRunningHealthCheck(true);
    setHealthResults(null);
    setProgress(0);

    const allEndpoints = MCP_SERVERS.flatMap((s) =>
      s.endpoints.map((ep) => ({ server: s, endpoint: ep }))
    );

    const results = {};
    let done = 0;

    // Run in batches of 5 for performance
    const BATCH_SIZE = 5;
    for (let i = 0; i < allEndpoints.length; i += BATCH_SIZE) {
      const batch = allEndpoints.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async ({ server, endpoint }) => {
          try {
            const callResult = await callMCPEndpoint(server.id, endpoint.id);
            const diffs = callResult.isError ? [] : validateSchema(callResult.response, endpoint.expectedSchema);
            const summary = summarizeDiffs(diffs);
            const status = callResult.isError ? "error" : summary.isValid ? "ok" : "mismatch";

            if (!results[server.id]) {
              results[server.id] = { server, endpoints: [], overallStatus: "ok" };
            }
            results[server.id].endpoints.push({ endpoint, status, latencyMs: callResult.latencyMs, issueCount: diffs.length });
            if (status !== "ok") results[server.id].overallStatus = status === "error" ? "error" : "mismatch";
          } catch (e) {
            if (!results[server.id]) results[server.id] = { server, endpoints: [], overallStatus: "error" };
          }
          done++;
          setProgress(Math.round((done / allEndpoints.length) * 100));
        })
      );
    }

    setHealthResults({ ...results });
    setRunningHealthCheck(false);
  }, []);

  const totalServers = MCP_SERVERS.length;
  const totalEndpoints = MCP_SERVERS.reduce((a, s) => a + s.endpoints.length, 0);

  const healthSummary = healthResults
    ? Object.values(healthResults).reduce(
        (acc, r) => {
          if (r.overallStatus === "ok") acc.healthy++;
          else if (r.overallStatus === "mismatch") acc.mismatch++;
          else acc.error++;
          return acc;
        },
        { healthy: 0, mismatch: 0, error: 0 }
      )
    : null;

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      {/* Page header */}
      <div>
        <h2 className="text-lg font-semibold text-white">Overview Dashboard</h2>
        <p className="text-xs text-gray-500 mt-0.5">Monitor all MCP servers and run bulk schema validation</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total Servers" value={totalServers} icon="🗄️" color="blue" />
        <StatCard label="Total Endpoints" value={totalEndpoints} icon="🔌" color="purple" />
        {healthSummary ? (
          <>
            <StatCard label="Healthy" value={healthSummary.healthy} icon="✅" color="green" />
            <StatCard label="Issues" value={healthSummary.mismatch + healthSummary.error} icon="⚠️" color={healthSummary.mismatch + healthSummary.error > 0 ? "red" : "green"} />
          </>
        ) : (
          <>
            <StatCard label="Healthy" value="—" icon="✅" color="gray" />
            <StatCard label="Issues" value="—" icon="⚠️" color="gray" />
          </>
        )}
      </div>

      {/* Run health check */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-white">Bulk Health Check</p>
            <p className="text-xs text-gray-500 mt-0.5">Validate schema contracts across all {totalEndpoints} endpoints simultaneously</p>
          </div>
          <button
            onClick={runFullHealthCheck}
            disabled={runningHealthCheck}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-950 disabled:text-blue-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            {runningHealthCheck ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Running... {progress}%
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Run Health Check
              </>
            )}
          </button>
        </div>

        {runningHealthCheck && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Testing endpoints...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results grid */}
      {healthResults && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Server Health Results</p>
            <div className="flex gap-2">
              <LegendDot color="bg-emerald-500" label="Healthy" />
              <LegendDot color="bg-yellow-500" label="Mismatch" />
              <LegendDot color="bg-red-500" label="Error" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(healthResults).map(({ server, endpoints, overallStatus }) => {
              const statusColor = overallStatus === "ok" ? "border-emerald-800 bg-emerald-950/20" :
                overallStatus === "mismatch" ? "border-yellow-800 bg-yellow-950/20" :
                "border-red-800 bg-red-950/20";
              const dotColor = overallStatus === "ok" ? "bg-emerald-500" :
                overallStatus === "mismatch" ? "bg-yellow-500" : "bg-red-500";
              const issues = endpoints.filter((e) => e.status !== "ok").length;
              const avgLatency = Math.round(endpoints.reduce((a, e) => a + e.latencyMs, 0) / endpoints.length);

              return (
                <button
                  key={server.id}
                  onClick={() => onSelectServer(server)}
                  className={`text-left rounded-xl border ${statusColor} p-3 hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0 mt-0.5`} />
                      <p className="text-xs font-semibold text-white leading-tight">{server.name}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{server.category}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{endpoints.length} endpoint{endpoints.length !== 1 ? "s" : ""}</span>
                    <span className="text-gray-600">{avgLatency}ms avg</span>
                  </div>
                  {issues > 0 && (
                    <div className="mt-1.5 text-xs text-yellow-400">
                      {issues} issue{issues !== 1 ? "s" : ""}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Server catalog */}
      {!healthResults && (
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">All MCP Servers</p>
          <div className="grid grid-cols-3 gap-3">
            {MCP_SERVERS.map((server) => (
              <button
                key={server.id}
                onClick={() => onSelectServer(server)}
                className="text-left rounded-xl border border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/70 p-3 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: server.color }}>
                    {server.name.charAt(0)}
                  </div>
                  <p className="text-xs font-semibold text-white truncate">{server.name}</p>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{server.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-700 border border-gray-800 px-1.5 py-0.5 rounded">{server.category}</span>
                  <span className="text-xs text-gray-700">{server.endpoints.length} ep</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: "border-blue-800 bg-blue-950/20 text-blue-400",
    purple: "border-purple-800 bg-purple-950/20 text-purple-400",
    green: "border-emerald-800 bg-emerald-950/20 text-emerald-400",
    red: "border-red-800 bg-red-950/20 text-red-400",
    gray: "border-gray-800 bg-gray-900/30 text-gray-600",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color] || colors.gray}`}>
      <div className="text-lg mb-1">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs opacity-70 mt-0.5">{label}</p>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-600">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}
