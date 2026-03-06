"use client";

import { getDiffStyle } from "@/lib/schemaValidator";
import JsonViewer from "./JsonViewer";

export default function DiffPanel({ diffs, summary, actual, expected, latencyMs, httpStatus, isError }) {
  if (isError) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-red-800 bg-red-950/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-400">Server Error — HTTP {httpStatus}</span>
          </div>
          <p className="text-xs text-red-300/70">The MCP server returned an error response. Schema validation was skipped.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Error Response</p>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 overflow-auto max-h-96">
              <JsonViewer data={actual} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Expected Schema</p>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 overflow-auto max-h-96">
              <JsonViewer data={expected} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const severityConfig = {
    pass: { color: "text-emerald-400", bg: "bg-emerald-950/30", border: "border-emerald-800", dot: "bg-emerald-500", label: "All Checks Passed" },
    warning: { color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-800", dot: "bg-yellow-500", label: "Minor Issues Detected" },
    fail: { color: "text-red-400", bg: "bg-red-950/30", border: "border-red-800", dot: "bg-red-500", label: "Validation Failed" },
  };
  const sev = severityConfig[summary.severity] || severityConfig.pass;

  return (
    <div className="flex flex-col gap-4">
      {/* Summary banner */}
      <div className={`rounded-xl border ${sev.border} ${sev.bg} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${sev.dot} ${summary.severity !== "pass" ? "animate-pulse" : ""}`} />
            <span className={`text-sm font-semibold ${sev.color}`}>{sev.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-xs">
              <MetricChip label="Latency" value={`${latencyMs}ms`} />
              <MetricChip label="HTTP" value={httpStatus} color={httpStatus === 200 ? "green" : "red"} />
              {summary.total > 0 && <MetricChip label="Issues" value={summary.total} color="red" />}
            </div>
          </div>
        </div>

        {summary.total > 0 && (
          <div className="flex gap-3 mt-3 flex-wrap">
            {summary.missing > 0 && <Badge label={`${summary.missing} Missing`} color="red" />}
            {summary.extra > 0 && <Badge label={`${summary.extra} Extra`} color="yellow" />}
            {summary.typeMismatches > 0 && <Badge label={`${summary.typeMismatches} Type Mismatch`} color="orange" />}
            {summary.nullMismatches > 0 && <Badge label={`${summary.nullMismatches} Null`} color="purple" />}
          </div>
        )}
      </div>

      {/* Diff list */}
      {diffs.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Issues Found</p>
          <div className="flex flex-col gap-2">
            {diffs.map((diff, i) => {
              const style = getDiffStyle(diff.type);
              return (
                <div key={i} className={`rounded-lg border ${style.border} ${style.bg} p-3`}>
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${style.color} bg-black/30 flex-shrink-0 mt-0.5`}>
                      {style.icon} {style.label}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-mono font-medium ${style.color}`}>{diff.path}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{diff.description}</p>
                      {diff.expected !== undefined && diff.actual !== undefined && (
                        <div className="flex gap-4 mt-1.5">
                          <span className="text-xs text-gray-500">
                            Expected: <span className="text-emerald-400 font-mono">{JSON.stringify(diff.expected)}</span>
                          </span>
                          <span className="text-xs text-gray-500">
                            Got: <span className="text-red-400 font-mono">{JSON.stringify(diff.actual)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Side by side JSON */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Received Response</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${summary.isValid ? "bg-emerald-950/50 text-emerald-400" : "bg-red-950/50 text-red-400"}`}>
              {summary.isValid ? "✓ Valid" : `✕ ${summary.total} issue${summary.total !== 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="bg-gray-900/70 rounded-xl border border-gray-800 p-4 overflow-auto max-h-[400px]">
            <JsonViewer data={actual} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Schema</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/50 text-blue-400">Contract</span>
          </div>
          <div className="bg-gray-900/70 rounded-xl border border-gray-800 p-4 overflow-auto max-h-[400px]">
            <JsonViewer data={expected} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricChip({ label, value, color = "gray" }) {
  const colors = {
    gray: "bg-gray-800 text-gray-400",
    green: "bg-emerald-950/60 text-emerald-400",
    red: "bg-red-950/60 text-red-400",
    yellow: "bg-yellow-950/60 text-yellow-400",
  };
  return (
    <span className={`inline-flex gap-1 items-center px-2 py-0.5 rounded text-xs font-mono ${colors[color] || colors.gray}`}>
      <span className="text-gray-600">{label}:</span>
      <span>{value}</span>
    </span>
  );
}

function Badge({ label, color }) {
  const colors = {
    red: "bg-red-900/50 text-red-300 border-red-800",
    yellow: "bg-yellow-900/50 text-yellow-300 border-yellow-800",
    orange: "bg-orange-900/50 text-orange-300 border-orange-800",
    purple: "bg-purple-900/50 text-purple-300 border-purple-800",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${colors[color] || colors.red}`}>
      {label}
    </span>
  );
}
