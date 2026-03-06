// Mock API Layer
// Simulates real network requests to MCP servers with realistic latency and occasional errors

import { getMCPServerById } from "@/data/mcpServers";

// Simulate network latency (ms)
const MIN_LATENCY = 120;
const MAX_LATENCY = 900;

// Probability of a simulated error (0-1)
const ERROR_RATE = 0.12;

function randomLatency() {
  return Math.floor(Math.random() * (MAX_LATENCY - MIN_LATENCY) + MIN_LATENCY);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Possible error types the mock server can throw
const MOCK_ERRORS = [
  {
    httpStatus: 500,
    body: { status: "error", error: "Internal Server Error", message: "An unexpected error occurred in the MCP server" },
  },
  {
    httpStatus: 503,
    body: { status: "unavailable", message: "Service temporarily unavailable. Retry after 30 seconds." },
  },
  {
    httpStatus: 401,
    body: { status: "unauthorized", error: "Authentication required", code: "AUTH_MISSING" },
  },
  {
    httpStatus: 404,
    body: { status: "not_found", error: "Resource not found", path: "/api/v1/resource/unknown" },
  },
];

// Schema mutation variants — introduce deliberate mismatches to simulate real bugs
const MISMATCH_MUTATIONS = [
  // Missing top-level field
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    delete clone.timestamp;
    return { data: clone, mutation: 'Removed "timestamp" field' };
  },
  // Wrong data type
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    if (clone.data && typeof clone.data.total === "number") {
      clone.data.total = String(clone.data.total);
      return { data: clone, mutation: 'Changed "data.total" from number to string' };
    }
    if (clone.data && typeof clone.data.totalEmployees === "number") {
      clone.data.totalEmployees = String(clone.data.totalEmployees);
      return { data: clone, mutation: 'Changed "data.totalEmployees" from number to string' };
    }
    return null;
  },
  // Extra unexpected field
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    clone.data = clone.data || {};
    clone.data.__debug_internal = { trace: "abc123", env: "production" };
    return { data: clone, mutation: 'Added unexpected "__debug_internal" field in data' };
  },
  // Renamed field
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    if (clone.data && clone.data.status !== undefined) {
      clone.data.state = clone.data.status;
      delete clone.data.status;
      return { data: clone, mutation: 'Renamed "data.status" to "data.state"' };
    }
    return null;
  },
  // Missing nested field
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    if (clone.data && Array.isArray(clone.data.vehicles) && clone.data.vehicles.length > 0) {
      delete clone.data.vehicles[0].vin;
      return { data: clone, mutation: 'Removed "vin" from first vehicle in array' };
    }
    if (clone.data && Array.isArray(clone.data.items) && clone.data.items.length > 0) {
      delete clone.data.items[0].sku;
      return { data: clone, mutation: 'Removed "sku" from first item in array' };
    }
    return null;
  },
  // status field wrong value type
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    clone.status = 200; // should be string "success"
    return { data: clone, mutation: 'Changed top-level "status" from string to number 200' };
  },
  // Wrapped in extra nesting
  (resp) => {
    return { data: { result: resp, apiVersion: "2.0" }, mutation: 'Response wrapped in extra "result" object layer' };
  },
  // Null where object expected
  (resp) => {
    const clone = JSON.parse(JSON.stringify(resp));
    if (clone.data && clone.data.dealer) {
      clone.data.dealer = null;
      return { data: clone, mutation: 'Set "data.dealer" to null instead of object' };
    }
    if (clone.data && clone.data.adjuster) {
      clone.data.adjuster = null;
      return { data: clone, mutation: 'Set "data.adjuster" to null instead of object' };
    }
    return null;
  },
];

/**
 * Simulate calling an MCP endpoint.
 * Returns: { response, latencyMs, httpStatus, isMismatch, mismatchDescription, isError }
 */
export async function callMCPEndpoint(serverId, endpointId, options = {}) {
  const server = getMCPServerById(serverId);
  if (!server) throw new Error(`Unknown server: ${serverId}`);

  const endpoint = server.endpoints.find((e) => e.id === endpointId);
  if (!endpoint) throw new Error(`Unknown endpoint: ${endpointId} on server ${serverId}`);

  const latencyMs = randomLatency();
  await sleep(latencyMs);

  // Decide: error, mismatch, or success
  const roll = Math.random();

  // Error scenario
  if (roll < ERROR_RATE && !options.forceSuccess) {
    const err = MOCK_ERRORS[Math.floor(Math.random() * MOCK_ERRORS.length)];
    return {
      response: err.body,
      latencyMs,
      httpStatus: err.httpStatus,
      isError: true,
      isMismatch: false,
      mismatchDescription: null,
    };
  }

  // Mismatch scenario (another 20% of successful calls)
  const mismatchRoll = Math.random();
  if (mismatchRoll < 0.22 && !options.forceSuccess) {
    // Try mutations until one succeeds
    const shuffled = [...MISMATCH_MUTATIONS].sort(() => Math.random() - 0.5);
    for (const mutate of shuffled) {
      const result = mutate(endpoint.fakeResponse);
      if (result) {
        return {
          response: result.data,
          latencyMs,
          httpStatus: 200,
          isError: false,
          isMismatch: true,
          mismatchDescription: result.mutation,
        };
      }
    }
  }

  // Success scenario
  return {
    response: endpoint.fakeResponse,
    latencyMs,
    httpStatus: 200,
    isError: false,
    isMismatch: false,
    mismatchDescription: null,
  };
}

/**
 * Run a health check across all endpoints of a server.
 * Returns array of { endpointId, status, latencyMs }
 */
export async function runServerHealthCheck(serverId) {
  const server = getMCPServerById(serverId);
  if (!server) return [];

  const results = await Promise.all(
    server.endpoints.map(async (endpoint) => {
      const result = await callMCPEndpoint(serverId, endpoint.id);
      return {
        endpointId: endpoint.id,
        endpointName: endpoint.name,
        status: result.isError ? "error" : result.isMismatch ? "mismatch" : "ok",
        latencyMs: result.latencyMs,
        httpStatus: result.httpStatus,
      };
    })
  );

  return results;
}
