"use client";

import { useState } from "react";
import { callMCPEndpoint } from "@/lib/mockApi";
import { validateSchema, summarizeDiffs } from "@/lib/schemaValidator";
import DiffPanel from "./DiffPanel";

export default function ValidatorPanel({ server }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(server.endpoints[0] || null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset when server changes
  if (result && result.serverId !== server.id) {
    setResult(null);
  }

  const handleCall = async (forceSuccess = false) => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setResult(null);

    try {
      const callResult = await callMCPEndpoint(server.id, selectedEndpoint.id, { forceSuccess });
      const diffs = callResult.isError
        ? []
        : validateSchema(callResult.response, selectedEndpoint.expectedSchema);
      const summary = summarizeDiffs(diffs);

      setResult({
        serverId: server.id,
        endpointId: selectedEndpoint.id,
        ...callResult,
        diffs,
        summary,
        calledAt: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      {/* Server Header */}
      <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: server.color }}>
          {server.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-white">{server.name}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{server.description}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs px-2 py-0.5 rounded-full border border-gray-700 text-gray-500">{server.category}</span>
            <span className="text-xs text-gray-700">{server.endpoints.length} endpoint{server.endpoints.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* Endpoint Selector */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Select Endpoint</label>
        <div className="flex flex-col gap-2">
          {server.endpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => { setSelectedEndpoint(ep); setResult(null); }}
              className={`text-left rounded-xl border p-3 transition-colors ${
                selectedEndpoint?.id === ep.id
                  ? "border-blue-600 bg-blue-950/30"
                  : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded font-mono ${
                  ep.method === "GET" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                  ep.method === "POST" ? "bg-blue-950 text-blue-400 border border-blue-800" :
                  "bg-orange-950 text-orange-400 border border-orange-800"
                }`}>
                  {ep.method}
                </span>
                <span className="text-xs font-mono text-gray-300">{ep.path}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{ep.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      {selectedEndpoint && (
        <div className="flex gap-2">
          <button
            onClick={() => handleCall(false)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Calling...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-1.88a1 1 0 000-1.943z" />
                </svg>
                Call Endpoint
              </>
            )}
          </button>
          <button
            onClick={() => handleCall(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-700"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Force Valid Response
          </button>
          {result && (
            <button
              onClick={() => setResult(null)}
              disabled={loading}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-gray-400 text-xs rounded-lg transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Validation Results</p>
            <p className="text-xs text-gray-700">Called at {result.calledAt}</p>
          </div>
          <DiffPanel
            diffs={result.diffs}
            summary={result.summary}
            actual={result.response}
            expected={selectedEndpoint.expectedSchema}
            latencyMs={result.latencyMs}
            httpStatus={result.httpStatus}
            isError={result.isError}
          />
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && selectedEndpoint && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 font-medium">No results yet</p>
          <p className="text-xs text-gray-700 mt-1">Click "Call Endpoint" to validate the schema contract</p>
        </div>
      )}
    </div>
  );
}
