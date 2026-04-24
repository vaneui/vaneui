#!/usr/bin/env node
// Copies VaneUI markdown docs into mcp/resources/.
//
// Sources:
//   1. The parent `vaneui/` repo (CLAUDE.md + .claude/rules/*.md) — API reference
//      and agent-facing rules. Always required.
//   2. The sibling `vaneui-web/` repo (app/docs/data/**.md) — user-facing
//      getting-started and customization guides. Optional in lenient mode so
//      local dev works with only vaneui/ checked out.
//
// Flags:
//   --strict   Exit 1 if vaneui-web or any expected file is missing. Used by
//              `prepublishOnly` so we never ship a tarball with partial docs.
//
// Env:
//   VANEUI_WEB_PATH   Absolute or relative path to the vaneui-web checkout.
//                     Defaults to `../../vaneui-web` (sibling of the vaneui repo).
//
// Run via: npm run sync  (lenient)  or  npm run sync:strict  (strict).
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdir, copyFile, rm, readdir, access } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, "..");
// PKG_ROOT = C:/GitHub/vaneui/mcp
// REPO_ROOT = C:/GitHub/vaneui (the parent vaneui repo)
const REPO_ROOT = resolve(PKG_ROOT, "..");
const RESOURCES_DIR = join(PKG_ROOT, "resources");

const STRICT = process.argv.includes("--strict");

// Source 1: parent vaneui repo. { src relative to REPO_ROOT, dest filename }.
const VANEUI_DOCS = [
  { src: "CLAUDE.md", dest: "claude.md" },
  { src: ".claude/rules/component-patterns.md", dest: "component-patterns.md" },
  { src: ".claude/rules/component-usage.md", dest: "component-usage.md" },
  { src: ".claude/rules/css-conventions.md", dest: "css-conventions.md" },
  { src: ".claude/rules/e2e-testing.md", dest: "e2e-testing.md" },
  { src: ".claude/rules/playground-examples.md", dest: "playground-examples.md" },
  { src: ".claude/rules/prop-to-tailwind-mapping.md", dest: "prop-to-tailwind-mapping.md" },
  { src: ".claude/rules/props-and-theme.md", dest: "props-and-theme.md" },
  { src: ".claude/rules/testing.md", dest: "testing.md" },
];

// Source 2: sibling vaneui-web repo. { src relative to vaneui-web root, dest filename }.
// Slugs are globally unique so files are flattened into resources/.
const VANEUI_WEB_DOCS = [
  { src: "app/docs/data/getting-started/installation.md", dest: "installation.md" },
  { src: "app/docs/data/getting-started/usage-basics.md", dest: "usage-basics.md" },
  { src: "app/docs/data/getting-started/core-concepts.md", dest: "core-concepts.md" },
  { src: "app/docs/data/customization/theming-overview.md", dest: "theming-overview.md" },
  { src: "app/docs/data/customization/using-themeprovider.md", dest: "using-themeprovider.md" },
  { src: "app/docs/data/customization/theme-defaults.md", dest: "theme-defaults.md" },
  { src: "app/docs/data/customization/theme-and-override.md", dest: "theme-and-override.md" },
  { src: "app/docs/data/customization/extra-classes.md", dest: "extra-classes.md" },
  { src: "app/docs/data/customization/customizing-styles.md", dest: "customizing-styles.md" },
  { src: "app/docs/data/customization/variant-inheritance.md", dest: "variant-inheritance.md" },
  { src: "app/docs/data/customization/css-variables.md", dest: "css-variables.md" },
];

function resolveVaneuiWebRoot() {
  const fromEnv = process.env.VANEUI_WEB_PATH;
  if (fromEnv && fromEnv.length > 0) {
    return resolve(fromEnv);
  }
  // Default: sibling of the vaneui repo (two levels up from mcp package root).
  return resolve(PKG_ROOT, "..", "..", "vaneui-web");
}

async function pathExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function syncFrom(rootLabel, rootDir, docs) {
  let written = 0;
  for (const { src, dest } of docs) {
    const from = join(rootDir, src);
    const to = join(RESOURCES_DIR, dest);
    if (!(await pathExists(from))) {
      const msg = `[sync] ${rootLabel}: missing source file ${src}`;
      if (STRICT) {
        console.error(msg);
        process.exit(1);
      }
      console.warn(`${msg} — skipping`);
      continue;
    }
    await copyFile(from, to);
    console.log(`synced  ${rootLabel}:${src}  ->  resources/${dest}`);
    written++;
  }
  return written;
}

async function main() {
  // Start clean so removed source files don't linger in resources/.
  await rm(RESOURCES_DIR, { recursive: true, force: true });
  await mkdir(RESOURCES_DIR, { recursive: true });

  // Source 1: vaneui (always required).
  const wroteVaneui = await syncFrom("vaneui", REPO_ROOT, VANEUI_DOCS);

  // Source 2: vaneui-web (optional in lenient mode).
  const vaneuiWebRoot = resolveVaneuiWebRoot();
  let wroteVaneuiWeb = 0;
  if (!(await pathExists(vaneuiWebRoot))) {
    const msg = `[sync] vaneui-web not found at ${vaneuiWebRoot} — skipping 11 user-facing docs. Pass VANEUI_WEB_PATH or check out vaneui-web as a sibling repo.`;
    if (STRICT) {
      console.error(msg);
      process.exit(1);
    }
    console.warn(msg);
  } else {
    wroteVaneuiWeb = await syncFrom("vaneui-web", vaneuiWebRoot, VANEUI_WEB_DOCS);
  }

  const entries = await readdir(RESOURCES_DIR);
  const total = wroteVaneui + wroteVaneuiWeb;
  console.log(`[sync] wrote ${total} files to resources/ (${entries.length} present)`);
}

main().catch((err) => {
  console.error("sync-docs failed:", err);
  process.exit(1);
});
