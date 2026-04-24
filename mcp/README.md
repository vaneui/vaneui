# @vaneui/mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the VaneUI documentation as MCP resources. Any MCP-aware client (Claude Code, Cursor, VS Code, Copilot CLI, etc.) can read these docs on demand and search across them with a single tool call, so you don't have to paste rules into prompts by hand.

## Sources

Docs come from two sibling repos and are bundled at build time:

- **`vaneui/`** — API reference and agent-facing rules (`CLAUDE.md` + `.claude/rules/*.md`). These describe how VaneUI is built internally and how AI agents should work with its source.
- **`vaneui-web/`** — user-facing guides (`app/docs/data/getting-started/*.md`, `app/docs/data/customization/*.md`) plus **per-component reference docs** extracted from `app/docs/data/{category}/*.tsx`. The TSX example files drive the live demos on vaneui.com; `scripts/sync-component-docs.mjs` parses them via the TypeScript compiler API and emits one `component-<slug>.md` per component into `resources/`.

## Local dev usage

After cloning and building this package:

```bash
cd C:/GitHub/vaneui/mcp
npm install
npm run build
```

Point your MCP client at the built server. For clients that consume a `mcp.json`-style config:

```json
{
  "mcpServers": {
    "vaneui": {
      "command": "node",
      "args": ["C:/GitHub/vaneui/mcp/dist/server.js"]
    }
  }
}
```

## Post-publish usage (`npx`)

Once published to npm, any MCP client can spawn the server without a local clone:

```json
{
  "mcpServers": {
    "vaneui": {
      "command": "npx",
      "args": ["-y", "@vaneui/mcp"]
    }
  }
}
```

## How to add or update docs

The corpus lives in two sibling repos across three source types:

- `C:/GitHub/vaneui/CLAUDE.md` and `C:/GitHub/vaneui/.claude/rules/*.md` — API reference / agent rules.
- `C:/GitHub/vaneui-web/app/docs/data/**/*.md` — narrative getting-started and customization guides.
- `C:/GitHub/vaneui-web/app/docs/data/{category}/*.tsx` — component example files; extracted to `component-<slug>.md`.

This package copies / extracts all three into `mcp/resources/` at build time.

### Updating a plain markdown doc (rules or guides)

1. Edit the source markdown file in the appropriate repo.
2. If you added a new file, register it in both `scripts/sync-docs.mjs` (in the right source list) and `src/resources.ts` (the `DOCS` array — each entry needs a slug, filename, display name, and description).
3. `npm run build`.
4. Restart your MCP client.

### Updating a per-component reference

The per-component docs (`component-button.md`, `component-card.md`, …) are **generated**, not hand-written. To change what they contain, edit the source TSX example file.

1. Edit `C:/GitHub/vaneui-web/app/docs/data/{category}/{component}.tsx`. Each `DocsPagePart` entry becomes one `## <title>` section in the output markdown. Update `title`, `md` (prose; supports inline code fences), and/or `component` (JSX) / `code` (explicit code override). Setting `code: ""` suppresses the auto-generated JSX fence for that part — useful when the prose already contains the definitive code sample.
2. `npm run build`.
3. Restart your MCP client.

### Adding a new component reference

1. Create the example TSX in `vaneui-web` following the existing pattern.
2. Register it in `partsMap` in `app/docs/docsSections.ts` **and** in `COMPONENT_DOCS` in `scripts/sync-component-docs.mjs` (src path, slug, human-readable name, short description).
3. Add a matching `DocEntry` to `DOCS` in `src/resources.ts` with `slug: "component-<slug>"` and `file: "component-<slug>.md"`.
4. `npm run build`. Strict mode (`npm run sync:strict`) will fail if any registered TSX file is missing or has no `*Examples` export.

## Development

The sync script expects `vaneui-web/` as a sibling of `vaneui/` (so the vaneui-web path resolves to `../../vaneui-web` from this package). Override with `VANEUI_WEB_PATH=/path/to/vaneui-web` if you keep it elsewhere.

- `npm run sync` — lenient: runs `sync-docs.mjs` then `sync-component-docs.mjs`. If `vaneui-web/` is missing, warns and copies only the 9 vaneui rule docs. Good for local dev when you only have one repo checked out.
- `npm run sync:strict` — strict: exits with code 1 if `vaneui-web/`, any expected markdown, or any component TSX is missing. Used by `prepublishOnly` so we never ship a tarball with partial docs.
- `npm run build` — runs the lenient sync + `tsc`.
- `npm publish` — runs `prepublishOnly`, which uses `sync:strict` to guarantee all 56 docs (9 rules + 11 guides + 36 per-component references) are present.

## Available resources

From `vaneui/` (API reference and agent rules):

| URI | What |
|-----|------|
| `vaneui://docs/component-usage` | Primary consumer-facing guide: setup, ThemeProvider, component selection, composition patterns, anti-patterns. |
| `vaneui://docs/prop-to-tailwind-mapping` | Table of VaneUI boolean props and the Tailwind classes they produce. |
| `vaneui://docs/component-patterns` | Internal component structure: categories, defaults, 3-layer prop system. |
| `vaneui://docs/props-and-theme` | Theme resolution pipeline and prop category details. |
| `vaneui://docs/css-conventions` | CSS variable system and Tailwind v4 patterns. |
| `vaneui://docs/testing` | Jest + Testing Library conventions. |
| `vaneui://docs/e2e-testing` | Playwright e2e conventions. |
| `vaneui://docs/playground-examples` | Rules for `playground/src/App.tsx` examples. |
| `vaneui://docs/claude` | VaneUI project overview (`CLAUDE.md`). |

From `vaneui-web/` (user-facing getting-started guides):

| URI | What |
|-----|------|
| `vaneui://docs/installation` | How to install `@vaneui/ui` with npm/yarn/pnpm, including required CSS imports and peer deps. |
| `vaneui://docs/usage-basics` | Fundamental patterns for using VaneUI components: boolean props, size/appearance/variant, common layouts. |
| `vaneui://docs/core-concepts` | The boolean-props philosophy behind VaneUI and why it differs from className-driven component libraries. |

From `vaneui-web/` (user-facing customization guides):

| URI | What |
|-----|------|
| `vaneui://docs/theming-overview` | High-level tour of VaneUI's `ComponentTheme` architecture — how theme classes, defaults, and class mappers fit together. |
| `vaneui://docs/using-themeprovider` | Wrapping an app in `ThemeProvider`, nesting providers, and passing theme context to children. |
| `vaneui://docs/theme-defaults` | Setting app-wide default boolean props per component via `ThemeProvider`'s `themeDefaults`. |
| `vaneui://docs/theme-and-override` | Using `themeOverride` to mutate base classes or defaults for a subtree. |
| `vaneui://docs/extra-classes` | Adding extra CSS classes keyed to active boolean props via `extraClasses`. |
| `vaneui://docs/customizing-styles` | When and how to override component styles with `className` and how `tailwind-merge` resolves conflicts. |
| `vaneui://docs/variant-inheritance` | How VaneUI components inherit colors from ancestors via CSS custom-property cascade. |
| `vaneui://docs/css-variables` | The three-tier CSS variable system (unit -> computed -> consumed) that drives size, color, and spacing. |

Per-component reference (extracted from `vaneui-web/app/docs/data/{category}/*.tsx`):

| URI | Component |
|-----|-----------|
| `vaneui://docs/component-button` | Button |
| `vaneui://docs/component-badge` | Badge |
| `vaneui://docs/component-chip` | Chip |
| `vaneui://docs/component-checkbox` | Checkbox |
| `vaneui://docs/component-label` | Label |
| `vaneui://docs/component-code` | Code (inline) |
| `vaneui://docs/component-divider` | Divider |
| `vaneui://docs/component-input` | Input |
| `vaneui://docs/component-img` | Img |
| `vaneui://docs/component-icon` | Icon |
| `vaneui://docs/component-icon-button` | IconButton |
| `vaneui://docs/component-kbd` | Kbd |
| `vaneui://docs/component-mark` | Mark |
| `vaneui://docs/component-section` | Section |
| `vaneui://docs/component-container` | Container |
| `vaneui://docs/component-row` | Row |
| `vaneui://docs/component-col` | Col |
| `vaneui://docs/component-stack` | Stack |
| `vaneui://docs/component-card` | Card |
| `vaneui://docs/component-grid2` … `component-grid6` | Grid2 through Grid6 |
| `vaneui://docs/component-overlay` | Overlay |
| `vaneui://docs/component-modal` | Modal |
| `vaneui://docs/component-popup` | Popup |
| `vaneui://docs/component-menu` | Menu |
| `vaneui://docs/component-navlink` | NavLink |
| `vaneui://docs/component-text` | Text |
| `vaneui://docs/component-title` | Title |
| `vaneui://docs/component-page-title` | PageTitle |
| `vaneui://docs/component-section-title` | SectionTitle |
| `vaneui://docs/component-link` | Link |
| `vaneui://docs/component-list` | List |
| `vaneui://docs/component-blockquote` | Blockquote |

Each per-component doc contains the titled example sections shown on `vaneui.com/docs/<section>/<slug>`: prose, code, and (for simple examples) JSX as a tsx code fence. Dynamic patterns like `ComponentKeys.appearance.map(...)` are preserved verbatim rather than runtime-expanded.

All resources have `mimeType: text/markdown`.

## Tools

### `search_docs`

Substring or regex search across the full doc corpus.

| Param | Type | Notes |
|-------|------|-------|
| `query` | string | Required. Case-insensitive. |
| `regex` | boolean | Optional. If `true`, `query` is parsed as a JavaScript regex. Defaults to `false`. |

Returns up to 50 hits, each containing `uri`, `slug`, `lineNumber`, and a short surrounding `snippet`. Use this before guessing prop names, defaults, or class mappings — the answer is almost always already in the docs.
