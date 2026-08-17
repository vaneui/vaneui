# Changelog

All notable changes to `@vaneui/ui` are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.0.2 - 2026-08-17

### Added

- `CHANGELOG.md` now ships inside the published package. It is the single source of
  truth for release notes, and vaneui.com/changelog renders it directly from the
  installed package rather than keeping a second copy.

## 1.0.1 - 2026-08-17

### Fixed

- Added the missing `./table` subpath export. `import { Table } from "@vaneui/ui/table"`
  threw `ERR_PACKAGE_PATH_NOT_EXPORTED` even though the built chunks shipped, because
  `table` was the only component directory absent from the `exports` map. The
  main-barrel import was never affected.

## 1.0.0 - 2026-08-16

First stable release. The `latest` dist-tag previously pointed at `0.2.0` while all
development shipped under the `alpha` tag, so this is the first time the current
architecture is installable with a plain `npm install @vaneui/ui`.

`1.0.0` marks the public API as stable: 55 exported components across layout,
typography, controls, and overlays, driven by the boolean props API and themed
through `ThemeProvider`.

### Added

- **Table family.** `Table`, `Thead`, `Tbody`, `Tfoot`, `Tr`, `Th`, `Td`, `Caption`,
  with the size prop cascading from any container element down to the cells.
- **Dark mode** through the `data-theme="dark"` token contract. No component code
  changes are required, and consumers can declare their own themes by re-declaring
  the same tokens under any selector.
- **RTL support.** Logical CSS utilities behind the existing props, plus `textStart`
  and `textEnd` alongside the physical `textLeft` and `textRight`.
- **Nested submenus** on `Menu`, with the full keyboard model including typeahead,
  `Home`, `End`, and arrow-key traversal.
- **Icon container mode.** `Icon` gained opt-in padding, shape, border, and ring, and
  its glyph size decoupled from the font-size variable.
- **List markers and spacing.** `circle`, `square`, `lowerAlpha`, `lowerRoman`,
  inside/outside positioning, per-item gap control, automatic marker progression on
  nested lists, and a `ListItem` `icon` prop for custom markers.
- **Size-driven margin props** on layout components and block typography, on the same
  scale as gap and padding.
- **Per-side border widths** and logical `borderS` / `borderE` props.
- **`alignSelf` and `justifySelf` props**, with `Popup` edge alignment driven through
  them.
- **Granular inherit props** (`inheritSize`, `inheritColor`, `inheritBg`,
  `inheritBorder`) alongside `inheritAppearance`.
- **`wordBreak` category**, and `whitespace` extended to typography components.
- **`href` support on `Row`, `Col`, and `Stack`**, with a conditional focus ring.

### Changed

- **Breaking: prop renames.** Multi-value prop categories now follow one rule, the
  prop name mirrors its Tailwind class and keeps the CSS-property prefix. `light`
  became `fontLight`, `inside` became `listInside`, and so on. See
  `.claude/rules/naming-law.md` for the full rule and the two-bucket classification.
- **Breaking: `brand` and `link` appearance values were removed.** `Link` renders its
  link color by default without an appearance value.
- **Breaking: list position props** now default to `outside`.
- Gaps and padding scale on a shared accelerating curve, and the icon-to-label gap is
  role-aware so controls and compact pills space differently at the same size.
- `Button` and `IconButton` share a control height.
- `Badge` no longer sets `uppercase` by default.
- `Label` defaults to a stacked column layout, which suits forms.
- `Modal` always offers a close button, floating it when there is no title.

### Fixed

- Popups and menus opened inside a `Modal` now render above the backdrop, and
  <kbd>Escape</kbd> closes the innermost overlay rather than the whole modal.
- `Popup` gained a maximum width and an inner scroll box, so wide or tall content no
  longer runs off-screen on small viewports.
- Popup arrow alignment for the `*Start` and `*End` placements, and a spurious
  vertical flip in the JavaScript positioning fallback.
- Responsive breakpoints are exclusive (`width <` the boundary), and combining several
  `*Stack` or `*Hide` props resolves to the widest.
- `Modal` no longer strands focus on `<body>` when the trigger unmounts.
- Error state is announced, not just colored: `invalid` emits `aria-invalid` and a
  `data-status` attribute, and `Input` renders a non-color alert icon.
- Keyboard focus rings on `NavLink`, `MenuItem`, `Link`, `Card`, and `Chip`.

### Accessibility

- `Modal` wires `aria-labelledby` and `aria-describedby` from `ModalHeader` and
  `ModalBody` automatically, and traps focus.
- `Input` gained a muted read-only treatment with `aria-readonly`.
- `Blockquote` gained a `cite` prop for source attribution.
