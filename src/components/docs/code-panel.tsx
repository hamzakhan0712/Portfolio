import { useMemo, type ReactNode } from "react";
import { API_BASE } from "@/data/docs-nav";
import { CodeBlock, type Sample } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

type CodePanelProps = {
  method: "GET" | "POST";
  /** Path after the base, e.g. "/profile". */
  path: string;
  /** The payload that comes back. Serialised, not described. */
  response: unknown;
  /** Request body, for the routes that take one. */
  body?: Record<string, unknown>;
  /** Defaults to 200 OK. */
  status?: string;
  /** Rendered under the response — architecture diagrams, extra samples. */
  children?: ReactNode;
  className?: string;
};

/**
 * The right-hand rail: what you would send, and what comes back.
 *
 * Both halves are generated from the same `path` and `response`, so a sample
 * cannot drift out of step with the payload it documents. The response is the
 * real object the page renders elsewhere — serialised, not transcribed.
 */
export function CodePanel({
  method,
  path,
  response,
  body,
  status = "200 OK",
  children,
  className,
}: CodePanelProps) {
  const url = `${API_BASE}${path}`;

  const requestSamples = useMemo<Sample[]>(() => {
    const payload = body ? JSON.stringify(body, null, 2) : null;

    const curl = payload
      ? [
          `curl -X POST ${url} \\`,
          `  -H "Content-Type: application/json" \\`,
          `  -d '${JSON.stringify(body)}'`,
        ].join("\n")
      : `curl ${url}`;

    const python = payload
      ? [
          "import requests",
          "",
          `response = requests.post(`,
          `    "${url}",`,
          `    json=${payload.replace(/\n/g, "\n    ")},`,
          `)`,
          "print(response.json())",
        ].join("\n")
      : [
          "import requests",
          "",
          `response = requests.get("${url}")`,
          "print(response.json())",
        ].join("\n");

    const javascript = payload
      ? [
          `const response = await fetch("${url}", {`,
          `  method: "POST",`,
          `  headers: { "Content-Type": "application/json" },`,
          `  body: JSON.stringify(${payload.replace(/\n/g, "\n  ")}),`,
          `});`,
          "",
          "const data = await response.json();",
        ].join("\n")
      : [
          `const response = await fetch("${url}");`,
          "const data = await response.json();",
        ].join("\n");

    return [
      { label: "cURL", language: "bash", code: curl },
      { label: "Python", language: "python", code: python },
      { label: "JavaScript", language: "javascript", code: javascript },
    ];
  }, [url, body]);

  const { serialised, bytes } = useMemo(() => {
    const text = JSON.stringify(response, null, 2);
    // Byte length, not character count — the one number here that is measured.
    const size = new TextEncoder().encode(text).length;
    return { serialised: text, bytes: size };
  }, [response]);

  const ok = status.startsWith("2");

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p className="mono-label mb-2">Request</p>
        <CodeBlock
          samples={requestSamples}
          title={
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "method",
                  method === "GET" ? "method-get" : "method-post",
                )}
              >
                {method}
              </span>
              <span className="truncate text-foreground/70">{path}</span>
            </span>
          }
        />
      </div>

      <div>
        <p className="mono-label mb-2">Response</p>
        <CodeBlock
          stream
          samples={[{ label: "JSON", language: "json", code: serialised }]}
          title={
            <span className="flex items-center gap-2">
              <span className={cn("status", ok ? "status-ok" : "status-err")}>
                {status}
              </span>
              <span className="hidden sm:inline">application/json</span>
            </span>
          }
          footer={
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="tabular">{bytes.toLocaleString()} bytes</span>
              <span aria-hidden>·</span>
              <span>assembled in your browser — there is no server</span>
            </span>
          }
        />
      </div>

      {children}
    </div>
  );
}

export default CodePanel;
