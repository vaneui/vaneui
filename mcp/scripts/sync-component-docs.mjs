#!/usr/bin/env node
// Parses component example TSX files from vaneui-web and emits one per-component
// markdown reference into mcp/resources/.
//
// Each TSX file under vaneui-web/app/docs/data/{category}/{component}.tsx exports
// a `<name>Examples: DocsPagePart[]` array where each entry has:
//   { title, md, component, code? }
//
// We cannot eval the JSX at build time (no React DOM, no @vaneui/ui import
// resolution), so we use the TypeScript compiler to parse the AST and emit the
// JSX source text verbatim inside a tsx fence. This preserves dynamic patterns
// like `ComponentKeys.appearance.map(...)` which are more informative for an AI
// reader than the runtime-expanded output anyway.
//
// Output file per component: resources/component-<slug>.md
//
// Flags:
//   --strict   Exit 1 on missing vaneui-web, missing TSX file, or parse failure.
//              Used by prepublishOnly so tarballs never ship partial docs.
//
// Env:
//   VANEUI_WEB_PATH   Absolute or relative path to vaneui-web checkout.
//                     Defaults to ../../vaneui-web (sibling of vaneui repo).

import ts from "typescript";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, "..");
const RESOURCES_DIR = join(PKG_ROOT, "resources");

const STRICT = process.argv.includes("--strict");

// Source TSX files to extract. Mirrors partsMap in
// vaneui-web/app/docs/docsSections.ts. Slugs match the public docs URL
// (vaneui.com/docs/<section>/<slug>); the MCP resource filename is
// `component-<slug>.md` with URI vaneui://docs/component-<slug>.
const COMPONENT_DOCS = [
  // Basic Components
  { src: "app/docs/data/basic-components/button.tsx",          slug: "button",         name: "Button",         description: "Triggers an action. Supports boolean props for appearance, size, variant, shape, font weight, and can render as <a> via href." },
  { src: "app/docs/data/basic-components/badge.tsx",           slug: "badge",          name: "Badge",          description: "Compact status / count indicator. Pill + uppercase + semibold by default." },
  { src: "app/docs/data/basic-components/chip.tsx",            slug: "chip",           name: "Chip",           description: "Tag / filter token. Defaults to secondary appearance + monospace." },
  { src: "app/docs/data/basic-components/checkbox.tsx",        slug: "checkbox",       name: "Checkbox",       description: "Custom-styled checkbox. Use inside Label for accessible text association." },
  { src: "app/docs/data/basic-components/label.tsx",           slug: "label",          name: "Label",          description: "Form field label. Flex row with gap, sm size, inherit appearance by default." },
  { src: "app/docs/data/basic-components/code.tsx",            slug: "code",           name: "Code",           description: "Inline code span. Monospace, rounded, with padding." },
  { src: "app/docs/data/basic-components/divider.tsx",         slug: "divider",        name: "Divider",        description: "Horizontal / vertical separator line." },
  { src: "app/docs/data/basic-components/input.tsx",           slug: "input",          name: "Input",          description: "Text input. All native <input> attrs + VaneUI size / appearance / variant props." },
  { src: "app/docs/data/basic-components/img.tsx",             slug: "img",            name: "Img",            description: "Image with VaneUI styling (size, shape, border, shadow, object-fit)." },
  { src: "app/docs/data/basic-components/icon-component.tsx",  slug: "icon",           name: "Icon",           description: "Lightweight SVG wrapper for consistent sizing and color inheritance." },
  { src: "app/docs/data/basic-components/iconbutton.tsx",      slug: "icon-button",    name: "IconButton",     description: "Square icon-only button. Supports href, loading state, and all Button props." },
  { src: "app/docs/data/basic-components/kbd.tsx",             slug: "kbd",            name: "Kbd",            description: "Keyboard key / shortcut display. Monospace with 3D border effect." },
  { src: "app/docs/data/basic-components/mark.tsx",            slug: "mark",           name: "Mark",           description: "Highlighted text. Defaults to warning (yellow) appearance." },
  // Layout Components
  { src: "app/docs/data/layout-components/section.tsx",        slug: "section",        name: "Section",        description: "Semantic page section. Flex column + padding + responsive by default." },
  { src: "app/docs/data/layout-components/container.tsx",      slug: "container",      name: "Container",      description: "Centered max-width wrapper. Flex column + itemsCenter + gap." },
  { src: "app/docs/data/layout-components/row.tsx",            slug: "row",            name: "Row",            description: "Horizontal flexbox. itemsCenter + gap by default. Use mobileCol / tabletCol for responsive stacking." },
  { src: "app/docs/data/layout-components/col.tsx",            slug: "col",            name: "Col",            description: "Vertical flexbox (no padding). Pair with Row for column layouts." },
  { src: "app/docs/data/layout-components/stack.tsx",          slug: "stack",          name: "Stack",          description: "Vertical flexbox with padding + gap + flexWrap. General-purpose container." },
  { src: "app/docs/data/layout-components/card.tsx",           slug: "card",           name: "Card",           description: "Bordered content container. padding + rounded + gap + border by default. href renders as <a>. Sub-components: CardHeader, CardBody, CardFooter." },
  { src: "app/docs/data/layout-components/grid2.tsx",          slug: "grid2",          name: "Grid2",          description: "Two-column CSS grid." },
  { src: "app/docs/data/layout-components/grid3.tsx",          slug: "grid3",          name: "Grid3",          description: "Three-column CSS grid." },
  { src: "app/docs/data/layout-components/grid4.tsx",          slug: "grid4",          name: "Grid4",          description: "Four-column CSS grid." },
  { src: "app/docs/data/layout-components/grid5.tsx",          slug: "grid5",          name: "Grid5",          description: "Five-column CSS grid." },
  { src: "app/docs/data/layout-components/grid6.tsx",          slug: "grid6",          name: "Grid6",          description: "Six-column CSS grid." },
  // Overlay Components
  { src: "app/docs/data/overlay-components/overlay.tsx",       slug: "overlay",        name: "Overlay",        description: "Fullscreen portal-rendered backdrop. Click-to-close and optional blur." },
  { src: "app/docs/data/overlay-components/modal.tsx",         slug: "modal",          name: "Modal",          description: "Accessible dialog with focus trap, scroll lock, role=dialog. Sub-components: ModalHeader, ModalBody, ModalFooter, ModalCloseButton." },
  { src: "app/docs/data/overlay-components/popup.tsx",         slug: "popup",          name: "Popup",          description: "Floating element using CSS Anchor Positioning. 12 placement options, width matching, click-outside dismissal." },
  { src: "app/docs/data/overlay-components/menu.tsx",          slug: "menu",           name: "Menu",           description: "Dropdown menu with full keyboard navigation. Uses MenuItem, MenuLabel, and Divider as children." },
  // Navigation Components
  { src: "app/docs/data/navigation-components/navlink.tsx",    slug: "navlink",        name: "NavLink",        description: "Sidebar / header navigation link. Active state with aria-current='page'. Renders <a> with href, <button> without." },
  // Typography Components
  { src: "app/docs/data/typography-components/text.tsx",       slug: "text",           name: "Text",           description: "Body text (<p>). Size, weight, alignment, transform, and appearance props." },
  { src: "app/docs/data/typography-components/title.tsx",      slug: "title",          name: "Title",          description: "Subsection heading (<h3>)." },
  { src: "app/docs/data/typography-components/pagetitle.tsx",  slug: "page-title",     name: "PageTitle",      description: "Primary page heading (<h1>). Responsive font-size." },
  { src: "app/docs/data/typography-components/sectiontitle.tsx", slug: "section-title", name: "SectionTitle", description: "Section heading (<h2>). Responsive font-size." },
  { src: "app/docs/data/typography-components/link.tsx",       slug: "link",           name: "Link",           description: "Hyperlink (<a>). Underline + link appearance (blue) by default. external prop auto-sets target=_blank + rel=noopener." },
  { src: "app/docs/data/typography-components/list.tsx",       slug: "list",           name: "List",           description: "Bullet / numbered list. Pair with ListItem. decimal prop switches to <ol>." },
  { src: "app/docs/data/typography-components/blockquote.tsx", slug: "blockquote",     name: "Blockquote",     description: "Quoted content with left-border accent. Inherits ancestor appearance." },
];

function resolveVaneuiWebRoot() {
  const fromEnv = process.env.VANEUI_WEB_PATH;
  if (fromEnv && fromEnv.length > 0) return resolve(fromEnv);
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

function fail(msg) {
  if (STRICT) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(msg);
  return null;
}

// Find `export const <name>Examples[: DocsPagePart[]] = [...]`.
function findExamplesArray(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const isExport = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExport) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!decl.initializer || !ts.isArrayLiteralExpression(decl.initializer)) continue;
      const name = decl.name.getText(sourceFile);
      if (!name.endsWith("Examples")) continue;
      return decl.initializer;
    }
  }
  return null;
}

function stringLiteralValue(node) {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return null;
}

// Strip the common leading whitespace across lines so extracted JSX doesn't
// keep its deep indent inside a code fence.
function dedent(text) {
  if (!text) return "";
  const lines = text.split("\n");
  const firstLine = lines[0];
  const rest = lines.slice(1);
  const indents = rest.filter((l) => l.trim().length > 0).map((l) => (l.match(/^ */) || [""])[0].length);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  const out = [firstLine.trim(), ...rest.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l))];
  return out.join("\n").replace(/\s+$/g, "");
}

function extractParts(arrayLit, sourceFile) {
  const parts = [];
  for (const el of arrayLit.elements) {
    if (!ts.isObjectLiteralExpression(el)) continue;
    const part = { title: null, md: null, componentText: null, code: undefined };
    for (const prop of el.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = prop.name.getText(sourceFile);
      if (name === "title") {
        part.title = stringLiteralValue(prop.initializer);
      } else if (name === "md") {
        part.md = stringLiteralValue(prop.initializer);
      } else if (name === "component") {
        // Unwrap `component: ( <JSX/> )` to just `<JSX/>` — the parens are
        // syntactic sugar to let the JSX start on its own line.
        let init = prop.initializer;
        while (ts.isParenthesizedExpression(init)) init = init.expression;
        part.componentText = dedent(init.getText(sourceFile));
      } else if (name === "code") {
        const lit = stringLiteralValue(prop.initializer);
        // code field is present; value may be "" (explicitly hide code block).
        part.code = lit ?? "";
      }
    }
    if (part.title != null && part.md != null) parts.push(part);
  }
  return parts;
}

function renderMarkdown(meta, parts) {
  const lines = [];
  lines.push(`# ${meta.name}`);
  lines.push("");
  lines.push(meta.description);
  lines.push("");
  lines.push(`Source: \`vaneui-web/${meta.src}\` —
live demos at https://vaneui.com/docs/${meta.src.split("/").slice(-2, -1)[0]}/${meta.slug}`);
  lines.push("");

  for (const part of parts) {
    lines.push(`## ${part.title}`);
    lines.push("");
    if (part.md) {
      lines.push(part.md);
      lines.push("");
    }
    if (part.code === undefined) {
      // No explicit `code` field: emit the JSX expression as the code sample.
      if (part.componentText && part.componentText.trim().length > 0) {
        lines.push("```tsx");
        lines.push(part.componentText);
        lines.push("```");
        lines.push("");
      }
    } else if (part.code !== "") {
      // Explicit non-empty code override.
      lines.push("```tsx");
      lines.push(part.code);
      lines.push("```");
      lines.push("");
    }
    // If code === "", the md already contains a code fence — skip.
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

async function main() {
  const webRoot = resolveVaneuiWebRoot();
  if (!(await pathExists(webRoot))) {
    fail(
      `[sync-component-docs] vaneui-web not found at ${webRoot} — skipping ${COMPONENT_DOCS.length} component reference docs. Pass VANEUI_WEB_PATH or check out vaneui-web as a sibling repo.`,
    );
    return;
  }
  if (!(await pathExists(RESOURCES_DIR))) {
    await mkdir(RESOURCES_DIR, { recursive: true });
  }

  let wrote = 0;
  for (const meta of COMPONENT_DOCS) {
    const tsxPath = join(webRoot, meta.src);
    if (!(await pathExists(tsxPath))) {
      fail(`[sync-component-docs] missing source file ${meta.src} — skipping`);
      continue;
    }
    const source = await readFile(tsxPath, "utf8");
    const sourceFile = ts.createSourceFile(
      tsxPath,
      source,
      ts.ScriptTarget.Latest,
      /* setParentNodes */ true,
      ts.ScriptKind.TSX,
    );
    const arrayLit = findExamplesArray(sourceFile);
    if (!arrayLit) {
      fail(`[sync-component-docs] no *Examples export found in ${meta.src} — skipping`);
      continue;
    }
    const parts = extractParts(arrayLit, sourceFile);
    if (parts.length === 0) {
      fail(`[sync-component-docs] no DocsPagePart entries extracted from ${meta.src} — skipping`);
      continue;
    }
    const md = renderMarkdown(meta, parts);
    const destPath = join(RESOURCES_DIR, `component-${meta.slug}.md`);
    await writeFile(destPath, md, "utf8");
    console.log(
      `extracted  vaneui-web:${meta.src}  ->  resources/component-${meta.slug}.md  (${parts.length} parts)`,
    );
    wrote++;
  }
  console.log(`[sync-component-docs] wrote ${wrote} component reference files to resources/`);
}

main().catch((err) => {
  console.error("sync-component-docs failed:", err);
  process.exit(1);
});
