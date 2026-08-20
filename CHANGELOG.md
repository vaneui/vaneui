# Changelog

All notable changes to `@vaneui/ui` are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html): patch for
fixes, minor for additive props and components, major for anything that changes an
existing prop name, default, or rendered element. Releases ship when work is ready
rather than on a fixed calendar.

## Unreleased

## 1.4.0

`2026-08-20`

### Changed

- **Portalled floating content waits for hydration before it mounts.** A portal
  has no server markup, so `Popup`, `Modal` and `Overlay` returned `null` during
  SSR — but the *first client render* portalled immediately, giving React DOM it
  never emitted server-side and forcing it to throw the subtree away and rebuild
  it. They now stay closed through the hydrating render and mount on the next one.

  The gate is on the open state rather than the portal call, so the transition
  and every element-dependent effect sit downstream of it and run once the
  element actually attaches. Two consequences worth knowing:

  - Portalled content that is open on its **first** render now transitions in
    (`entering` → `entered`) instead of appearing already `entered`. Content
    opened by interaction is unaffected: hydration is long since complete.
  - `portal={false}` is untouched. Inline content has server markup, so it still
    renders server-side and still starts `entered` — the SSR test that pins this
    behaviour is unchanged.

  `Menu` now tracks its content element in state rather than a bare ref. Its
  "focus the first item on open" effect was keyed on the open flag alone, so a
  `defaultOpen` menu focused nothing once the content mounted a render later.

## 1.3.1

`2026-08-20`

### Fixed

- **A `sharp` Select opened a rounded dropdown.** The shape props emit Tailwind
  classes onto the field and never touch `--br`, so the list — a pseudo-element
  that cannot take a class — always painted the size-driven radius. `Select` now
  publishes its resolved shape as `data-shape`, which the picker rules read.
  `pill` deliberately still keeps `--br`: its own radius is effectively infinite
  and a tall list box given that radius swallows its first and last rows.

- **`Modal`, `Popup` and `Tooltip` listed the `shape` category twice.**
  `VISUAL_LAYOUT` already folds `SHAPE` in, and all three spread `...SHAPE` over
  it again. The duplicate is invisible to the type system — the `as const` union
  is identical either way — but every consumer that iterates the array saw the
  category twice, which rendered the shape props twice in generated prop tables
  and produced duplicate React keys. `categoryUniqueness.test.ts` now asserts no
  component names a category more than once.

## 1.3.0

`2026-08-20`

### Added

- **`Label` supports `disabled`.** It was the only form control without the
  category, so a disabled field kept a full-strength label. `<Label disabled>`
  now dims to the same `opacity-50` every other control uses, and a Label
  containing a disabled control dims with it, so you disable the field rather
  than both. The dim is opacity-only: a Label wraps its control, so
  `pointer-events-none` would have made the control it labels unclickable.

  A wrapper that dims what it contains must not let the contained control fade
  a second time. `Label` and the `Select` wrapper now cancel the nested
  `opacity-50`, which previously rendered a disabled `Select` field at a
  quarter strength rather than a half.

### Changed

- **The `Select` dropdown takes its colours from the field.** `option`,
  `optgroup` and `::picker(select)` were pinned to `--color-bg-primary` /
  `--color-text-primary`, so a `filled` or `danger` Select opened a plain light
  list. They now resolve `--bg-color` / `--text-color` / `--border-color`, which
  options already inherit as children of the field. `ghost` resolves its
  background to transparent, which would let the page show through the popup,
  so it falls back to the theme surface.

  A disabled option, typically a placeholder, was pinned to
  `--color-text-secondary` and sat at 1.58:1 on a filled list. It now fades
  toward the list's own background instead, which reproduces the previous
  contrast on the default surface and lifts the filled case to 2.71:1.

### Fixed

- **The `Select` dropdown opened upward over the page.** The UA styles
  `::picker(select)` with `position-try-order: most-block-size`, which picks
  whichever side has MORE room rather than the first side that fits — so any
  field past the middle of the window opened its list above itself even with
  several hundred pixels free below. Pinning the order back to `normal` opens
  the list downward and keeps the flip for when it genuinely does not fit. The
  gap between field and list is now `margin-block` rather than
  `margin-block-start`, because the flipped-up position anchors the picker's
  bottom edge and a top margin left it touching the field.

- **`Field`'s help and error text could vanish on a filled `Field`.** Both are
  rendered by the component with pinned appearances (`secondary` and `danger`),
  which an author cannot reach from outside, and `--color-text-secondary` IS
  `--color-bg-filled-secondary` — so `<Field filled secondary>` painted its
  description at exactly 1.00:1 against its own surface. On a filled `Field`
  both now take the surface's own text colour. A plain `Field` keeps its muted
  description.

## 1.2.1

`2026-08-20`

### Fixed

- **Every appearance on `Img` painted the same neutral border.** An appearance is
  only a palette: it sets the intermediate `--app-*` variables, and the variant
  axis is what maps those onto `--border-color`. `data-variant` is emitted only
  when a variant key is extracted, and `Img` declared the variant category but
  set no variant default, so `<Img border danger>` and `<Img border success>`
  resolved identically. `Img` now defaults to `outline`, like every other
  component. A plain `<Img>` is unchanged: with no appearance it still emits
  neither attribute.

  This is the same failure as `Spinner` in 1.1.3, reached a different way, so it
  is now a test rather than a fix. `appearanceResolution.test.ts` asserts that
  every component declaring an appearance also resolves a variant, with `Link`
  as the one documented exception (its `LinkVariantClassMapper` consumes
  `--app-text` directly). Class-name assertions cannot see this class of bug:
  the class list is identical whether or not the colour resolves.

## 1.2.0

`2026-08-19`

### Changed

- **`Button` and `IconButton` now render the `Spinner` component for their
  loading state**, instead of a private ring the library maintained separately.
  There was one ring drawn two ways: `.vane-button-spinner-ring` and
  `.vane-spinner` had already drifted to different stroke rules once, and every
  future change to the spinner had to be made in both places.

  The button forwards its own size, so the ring still matches the button rather
  than falling back to `Spinner`'s `md` default, and the ring still inherits the
  button's text color, so a filled button gets a light ring. It stays decorative:
  `aria-busy` on the button already conveys the state, so the `Spinner`'s
  `role="status"` is suppressed and the wrapper is `aria-hidden`.

  Two things change for consumers who reach into the theme:

  - The `.vane-button-spinner-ring` class no longer exists. The element a
    loading button renders is now `.vane-spinner`.
  - `theme.button.spinner.spinnerElement` is gone. Restyle the ring through
    `theme.spinner` instead, which now covers standalone spinners and buttons
    at once:

    ```tsx
    <ThemeProvider extraClasses={{ spinner: { primary: 'border-4' } }}>
    ```

## 1.1.3

`2026-08-19`

### Fixed

- **`Spinner`'s appearance props did nothing.** `<Spinner danger>` emitted
  `data-appearance="danger"` and resolved the danger palette, but an appearance
  only reaches `--text-color` through the variant axis, and `Spinner` had no
  `variant` category, so no `data-variant` was emitted and the mapping never
  fired. Every appearance rendered the same inherited color. `Spinner` now
  carries `variant` (defaulting to `outline`, with `inheritAppearance`), so:

  ```tsx
  <Spinner danger />               {/* the danger color */}
  <Spinner danger filled />        {/* the on-danger-fill color */}
  <Spinner />                      {/* still inherits its surface */}
  ```

  A bare `Spinner` is unchanged: it emits neither attribute and keeps inheriting,
  which is what makes it readable inside a filled `Button`, `Badge` or `Card`.
  The variant carries no background here, since a ring has nothing to fill; it
  only selects which color of the appearance the ring paints in.

- **The spinner ring was a 1px hairline at `xs` and `sm`.** Its stroke was
  `0.125em`, and browsers floor `border-width` to whole pixels, so 1.5px and
  1.75px both painted as 1px. The stroke now floors at 2px.

- **`Button`'s loading ring and `Spinner` had drifted to different strokes**
  (a pinned 2px against the scaling `0.125em`), so the same ring rendered at two
  weights depending on where it came from. Both now share one rule.

## 1.1.2

`2026-08-18`

### Added

- **A `Select`'s dropdown list is now styled where the engine allows it.** A native
  `<select>` hands its option list to the operating system, which draws a flat,
  square, unpadded menu: the options get no layout box at all, so padding, radius
  and shadow were inert and only their colors landed. Behind
  `@supports (appearance: base-select)` the list becomes real DOM and is themed to
  match a `Menu` (surface, border, radius, shadow, padded rows, hover, and a
  checkmark on the selected option). Engines without it keep the OS picker
  unchanged, and the control is the same `<select>` either way.

### Fixed

- **A `sharp` or `rounded` `Switch` reshaped only its track.** The knob was
  rendered with no props and its theme pins `pill`, so a square track kept a
  circular knob. The shape now reaches the knob, and its radius insets from the
  track's by the track padding, so the two corners stay concentric rather than
  sharing one radius across boxes of different sizes.

`2026-08-18`

### Fixed

- **The `Input` error icon rendered as a solid disc with a slot cut through it**,
  not an exclamation mark. Its stem and dot are meant to be holes punched in the
  disc, which under the nonzero fill rule requires them to wind opposite to it.
  The stem did; the dot did not, so it merged into the disc and vanished. The
  glyph is now sampled pixel-by-pixel in the e2e suite, because both the class
  list and the icon's geometry are identical either way.

- **A `Select`'s dropdown list ignored the theme.** `<option>` and `<optgroup>`
  default to a transparent background, and the browser paints the popup from the
  option's own colors, so the list fell back to user-agent colors instead of the
  field's. Both now carry the surface and text tokens, group labels lose the
  user-agent italic, and a disabled option is muted.

### Changed

- **A `Select`'s chevron turns danger when the field is invalid.** The chevron is
  a sibling of the field rather than a descendant, so the error state was not
  reaching it and the control's trailing edge stayed neutral while `Input` and
  `Textarea` both changed.

## 1.1.0

`2026-08-18`

### Added

- **`Field`** wires a form control to its label, help text and error message.
  `invalid` already emitted `aria-invalid`, but nothing associated an error
  message, so a screen reader announced that a control was invalid without
  saying why. `Field` owns one id and publishes it, the label id, the
  `aria-describedby` list and the validity to whichever control it wraps.
  `Input`, `Textarea`, `Select`, `Checkbox`, `Radio` and `Switch` all read it,
  and an explicit prop on the control still wins.

  ```tsx
  <Field label="Email" description="We never share it." error={errors.email}>
    <Input type="email" />
  </Field>
  ```

  Passing an `error` also marks the control invalid, so the danger cue and the
  message can never disagree. A `RadioGroup` is not a labelable element, so it
  takes the label by reference through `aria-labelledby` instead. `Field`'s own
  size becomes the control's default, the same way `Label` already worked.

- **`Tooltip`** describes its trigger on hover and on keyboard focus. Built on
  `PopupTrigger`'s tooltip semantics: the trigger gets `aria-describedby` while
  open and never `aria-haspopup` or `aria-expanded`, which do not apply.

- **`Spinner`** promotes the ring that already existed inside `Button` to a
  component of its own. `role="status"`, sized by the size prop and coloured by
  the appearance prop.

- **`Alert`** is a live-region surface: `role="alert"` by default, or
  `role="status"` with `polite` for messages that should wait for a pause.

### Changed

- `Card` and `Stack` now scale their padding down on small viewports, matching the
  behavior `Section` already had. A surface's inset is chrome rather than rhythm: it
  used to stay at its desktop value while the viewport shrank, so nesting a `Stack`
  inside a `Card` inside a `Section` left as little as 220px of content on a 390px
  phone. Both axes step down together so the box stays square.

  | Size | `Card` desktop / tablet / mobile | `Stack` desktop / tablet / mobile |
  | ---- | ------------------------------- | --------------------------------- |
  | `xs` | 12 / 12 / 8 | 8 / 8 / 4 |
  | `sm` | 18 / 16 / 12 | 12 / 10 / 8 |
  | `md` | 24 / 20 / 16 | 16 / 12 / 8 |
  | `lg` | 36 / 28 / 20 | 24 / 16 / 12 |
  | `xl` | 48 / 36 / 24 | 32 / 24 / 16 |

  Desktop values are unchanged, so nothing moves above 1024px. `CardHeader`, `CardBody`
  and `CardFooter` follow the parent `Card`'s curve. To keep the previous fixed padding,
  turn the ramp off per component:
  `<ThemeProvider themeDefaults={{ card: { main: { responsiveSizing: false } } }}>`.

- `Container`, `Modal` and `Popup` ramp their padding the same way, so every surface now
  behaves consistently. `Container` follows `Section` rather than `Card`, capping its
  gutter independently of its block rhythm because a page margin is bounded by the
  viewport. `ModalHeader`, `ModalBody` and `ModalFooter` follow the parent `Modal`.
  Menu dropdowns keep their existing tighter padding at every viewport.

### Fixed

- `Container` now applies the 2:1 inline-to-block padding ratio it has always declared.
  `--aspect-ratio: 2` sat at a lower specificity than the per-size layout rule that
  resets it to `1`, so the declaration never reached the computed value and a padded
  `Container` rendered a square inset. The reset moved to a selector components can
  override. `Container` is `noPadding` by default, so this only affects callers that
  opted in, where the inline padding doubles: 32px to 64px at `md` on desktop.

  `Divider` declared the same ratio and is deliberately left at `1`: it renders with
  `box-sizing: content-box` and `width: 100%`, so inline padding is added outside the
  100% and overflows the parent rather than insetting the rule.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.0.2...v1.1.0)

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

- Prop names now mirror the Tailwind class they emit, keeping the CSS-property prefix:
  `fontLight`, `listInside`, `insetRing`, `backdropBlur`, `placeTop`, and so on. Emitted
  classes, `data-*` values, and computed styles are unchanged. The rule is in
  `.claude/rules/naming-law.md`.
- List position defaults to `listOutside`.
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

### Removed

- The `brand` and `link` appearance values. `primary` keeps the same color `brand` had,
  and [Link](https://vaneui.com/docs/typography-components/link) still renders its blue
  through the `--link-text` cascade, so `<Link>` itself is unchanged.
- The `reverse` category. Use `rowReverse` or `columnReverse`.

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
