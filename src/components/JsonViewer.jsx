"use client";

/**
 * Syntax-highlighted JSON viewer with optional diff highlighting.
 * highlightPaths: Set of dot-notation paths to highlight (for diff display)
 * highlightType: "missing" | "extra" | "type_mismatch" | "null_mismatch"
 */
export default function JsonViewer({ data, highlightPaths = new Set(), diffMap = {} }) {
  const json = JSON.stringify(data, null, 2);

  if (!data) {
    return <div className="text-gray-600 text-xs italic">No data</div>;
  }

  return (
    <pre className="text-xs font-mono leading-5 whitespace-pre-wrap break-all">
      <SyntaxHighlight json={json} />
    </pre>
  );
}

function SyntaxHighlight({ json }) {
  // Tokenize JSON for syntax coloring
  const tokens = tokenizeJson(json);
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={getTokenColor(token.type)}>
          {token.value}
        </span>
      ))}
    </>
  );
}

function getTokenColor(type) {
  switch (type) {
    case "string": return "text-green-400";
    case "number": return "text-blue-400";
    case "boolean": return "text-yellow-400";
    case "null": return "text-purple-400";
    case "key": return "text-sky-300";
    case "punctuation": return "text-gray-500";
    case "whitespace": return "";
    default: return "text-gray-300";
  }
}

function tokenizeJson(json) {
  const tokens = [];
  let i = 0;

  while (i < json.length) {
    // Whitespace
    if (/\s/.test(json[i])) {
      let ws = "";
      while (i < json.length && /\s/.test(json[i])) ws += json[i++];
      tokens.push({ type: "whitespace", value: ws });
      continue;
    }

    // Punctuation
    if ("{}[]:,".includes(json[i])) {
      tokens.push({ type: "punctuation", value: json[i] });
      i++;
      continue;
    }

    // String
    if (json[i] === '"') {
      let str = '"';
      i++;
      while (i < json.length && (json[i] !== '"' || json[i - 1] === "\\")) {
        str += json[i++];
      }
      str += '"';
      i++;

      // Determine if this is a key (followed by colon after optional whitespace)
      let j = i;
      while (j < json.length && json[j] === " ") j++;
      const isKey = json[j] === ":";
      tokens.push({ type: isKey ? "key" : "string", value: str });
      continue;
    }

    // Number
    if (/[\d\-]/.test(json[i])) {
      let num = "";
      while (i < json.length && /[\d.\-eE+]/.test(json[i])) num += json[i++];
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Boolean / null
    if (json.startsWith("true", i)) { tokens.push({ type: "boolean", value: "true" }); i += 4; continue; }
    if (json.startsWith("false", i)) { tokens.push({ type: "boolean", value: "false" }); i += 5; continue; }
    if (json.startsWith("null", i)) { tokens.push({ type: "null", value: "null" }); i += 4; continue; }

    // Fallback
    tokens.push({ type: "other", value: json[i] });
    i++;
  }

  return tokens;
}
