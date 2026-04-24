#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  DOCS,
  URI_PREFIX,
  ensureResourcesDir,
  findDoc,
  readDoc,
  slugFromUri,
  uriFor,
} from "./resources.js";
import { searchDocs } from "./tools.js";

function readPackageVersion(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const pkgPath = resolve(here, "..", "package.json");
  const raw = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
  return raw.version ?? "0.0.0";
}

async function main(): Promise<void> {
  await ensureResourcesDir();

  const server = new McpServer(
    { name: "vaneui", version: readPackageVersion() },
    { capabilities: { resources: {}, tools: {} } },
  );

  // Register every synced markdown file as a static MCP resource.
  for (const doc of DOCS) {
    server.registerResource(
      doc.slug,
      uriFor(doc.slug),
      {
        title: doc.name,
        description: doc.description,
        mimeType: "text/markdown",
      },
      async (uri: URL) => {
        const slug = slugFromUri(uri.toString());
        const entry = slug ? findDoc(slug) : undefined;
        if (!entry) {
          throw new Error(
            `Unknown VaneUI doc: ${uri.toString()}. Expected a URI under ${URI_PREFIX}.`,
          );
        }
        const text = await readDoc(entry);
        return {
          contents: [
            {
              uri: uri.toString(),
              mimeType: "text/markdown",
              text,
            },
          ],
        };
      },
    );
  }

  server.registerTool(
    "search_docs",
    {
      description:
        "Search the VaneUI markdown docs (component usage, prop-to-Tailwind mapping, patterns, testing, etc.) for a substring or regex. Returns up to 50 matches with URI, line number, and a short snippet. Use this before guessing prop names, defaults, or class mappings.",
      inputSchema: {
        query: z
          .string()
          .min(1)
          .describe("Text to search for (case-insensitive)."),
        regex: z
          .boolean()
          .optional()
          .describe("If true, interpret `query` as a JavaScript regex. Defaults to false (literal substring)."),
      },
    },
    async ({ query, regex }) => {
      try {
        const hits = await searchDocs({ query, regex });
        if (hits.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No matches for "${query}" across ${DOCS.length} VaneUI docs.`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(hits, null, 2),
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          isError: true,
          content: [{ type: "text", text: `search_docs failed: ${message}` }],
        };
      }
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("vaneui-mcp failed to start:", err);
  process.exit(1);
});
