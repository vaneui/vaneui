import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

// dist/server.js -> dist/ -> package root -> resources/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const RESOURCES_DIR = resolve(__dirname, "..", "resources");

export interface DocEntry {
  /** slug used in the URI (e.g. "component-usage") */
  slug: string;
  /** filename inside resources/ (e.g. "component-usage.md") */
  file: string;
  /** human-readable label shown in MCP clients */
  name: string;
  /** tells the agent when to read this doc */
  description: string;
}

export const DOCS: DocEntry[] = [
  {
    slug: "component-usage",
    file: "component-usage.md",
    name: "VaneUI Component Usage Guide",
    description:
      "Primary consumer-facing guide. Read this first when using @vaneui/ui: setup, ThemeProvider, component selection, composition patterns, responsive layout, and anti-patterns.",
  },
  {
    slug: "prop-to-tailwind-mapping",
    file: "prop-to-tailwind-mapping.md",
    name: "VaneUI Prop to Tailwind Mapping",
    description:
      "Reference table mapping VaneUI boolean props to the Tailwind classes they produce. Use when deciding between a VaneUI prop and a className override, or when translating existing Tailwind markup to VaneUI.",
  },
  {
    slug: "component-patterns",
    file: "component-patterns.md",
    name: "VaneUI Component Patterns",
    description:
      "Internal structure of VaneUI components: categories, defaults, 3-layer prop system. Read when modifying or extending @vaneui/ui itself.",
  },
  {
    slug: "props-and-theme",
    file: "props-and-theme.md",
    name: "VaneUI Props and Theme Internals",
    description:
      "Theme resolution pipeline, prop categories, and theme override rules. Read before touching props/ or theme/ source files.",
  },
  {
    slug: "css-conventions",
    file: "css-conventions.md",
    name: "VaneUI CSS Conventions",
    description:
      "CSS variable system, Tailwind v4 patterns, and styling conventions used across theme files and .css files.",
  },
  {
    slug: "testing",
    file: "testing.md",
    name: "VaneUI Testing Conventions",
    description:
      "Jest + Testing Library patterns: component test structure, componentThemeCoverage, prop leak prevention, tag switching.",
  },
  {
    slug: "e2e-testing",
    file: "e2e-testing.md",
    name: "VaneUI E2E Testing",
    description:
      "Playwright e2e conventions: fixtures, computed-style assertions, when e2e tests are required.",
  },
  {
    slug: "playground-examples",
    file: "playground-examples.md",
    name: "VaneUI Playground Examples",
    description:
      "Rules for playground/src/App.tsx examples: required sections, cleanup policy, structure.",
  },
  {
    slug: "claude",
    file: "claude.md",
    name: "VaneUI Project Overview (CLAUDE.md)",
    description:
      "High-level VaneUI project overview, critical rules, component inventory, defaults table, and the component implementation workflow.",
  },
  // User-facing getting-started guides (sourced from vaneui-web).
  {
    slug: "installation",
    file: "installation.md",
    name: "Installation",
    description:
      "How to install `@vaneui/ui` with npm/yarn/pnpm, including required CSS imports and peer deps.",
  },
  {
    slug: "usage-basics",
    file: "usage-basics.md",
    name: "Usage Basics",
    description:
      "Fundamental patterns for using VaneUI components: boolean props, size/appearance/variant, common layouts.",
  },
  {
    slug: "core-concepts",
    file: "core-concepts.md",
    name: "Core Concepts",
    description:
      "The boolean-props philosophy behind VaneUI and why it differs from className-driven component libraries.",
  },
  // User-facing customization guides (sourced from vaneui-web).
  {
    slug: "theming-overview",
    file: "theming-overview.md",
    name: "Theming Overview",
    description:
      "High-level tour of VaneUI's `ComponentTheme` architecture — how theme classes, defaults, and class mappers fit together.",
  },
  {
    slug: "using-themeprovider",
    file: "using-themeprovider.md",
    name: "Using ThemeProvider",
    description:
      "Wrapping an app in `ThemeProvider`, nesting providers, and passing theme context to children.",
  },
  {
    slug: "theme-defaults",
    file: "theme-defaults.md",
    name: "Theme Defaults",
    description:
      "Setting app-wide default boolean props per component via `ThemeProvider`'s `themeDefaults`.",
  },
  {
    slug: "theme-and-override",
    file: "theme-and-override.md",
    name: "Theme Override",
    description:
      "Using `themeOverride` to mutate base classes or defaults for a subtree.",
  },
  {
    slug: "extra-classes",
    file: "extra-classes.md",
    name: "Extra Classes",
    description:
      "Adding extra CSS classes keyed to active boolean props via `extraClasses` — for custom animations, effects, or project-specific styling.",
  },
  {
    slug: "customizing-styles",
    file: "customizing-styles.md",
    name: "Customizing Styles",
    description:
      "When and how to override component styles with `className` — how `tailwind-merge` resolves conflicts and the do/don't patterns.",
  },
  {
    slug: "variant-inheritance",
    file: "variant-inheritance.md",
    name: "Variant Inheritance",
    description:
      "How VaneUI components inherit colors from ancestors via CSS custom-property cascade, and how to opt in/out.",
  },
  {
    slug: "css-variables",
    file: "css-variables.md",
    name: "CSS Variables",
    description:
      "The three-tier CSS variable system (unit -> computed -> consumed) that drives size, color, and spacing.",
  },
  // Per-component reference (extracted at build time from vaneui-web example TSX files).
  // Each entry's markdown is generated by scripts/sync-component-docs.mjs and contains
  // the same titled example sections shown on vaneui.com/docs/<section>/<slug>.
  {
    slug: "component-button",
    file: "component-button.md",
    name: "Component: Button",
    description:
      "Button examples and code: appearances, sizes, icons, font weights, border radii, link/disabled, outline vs filled.",
  },
  {
    slug: "component-badge",
    file: "component-badge.md",
    name: "Component: Badge",
    description:
      "Badge examples and code: pill status indicator with size and appearance variants.",
  },
  {
    slug: "component-chip",
    file: "component-chip.md",
    name: "Component: Chip",
    description:
      "Chip examples and code: compact tag/filter token with monospace and secondary defaults.",
  },
  {
    slug: "component-checkbox",
    file: "component-checkbox.md",
    name: "Component: Checkbox",
    description:
      "Checkbox examples and code: controlled state, sizes, appearances, label composition.",
  },
  {
    slug: "component-label",
    file: "component-label.md",
    name: "Component: Label",
    description:
      "Label examples and code: form field label wrapping inputs and checkboxes.",
  },
  {
    slug: "component-code",
    file: "component-code.md",
    name: "Component: Code",
    description:
      "Inline Code examples: monospace span for commands, file paths, and inline code snippets.",
  },
  {
    slug: "component-divider",
    file: "component-divider.md",
    name: "Component: Divider",
    description:
      "Divider examples and code: horizontal and vertical separator lines.",
  },
  {
    slug: "component-input",
    file: "component-input.md",
    name: "Component: Input",
    description:
      "Input examples and code: sizes, appearances, states (disabled, readonly), and Label pairing.",
  },
  {
    slug: "component-img",
    file: "component-img.md",
    name: "Component: Img",
    description:
      "Img examples and code: size, shape, border, shadow, and object-fit options.",
  },
  {
    slug: "component-icon",
    file: "component-icon.md",
    name: "Component: Icon",
    description:
      "Icon examples and code: SVG wrapper with consistent sizing and color inheritance.",
  },
  {
    slug: "component-icon-button",
    file: "component-icon-button.md",
    name: "Component: IconButton",
    description:
      "IconButton examples and code: square icon-only button with loading, href, and all Button appearance props.",
  },
  {
    slug: "component-kbd",
    file: "component-kbd.md",
    name: "Component: Kbd",
    description:
      "Kbd examples and code: keyboard key / shortcut display with 3D border effect.",
  },
  {
    slug: "component-mark",
    file: "component-mark.md",
    name: "Component: Mark",
    description:
      "Mark examples and code: highlighted text with appearance variants (warning default).",
  },
  {
    slug: "component-section",
    file: "component-section.md",
    name: "Component: Section",
    description:
      "Section examples and code: semantic page section with responsive padding and flex column layout.",
  },
  {
    slug: "component-container",
    file: "component-container.md",
    name: "Component: Container",
    description:
      "Container examples and code: centered max-width wrapper for page content.",
  },
  {
    slug: "component-row",
    file: "component-row.md",
    name: "Component: Row",
    description:
      "Row examples and code: horizontal flex layout with gap, wrap, and responsive mobileCol/tabletCol props.",
  },
  {
    slug: "component-col",
    file: "component-col.md",
    name: "Component: Col",
    description:
      "Col examples and code: vertical flex layout without padding; complement to Row.",
  },
  {
    slug: "component-stack",
    file: "component-stack.md",
    name: "Component: Stack",
    description:
      "Stack examples and code: vertical flex layout with padding and gap; general-purpose container.",
  },
  {
    slug: "component-card",
    file: "component-card.md",
    name: "Component: Card",
    description:
      "Card examples and code: bordered content container, href-as-anchor, and sub-components (CardHeader, CardBody, CardFooter).",
  },
  {
    slug: "component-grid2",
    file: "component-grid2.md",
    name: "Component: Grid2",
    description:
      "Grid2 examples and code: two-column CSS grid layout.",
  },
  {
    slug: "component-grid3",
    file: "component-grid3.md",
    name: "Component: Grid3",
    description:
      "Grid3 examples and code: three-column CSS grid layout.",
  },
  {
    slug: "component-grid4",
    file: "component-grid4.md",
    name: "Component: Grid4",
    description:
      "Grid4 examples and code: four-column CSS grid layout.",
  },
  {
    slug: "component-grid5",
    file: "component-grid5.md",
    name: "Component: Grid5",
    description:
      "Grid5 examples and code: five-column CSS grid layout.",
  },
  {
    slug: "component-grid6",
    file: "component-grid6.md",
    name: "Component: Grid6",
    description:
      "Grid6 examples and code: six-column CSS grid layout.",
  },
  {
    slug: "component-overlay",
    file: "component-overlay.md",
    name: "Component: Overlay",
    description:
      "Overlay examples and code: fullscreen portal-rendered backdrop with blur and click-to-close.",
  },
  {
    slug: "component-modal",
    file: "component-modal.md",
    name: "Component: Modal",
    description:
      "Modal examples and code: accessible dialog with focus trap, sizes, form fields, blur overlay, non-dismissible, compound (Header/Body/Footer), convenience props, and full-screen variants.",
  },
  {
    slug: "component-popup",
    file: "component-popup.md",
    name: "Component: Popup",
    description:
      "Popup examples and code: CSS Anchor Positioning floating element with 12 placements and width matching.",
  },
  {
    slug: "component-menu",
    file: "component-menu.md",
    name: "Component: Menu",
    description:
      "Menu examples and code: dropdown with MenuItem, MenuLabel, Divider, keyboard nav.",
  },
  {
    slug: "component-navlink",
    file: "component-navlink.md",
    name: "Component: NavLink",
    description:
      "NavLink examples and code: navigation link with active state (aria-current=page), href-as-anchor, and button fallback.",
  },
  {
    slug: "component-text",
    file: "component-text.md",
    name: "Component: Text",
    description:
      "Text examples and code: body paragraph with sizes, weights, alignments, transforms, and appearances.",
  },
  {
    slug: "component-title",
    file: "component-title.md",
    name: "Component: Title",
    description:
      "Title examples and code: <h3> subsection heading with size and weight variants.",
  },
  {
    slug: "component-page-title",
    file: "component-page-title.md",
    name: "Component: PageTitle",
    description:
      "PageTitle examples and code: <h1> top-of-page heading; responsive font scaling.",
  },
  {
    slug: "component-section-title",
    file: "component-section-title.md",
    name: "Component: SectionTitle",
    description:
      "SectionTitle examples and code: <h2> section heading; responsive font scaling.",
  },
  {
    slug: "component-link",
    file: "component-link.md",
    name: "Component: Link",
    description:
      "Link examples and code: anchor with underline/link appearance defaults, external prop, and tag switching for Next.js.",
  },
  {
    slug: "component-list",
    file: "component-list.md",
    name: "Component: List",
    description:
      "List examples and code: bullet/decimal list with ListItem children.",
  },
  {
    slug: "component-blockquote",
    file: "component-blockquote.md",
    name: "Component: Blockquote",
    description:
      "Blockquote examples and code: left-border accent quote that inherits ancestor appearance.",
  },
];

export const URI_SCHEME = "vaneui";
export const URI_PREFIX = `${URI_SCHEME}://docs/`;

export function uriFor(slug: string): string {
  return `${URI_PREFIX}${slug}`;
}

export function slugFromUri(uri: string): string | null {
  if (!uri.startsWith(URI_PREFIX)) return null;
  return uri.slice(URI_PREFIX.length);
}

export function findDoc(slug: string): DocEntry | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export async function ensureResourcesDir(): Promise<void> {
  try {
    await access(RESOURCES_DIR);
  } catch {
    throw new Error(
      `Resources directory not found at ${RESOURCES_DIR}. Run \`npm run sync\` (or \`npm run build\`) inside the @vaneui/mcp package to populate it.`,
    );
  }
}

export async function readDoc(entry: DocEntry): Promise<string> {
  const path = join(RESOURCES_DIR, entry.file);
  return readFile(path, "utf8");
}
