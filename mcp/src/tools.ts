import { DOCS, readDoc, uriFor, type DocEntry } from "./resources.js";

export const MAX_RESULTS = 50;
/** snippet radius around the match, in characters */
const SNIPPET_RADIUS = 80;

export interface SearchHit {
  uri: string;
  slug: string;
  lineNumber: number;
  snippet: string;
}

export interface SearchArgs {
  query: string;
  regex?: boolean;
}

function buildMatcher(query: string, regex: boolean): RegExp {
  if (regex) {
    // "g" so we can iterate all matches on a line, "i" for case-insensitive.
    return new RegExp(query, "gi");
  }
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "gi");
}

function snippetAround(line: string, matchStart: number, matchEnd: number): string {
  const start = Math.max(0, matchStart - SNIPPET_RADIUS);
  const end = Math.min(line.length, matchEnd + SNIPPET_RADIUS);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < line.length ? "..." : "";
  return (prefix + line.slice(start, end) + suffix).replace(/\s+/g, " ").trim();
}

async function searchOne(entry: DocEntry, matcher: RegExp): Promise<SearchHit[]> {
  const text = await readDoc(entry);
  const lines = text.split(/\r?\n/);
  const hits: SearchHit[] = [];
  for (let i = 0; i < lines.length; i++) {
    matcher.lastIndex = 0;
    const line = lines[i];
    const m = matcher.exec(line);
    if (!m) continue;
    hits.push({
      uri: uriFor(entry.slug),
      slug: entry.slug,
      lineNumber: i + 1,
      snippet: snippetAround(line, m.index, m.index + m[0].length),
    });
  }
  return hits;
}

export async function searchDocs(args: SearchArgs): Promise<SearchHit[]> {
  const query = (args.query ?? "").trim();
  if (!query) {
    throw new Error("`query` must be a non-empty string.");
  }

  let matcher: RegExp;
  try {
    matcher = buildMatcher(query, args.regex === true);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid regex: ${msg}`);
  }

  const results: SearchHit[] = [];
  for (const doc of DOCS) {
    const hits = await searchOne(doc, matcher);
    for (const h of hits) {
      results.push(h);
      if (results.length >= MAX_RESULTS) return results;
    }
  }
  return results;
}
