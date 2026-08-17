# Changelog

All notable changes to `@vaneui/ui` are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html): patch for
fixes, minor for additive props and components, major for anything that changes an
existing prop name, default, or rendered element. Releases ship when work is ready
rather than on a fixed calendar.

## Unreleased

## 1.0.2

`2026-08-17`

### Added

- `CHANGELOG.md` now ships inside the published package. It is the single source of
  truth for release notes, and
  [the changelog page](https://vaneui.com/docs/reference/changelog) renders it directly
  from the installed package rather than keeping a second copy.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.0.1...v1.0.2)

## 1.0.1

`2026-08-17`

### Fixed

- Added the missing `./table` subpath export. `import { Table } from "@vaneui/ui/table"`
  threw `ERR_PACKAGE_PATH_NOT_EXPORTED` even though the built chunks shipped, because
  `table` was the only component directory absent from the `exports` map. The
  main-barrel import was never affected.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.0.0...v1.0.1)

## 1.0.0

`2026-08-16`

First stable release. The `latest` dist-tag previously pointed at `0.2.0` while all
development shipped under the `alpha` tag, so this is the first time the current
architecture is installable with a plain `npm install @vaneui/ui`.

`1.0.0` marks the public API as stable: 55 exported components across layout,
typography, controls, and overlays, driven by the boolean props API and themed
through `ThemeProvider`.

### Migrating from 0.x

Every breaking change in this release is a **rename**. The emitted Tailwind classes,
`data-*` attribute values, and computed styles are unchanged, so upgrading is a
find-and-replace over prop names with no visual diff.

Prop names now mirror the Tailwind class they emit, keeping the CSS-property prefix.
The full rule is in `.claude/rules/naming-law.md`.

| Category | Before | After |
|---|---|---|
| Font weight | `thin` … `black` | `fontThin` … `fontBlack` |
| Font family | `sans`, `serif`, `mono`, `heading` | `fontSans`, `fontSerif`, `fontMono`, `fontHeading` |
| List marker | `disc`, `decimal`, `circle`, `square`, `lowerAlpha`, `lowerRoman` | `listDisc`, `listDecimal`, `listCircle`, `listSquare`, `listLowerAlpha`, `listLowerRoman` |
| List position | `inside`, `outside` | `listInside`, `listOutside` |
| Ring | `ring`, `noRing` | `insetRing`, `noInsetRing` |
| Blur | `blur`, `noBlur` | `backdropBlur`, `noBackdropBlur` |
| Validity | `error` | `invalid` |
| Popup sizing | `minWidth`, `maxHeight` | `constrainWidth`, `clampHeight` |
| Breakpoints | `mobileCol`, `tabletCol`, `desktopCol` | `mobileStack`, `tabletStack`, `desktopStack` |
| Appearance inherit | `inherit` | `inheritAppearance` |
| Responsive sizing | `responsive` | `responsiveSizing` |
| Align self | `selfStart`, `selfCenter`, … | `alignSelfStart`, `alignSelfCenter`, … |
| Logical borders | `borderS`, `borderE` | `borderStart`, `borderEnd` |
| Popup placement | `top`, `bottomStart`, … | `placeTop`, `placeBottomStart`, … |
| Variant | `outlined` | `outline` |

Removed with no direct replacement:

- The `reverse` category. Use `rowReverse` or `columnReverse`.
- The `brand` appearance. Use `primary`, which keeps the same color.
- The `link` appearance. [`Link`](https://vaneui.com/docs/typography-components/link)
  still renders its blue by default through the `--link-text` cascade, so `<Link>`
  needs no change; only an explicit `link` appearance on another component does.

One default changed: list position now defaults to `listOutside`.

### Added

- **[Table](https://vaneui.com/docs/layout-components/table) family.** `Table`, `Thead`,
  `Tbody`, `Tfoot`, `Tr`, `Th`, `Td`, `Caption`, with the size prop cascading from any
  container element down to the cells.
- **Dark mode** through the `data-theme="dark"` token contract. No component code
  changes are required, and consumers can declare their own themes by re-declaring the
  same tokens under any selector.
- **RTL support.** Logical CSS utilities behind the existing props, plus `textStart` and
  `textEnd` alongside the physical `textLeft` and `textRight`.
- **Nested submenus** on [Menu](https://vaneui.com/docs/overlay-components/menu), with
  the full keyboard model including typeahead, `Home`, `End`, and arrow-key traversal.
- **Icon container mode.** [Icon](https://vaneui.com/docs/basic-components/icon) gained
  opt-in padding, shape, border, and ring, and its glyph size decoupled from the
  font-size variable.
- **List markers and spacing.** `listCircle`, `listSquare`, `listLowerAlpha`,
  `listLowerRoman`, inside/outside positioning, per-item gap control, automatic marker
  progression on nested lists, and a
  [ListItem](https://vaneui.com/docs/typography-components/list) `icon` prop for custom
  markers.
- **Size-driven margin props** on layout components and block typography, on the same
  scale as gap and padding.
- **Per-side border widths** and logical `borderStart` / `borderEnd` props.
- **`alignSelf` and `justifySelf` props**, with
  [Popup](https://vaneui.com/docs/overlay-components/popup) edge alignment driven
  through them.
- **Granular inherit props** (`inheritSize`, `inheritColor`, `inheritBg`,
  `inheritBorder`) alongside `inheritAppearance`.
- **`wordBreak` category**, and `whitespace` extended to typography components.
- **`href` support on `Row`, `Col`, and `Stack`**, with a conditional focus ring.

### Changed

- Gaps and padding scale on a shared accelerating curve, and the icon-to-label gap is
  role-aware so controls and compact pills space differently at the same size.
- [Button](https://vaneui.com/docs/basic-components/button) and `IconButton` share a
  control height.
- [Badge](https://vaneui.com/docs/basic-components/badge) no longer sets `uppercase` by
  default.
- [Label](https://vaneui.com/docs/form-components/label) defaults to a stacked column
  layout, which suits forms. Use `row` for inline controls such as a checkbox.
- [Modal](https://vaneui.com/docs/overlay-components/modal) always offers a close
  button, floating it when there is no title.

### Fixed

- Popups and menus opened inside a `Modal` now render above the backdrop, and
  <kbd>Escape</kbd> closes the innermost overlay rather than the whole modal.
- `Popup` gained a maximum width and an inner scroll box, so wide or tall content no
  longer runs off-screen on small viewports.
- Popup arrow alignment for the `*Start` and `*End` placements, and a spurious vertical
  flip in the JavaScript positioning fallback.
- Responsive breakpoints are exclusive (`width <` the boundary), and combining several
  `*Stack` or `*Hide` props resolves to the widest.
- `Modal` no longer strands focus on `<body>` when the trigger unmounts.
- Error state is announced, not just colored: `invalid` emits `aria-invalid` and a
  `data-status` attribute, and [Input](https://vaneui.com/docs/form-components/input)
  renders a non-color alert icon.
- Keyboard focus rings on `NavLink`, `MenuItem`, `Link`, `Card`, and `Chip`.

### Accessibility

- `Modal` wires `aria-labelledby` and `aria-describedby` from `ModalHeader` and
  `ModalBody` automatically, and traps focus.
- `Input` gained a muted read-only treatment with `aria-readonly`.
- [Blockquote](https://vaneui.com/docs/typography-components/blockquote) gained a `cite`
  prop for source attribution.

[Full history](https://github.com/vaneui/vaneui/commits/v1.0.0)
