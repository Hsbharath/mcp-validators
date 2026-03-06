// Schema Comparison Engine
// Deeply compares actual API response against expected schema definition
// Returns structured diff results for rendering

/**
 * Recursively compare an actual value against a schema definition.
 *
 * Schema format:
 *   - "string" | "number" | "boolean" → primitive type check
 *   - ["string"] → array of primitives
 *   - [{ ... }] → array of objects (checks first element shape)
 *   - { key: schemaValue, ... } → nested object
 *
 * Returns array of Difference objects:
 * {
 *   path: string,           // e.g. "data.vehicles[0].vin"
 *   type: "missing" | "extra" | "type_mismatch" | "null_mismatch",
 *   expected: any,
 *   actual: any,
 *   description: string,
 * }
 */
export function validateSchema(actual, schema, path = "") {
  const diffs = [];

  if (actual === null || actual === undefined) {
    diffs.push({
      path: path || "(root)",
      type: "null_mismatch",
      expected: typeof schema === "string" ? schema : "object",
      actual: actual,
      description: `Expected a value at "${path || "(root)"}" but received ${actual}`,
    });
    return diffs;
  }

  // Primitive type check
  if (typeof schema === "string") {
    const actualType = Array.isArray(actual) ? "array" : typeof actual;
    if (actualType !== schema) {
      diffs.push({
        path: path || "(root)",
        type: "type_mismatch",
        expected: schema,
        actual: actualType,
        description: `"${path || "(root)"}" should be ${schema} but is ${actualType}`,
      });
    }
    return diffs;
  }

  // Array schema: ["string"] or [{ ... }]
  if (Array.isArray(schema)) {
    if (!Array.isArray(actual)) {
      diffs.push({
        path: path || "(root)",
        type: "type_mismatch",
        expected: "array",
        actual: typeof actual,
        description: `"${path || "(root)"}" should be an array`,
      });
      return diffs;
    }

    if (schema.length > 0 && actual.length > 0) {
      const itemSchema = schema[0];
      if (typeof itemSchema === "object" && !Array.isArray(itemSchema)) {
        // Check first item shape
        const itemDiffs = validateSchema(actual[0], itemSchema, `${path}[0]`);
        diffs.push(...itemDiffs);
      }
    }
    return diffs;
  }

  // Object schema
  if (typeof schema === "object" && schema !== null) {
    if (typeof actual !== "object" || Array.isArray(actual)) {
      diffs.push({
        path: path || "(root)",
        type: "type_mismatch",
        expected: "object",
        actual: Array.isArray(actual) ? "array" : typeof actual,
        description: `"${path || "(root)"}" should be an object`,
      });
      return diffs;
    }

    const schemaKeys = Object.keys(schema);
    const actualKeys = Object.keys(actual);

    // Check for missing keys (in schema but not in actual)
    for (const key of schemaKeys) {
      const fieldPath = path ? `${path}.${key}` : key;
      if (!(key in actual)) {
        diffs.push({
          path: fieldPath,
          type: "missing",
          expected: schema[key],
          actual: undefined,
          description: `Missing required field "${fieldPath}"`,
        });
      } else {
        // Recurse
        const nested = validateSchema(actual[key], schema[key], fieldPath);
        diffs.push(...nested);
      }
    }

    // Check for extra keys (in actual but not in schema)
    for (const key of actualKeys) {
      const fieldPath = path ? `${path}.${key}` : key;
      if (!(key in schema)) {
        diffs.push({
          path: fieldPath,
          type: "extra",
          expected: undefined,
          actual: actual[key],
          description: `Unexpected extra field "${fieldPath}" not in schema`,
        });
      }
    }

    return diffs;
  }

  return diffs;
}

/**
 * Produce a flat summary of differences
 */
export function summarizeDiffs(diffs) {
  const missing = diffs.filter((d) => d.type === "missing");
  const extra = diffs.filter((d) => d.type === "extra");
  const typeMismatches = diffs.filter((d) => d.type === "type_mismatch");
  const nullMismatches = diffs.filter((d) => d.type === "null_mismatch");

  return {
    total: diffs.length,
    missing: missing.length,
    extra: extra.length,
    typeMismatches: typeMismatches.length,
    nullMismatches: nullMismatches.length,
    isValid: diffs.length === 0,
    severity: diffs.length === 0 ? "pass" : diffs.length <= 2 ? "warning" : "fail",
  };
}

/**
 * Format schema for display (convert schema definition to readable string)
 */
export function formatSchemaForDisplay(schema, indent = 0) {
  const pad = "  ".repeat(indent);

  if (typeof schema === "string") return schema;
  if (Array.isArray(schema)) {
    if (schema.length === 0) return "[]";
    return `[\n${pad}  ${formatSchemaForDisplay(schema[0], indent + 1)}\n${pad}]`;
  }
  if (typeof schema === "object" && schema !== null) {
    const lines = Object.entries(schema).map(
      ([k, v]) => `${pad}  "${k}": ${formatSchemaForDisplay(v, indent + 1)}`
    );
    return `{\n${lines.join(",\n")}\n${pad}}`;
  }
  return String(schema);
}

/**
 * Get diff type color/label for UI
 */
export function getDiffStyle(type) {
  switch (type) {
    case "missing":
      return { color: "text-red-400", bg: "bg-red-950/50", border: "border-red-800", label: "MISSING", icon: "✕" };
    case "extra":
      return { color: "text-yellow-400", bg: "bg-yellow-950/50", border: "border-yellow-800", label: "EXTRA", icon: "+" };
    case "type_mismatch":
      return { color: "text-orange-400", bg: "bg-orange-950/50", border: "border-orange-800", label: "TYPE", icon: "≠" };
    case "null_mismatch":
      return { color: "text-purple-400", bg: "bg-purple-950/50", border: "border-purple-800", label: "NULL", icon: "∅" };
    default:
      return { color: "text-gray-400", bg: "bg-gray-800", border: "border-gray-600", label: "DIFF", icon: "?" };
  }
}
