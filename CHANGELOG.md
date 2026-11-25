# Changelog

All notable changes to `@vaneui/ui` are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
package follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html): patch for
fixes, minor for additive props and components, major for anything that changes an
existing prop name, default, or rendered element. Releases ship when work is ready
rather than on a fixed calendar.

## Unreleased

### Changed

- Dark scheme: Cards, Modals, Popups (Menu dropdowns too), the open Select list and outline
  Buttons in the primary appearance painted the page color, the darkest gray of the scheme, so on
  a `secondary` panel they sat darker than the panel and looked sunken. In the dark scheme they now
  take the new `--color-bg-raised` (gray-900), one step above the page, as in most component
  libraries; on a gray panel they are level with it, and their border sets them apart. The light
  scheme leaves `--color-bg-raised` unset, so there they keep `--color-bg-primary` and an override
  of it, scoped ones included. A `Section` keeps the page color, and fields keep `--color-bg-form`.
- Dark scheme: the primary hover is gray-800 (was gray-900) and the pressed color gray-700 (was
  gray-800), the colors the secondary appearance already uses, so a hover shows on a Card and in a
  menu, whose surface is now gray-900. An active `NavLink` takes the pressed color too.
- `SegmentedControl`: the track is the tertiary gray in both schemes (gray-800 in the dark one,
  was a mix of gray-900 and gray-800), one step above a Card.

## 1.8.1

`2026-11-24`

The selected segment of a SegmentedControl is raised above its track in the dark scheme too.

### Fixed

- `SegmentedControl` in the dark scheme: the selected segment of an outline control painted the
  page color, the darkest color of the scheme, so it sat darker than its track and read as a hole
  instead of a raised button. It is now the track lifted toward the text color, tinted by the
  appearance and lighter than the track, with text that keeps at least 4.5:1. The dark track sits
  between the gray-panel color and the one above it, so the control also shows on a `secondary`
  Section or Card. The light scheme is unchanged.

## 1.8.0

`2026-11-23`

New components (Avatar, AvatarGroup, Breadcrumb, SegmentedControl, Skeleton), loading placeholders
through one `skeleton` prop, start and end sections on fields, small props that used to need a
class or a wrapper, and gentler corners on cards, modals and images with one setting that scales
every radius.

### Added

- `Avatar`: a picture of a person or thing. It shows `src`, then the initials of `name` when
  there is no image or it fails to load, then its children, then a person icon. The `name` is the
  image's text alternative (or `alt`), and initials or children get `role="img"` with the name as
  their label. It takes the size, appearance, variant and shape props (a circle by default,
  `rounded` for a square with size-driven corners), and `imgProps` for the `<img>`.
- `AvatarGroup`: a row of overlapping avatars with a ring in the surface color between them. Its
  size reaches the avatars, `max` shows that many and counts the rest in one "+N" avatar, and
  `total` counts against a list you only load in part. It renders `role="group"`.
- `Breadcrumb` and `BreadcrumbItem`: a `nav` labelled "Breadcrumb" (pass `aria-label` to
  translate it) around an ordered list. An item with `href` is a link, one without is text, and
  the last item is the current page (`aria-current="page"`) unless an item sets `current`.
  `separator` replaces the chevron, and `tag` takes a router link.
- `SegmentedControl` and `SegmentedControlItem`: one choice out of a few, shown side by side on a
  track, for a filter or a view switch. The control is a `radiogroup` and each segment a `<label>`
  around a native radio, so a click, the arrow keys and form submission work without script. It
  takes `value` or `defaultValue`, `onChange`, `name` (generated when omitted), `disabled` and
  `required`. It is as tall as a Button of its size (`sm` by default) with a Button's corners; its
  size, appearance, variant and shape reach the segments, and a segment's own prop wins. The
  selected segment is a raised surface by default and takes the fill with `filled`, on a neutral
  track; with `ghost` there is no track and the selected segment is tinted. `wFull` stretches
  it, and a `Field` names it. A segment's `className` and `style` go to the segment, and `ref`
  and the other attributes to its radio.
- `startSection` and `endSection` on `Input`, and `startSection` on `Select` (its end holds the
  chevron): an icon, a prefix such as `https://`, a unit or a button inside the field. The field
  reserves the measured width of each section, the section follows the field's size, and the
  input keeps its place in the tree when a section comes or goes, so it keeps focus and text.
  `Field` passes them to the control it renders. With a section, `className`, the width props
  and the sizing part of `style` go to the wrapper, as on `Select`.
- `gapXs`, `gapSm`, `gapMd`, `gapLg` and `gapXl` on the layout components: a fixed gap step that
  stays the same at every size and width, where `gap` follows the size prop.
- `Textarea`: `autosize` grows the box with its text (`field-sizing: content`, with a script
  fallback for browsers without it), and `resizeNone`, `resizeX` and `resize` change the handle.
  The default `resizeY` keeps the vertical handle it had.
- `Table`: `striped` tints every other body row and `hoverable` the row under the pointer, both
  with a tint of the row's own text color.
- `Badge`: `dot` draws a status dot before the text. With no text and an `aria-label`, the badge
  is the dot and gets `role="img"`.
- `Progress`: `indeterminate` for work of unknown length. `value` becomes optional, the bar drops
  `aria-valuenow`, and the fill slides across the track (the other way in RTL, still with reduced
  motion).
- `srOnly` on the typography components and `Label`: visually hidden, still read by screen
  readers.
- `aspectSquare`, `aspectVideo` and `aspectAuto` on `Img`, `Card`, `Row`, `Col` and `Stack`.
- `skeleton` on every component: it shows the component as a loading placeholder in its own
  layout. On a container (`Card`, `Row`, `Col`, `Stack`, `Section`, `Table`, `Field` and the
  others) it reaches every component inside: text turns into bars as long as each line, and
  buttons, badges, chips, fields, toggles, segmented controls, avatars, images and icons into
  solid shapes of their own size and corners, while the container keeps its surface and border.
  The element gets `data-skeleton`, `aria-busy="true"` and `inert`, so nothing inside takes focus
  or clicks, and the placeholders pulse (still with reduced motion). `--skeleton-color` tints
  them. A text that has nothing in it yet draws one bar 12 characters long
  (`--skeleton-text-width`), and an empty Button, Badge, Chip, Code, Kbd or Mark takes the room
  of a 6-character label (`--skeleton-label-width`), so a placeholder needs no filler text.
- `Skeleton`: a placeholder box for an area that has no component of its own, such as a chart or
  a map. It is full width and one line of text tall at its size, with size-driven corners; the
  aspect, height and shape props or a class set its shape. It is hidden from assistive tech.
- `--br-scale` (in the tokens, 1 by default) multiplies the corner radius of every component:
  `0` gives square corners everywhere, `2` twice as round. `--br-base` used to move only the
  layout components (Card, Modal, Img, Popup, Tooltip, Alert), and the controls ignored it.
  `pill` and `sharp` keep their own shape.

### Changed

- Card, Modal and Img have gentler corners: 8, 10, 12, 14 and 16px from `xs` to `xl`, where they
  were 12, 16, 20, 24 and 28px (`--br-unit` 2 to 4 on the layout scale, was 3 to 7). A `md` Card
  now has about 1.5 times the corners of the Button inside it, where it had three times. A
  rounded Stack, Section, Row, Col or Container follows the same scale; Popup, Tooltip and Alert
  keep their own.
- An Img that opens or closes a Card built from parts (`CardHeader`, `CardBody`, `CardFooter`)
  takes the Card's corners on that edge, less the border, and is square where it meets the
  parts. It used to keep its own corners on all four sides, which did not line up with the Card.
  An Img inside a padded Card, a `sharp` or `pill` Img, and one with a radius class of your own
  keep their corners.
- The open list of a `Select` has the corners and inset of a Menu dropdown (10px and 6px at the
  default size, growing with the size), and its options the corners of a MenuItem. It used to
  take the field's corners and half its padding, so the two dropdowns looked different side by
  side.

- `Label` renders each run of its own text in a `<span class="vane-label-text">`, so a
  `skeleton` draws a full bar over it in Safari, which drew a hairline over text placed straight
  in a flex container. The span has no styles of its own and the layout does not change; in tests,
  `getByText` on the label's text returns the span, not the label. White space and text passed as
  an element are not wrapped.

### Fixed

- A filled `Icon` has corners sized for its own box (about 22% of its size, as on a Button). Its
  corners were still worked out from the 32px box it had before 1.7.1, so a 20px Icon had 7px
  corners and an `xs` Icon looked almost round.

## 1.7.2

`2026-11-22`

Fixes from a bug check of 1.7.1: stacked Modals, Escape and focus in overlays, the Switch
track, `padding={false}`, Table appearances, Text in an Alert, and field placeholders.

### Accessibility

- Closing stacked `Modal`s out of order (a confirm dialog closed together with the dialog that
  opened it, two dialogs closed in one handler, or the lower one closed first) left
  `aria-hidden="true"` on the app root, so screen readers lost the whole page, and the page
  behind the remaining dialog became live too early. The page now comes back only when the last
  dialog closes, with exactly the `inert` and `aria-hidden` values it had before.
- Tab from the checked radio of a `RadioGroup` at the end of a `Modal` (or a modal `Popup`) moved
  focus out of the dialog. The focus trap now counts one tab stop per radio group, in both
  directions, and skips elements with a negative `tabIndex`.
- A `Tooltip` with `undefined`, `null`, `''` or `false` content opened an empty bubble and
  pointed `aria-describedby` at it. It now shows nothing.
- `useFieldControlProps` around a VaneUI `Input` listed each `aria-describedby` id twice, so the
  help text was read twice. Field wiring now names each id once (also in a radio group's
  `aria-labelledby`).
- `Select`, `Input` and `Textarea` placeholders sat at 3.4:1. Outline and ghost fields now draw
  them in `--color-text-secondary`, at least 4.5:1 on every appearance in both schemes.
- `NavLink` replaced an `aria-current` the caller passed (`"location"` for a table of contents
  entry, `"true"` for a section link) with `"page"` or nothing. A caller's value now wins.

### Fixed

- `padding={false}`, and `padding: false` in `themeDefaults`, left the padding on (Button, Card,
  Stack, Section, Badge, Chip, Alert, Code, Kbd, NavLink, Input, List and others). They now turn
  it off, like `noPadding`.
- Turning off a variant that a `ThemeProvider` set (`<Button danger filled={false}>` under
  `filled: true`) left the component with no variant and no appearance colors. It now falls back
  to the component's own default variant, or to `outline`.
- A checked `outline` or `ghost` `Switch` drew its track border in the page color, so only the
  thumb showed. The track border now takes the appearance's text color, in both schemes.
- Escape closed the dialog under a top layer that does not close on Escape (a `Modal` or modal
  `Popup` with `closeOnEscape={false}`, a portaled `Overlay` without `onClose`). That layer now
  keeps Escape.
- An `Overlay` with an inline `onClose` registered for Escape again on every render, so Escape
  closed it instead of a `Modal` opened over it. It now registers once per open and calls the
  latest `onClose`.
- One click on a `Modal`'s backdrop closed both the `Menu` or `Popup` open in it and the Modal.
  It now closes only the popup, like Escape.
- A `Tooltip`, `PopupTrigger` or `Menu` disabled while open opened again by itself when it was
  enabled. Disabling now closes it and drops a pending open.
- On browsers without CSS anchor positioning, a `Popup` or `Menu` stayed put when layout moved
  or resized its anchor. It now follows.
- Opening a `Modal` shifted the page by the scrollbar width when `html` had
  `scrollbar-gutter: stable`. No padding is added then.
- An appearance on `Tr`, `Thead`, `Tbody` or `Tfoot` without a variant painted nothing. It now
  paints as `outline`, the same as with `outline` written out.
- `<Td success filled>` and `<Th ... filled>` painted no fill and left a gap in the row rule.
  They now paint their fill and text color and keep the row rule beside them.
- A `data-theme="dark"` subtree drew the light-scheme shadows, and a `data-theme="light"` island
  in a dark page the dark ones. Each subtree now draws its own scheme's shadows. Pages without
  `data-theme` are unchanged.
- With `responsiveSizing={false}` on a `Card`, its header, body and footer still shrank their
  padding on tablet and mobile. They now keep the fixed inset (Modal parts too).
- `<Mark rounded>` drew a pill and clipped its first and last letters. It now has corners that
  grow with the size prop; `pill` and the default `sharp` are unchanged.
- A `style` width on a `Select` (or `<Field select style>`) narrowed only the field and left the
  chevron at the far edge. Sizing and placement styles now go to the whole control.
- A `RadioGroup` inside a `Field` kept `md` spacing at every Field size. It now follows the
  Field's size unless it has its own.
- `NavLink` moved an element placed between two pieces of text to the end. Children keep their
  order.
- `textRight` and the other text-align props on a `Field` that renders its own text control
  landed on the wrapper and did nothing. They now align the control's value.
- The README described `@vaneui/mcp` as having two tools and needing Node.js 24. It has three
  (`search_docs`, `get_doc` and `get_component_props`) and runs on Node.js 20 or later. The
  README also links to the vaneui.com home page and to the AI assistants setup guide.

### Changed

- A `Text` in an `Alert` (the documented pattern for a message followed by an action) kept the
  body size, 16px, at every Alert size and sat off the leading icon. It now takes the Alert's
  text size (14px at `md`), and `<Text sm>` sits one step below it.
- Clicks inside a `Modal` now reach `document` click listeners (analytics, outside-click
  handlers). The dialog stopped their propagation before. Like any portal, a click inside a
  Modal also reaches the `onClick` of its React ancestors now. A press that starts on the
  backdrop and ends in the dialog no longer closes it.
- Turning `loading` on and off on `Button` or `IconButton` remounted the children, which reset
  their state. They now stay mounted and keep their idle layout while a spinner shows over
  them. The loading state no longer renders the `vane-button-loading-label` span; the spinner's
  wrapper has the class `vane-button-spinner`.

### Added

- `TdTheme` and `ThTheme` have a `surface` slot, which paints a filled cell.

## 1.7.1

`2026-11-20`

Controls, Badge and Table default to the size Button has, Icon sizes are smaller, and the parts
of a Card and a Modal sit one inset apart.

### Changed

- `Input`, `Textarea`, `Select` and `Field` default to `sm`, the size `Button` already
  defaults to. A field and a button written with no size prop were 37px and 30px tall, with
  16px and 14px text; both are now 30px with 14px text. Pass `md` to keep the earlier size.
  To keep it everywhere, set
  `themeDefaults={{ input: { md: true }, textarea: { md: true }, select: { md: true }, field: { main: { md: true } } }}`.
- `Badge` defaults to `sm`: 12px text and 20px tall, where it was 14px and 25px. Pass `md`
  for the earlier size.
- `Table` defaults to `sm`: 14px text and 6px by 12px cell padding, where it was 16px and 8px
  by 16px. Pass `md` for the earlier size.
- `Icon` sizes are 12, 16, 20, 24 and 32px for `xs` to `xl`. They were 16, 24, 32, 48 and
  64px, so a default `Icon` next to body text was 32px. For a larger glyph, give the SVG a
  `size-*` class.
- The parts of a `Card` and a `Modal` meet one inset apart. Each part padded all four sides
  and the surface added its gap, which left 64px between a Modal title and its body at `md`
  (60px in a Card). The body keeps its padding, the header drops its bottom padding, the
  footer drops its top padding, and the surface has no gap between parts: 24px at `md`. A
  header with `borderB`, a footer with `borderT` and a `filled` part keep their padding on
  that side, and a padding class on a part still wins.

## 1.7.0

`2026-11-20`

The text of Button, Badge, Chip and six more components is centered by the height of its
capital letters.

### Changed

- Text in [Button](https://vaneui.com/docs/basic-components/button), IconButton, Badge, Chip,
  MenuItem, MenuLabel, Alert, Tooltip and NavLink is centered by the height of its capital
  letters. A browser centers the line box of the font, which is rarely even around the letters,
  so a label sat up to 1.4px above or below the middle of its component, in a direction that
  depended on the font. Measured over five sizes, seven fonts and three display densities, a
  capital was 0.5px from the middle on average and is now 0.2px. The size of each component
  and the place of its icons stay the same.

  The components now render each run of their own text in a `<span class="vane-text-run">`,
  and the stylesheet trims that span to the capital height with `text-box` and pads it back to
  the line height. NavLink trims the label span it already had. What to check in an app:

  - A test or a style that reaches the text by its tag (`button > span`,
    `querySelector('span')`), or that expects `getByText('Save')` to return the button itself,
    now finds the new span. Find the component by its role or its class instead.
  - Text passed as an element (a translation component, a fragment, a span of your own) is
    not wrapped and renders as before. Give your own span `className="vane-text-run"` to
    center it the same way.
  - In a row aligned by baseline (`itemsBaseline`) and inline in a paragraph, the text keeps
    its baseline, so the box around it moves by up to 1.2px and the line can change height
    by up to 1px. In a flex or grid parent with any other alignment nothing moves.
  - The line box of the trimmed text reaches up to 2px past its span. The padding of the
    component covers that. A component with `noPadding` that touches the end edge of a
    scroll container can add that much scrolling to it.

  The trim needs `text-box` (Chrome and Edge 133, Safari 18.2, Firefox 154). Other browsers
  render the text where it was. Label, Input, Select, Textarea, table cells, Code, Kbd and
  Mark are not changed.
- The label of a [NavLink](https://vaneui.com/docs/basic-components/navlink) clips its
  overflow (`overflowClip`) where it hid it. The ellipsis of a long label is the same; the
  label can no longer be scrolled sideways by a text search or a selection drag.

## 1.6.3

`2026-11-20`

Alert is sized as a message strip, and a trailing action sits at its end edge.

### Changed

- [Alert](https://vaneui.com/docs/basic-components/alert) is sized as a message strip, and
  every part of it follows the size prop. It used the Card scale before: a 20px radius at
  `md`, a leading icon as wide as its library rendered it (24px for most) at every size, and a
  gap between icon and text of up to 32px. Its text did not follow the size at all and stayed
  at the size of the page, 16px on most. The values are now:

  | Size | Text | Radius | Icon | Gap | Padding |
  |------|------|--------|------|-----|---------|
  | `xs` | 12px | 6px | 17px | 6px | 8px |
  | `sm` | 13px | 7px | 19px | 8px | 12px |
  | `md` | 14px | 8px | 20px | 12px | 16px |
  | `lg` | 16px | 10px | 23px | 16px | 20px |
  | `xl` | 18px | 12px | 26px | 20px | 24px |

  At `md` the radius was 20px and the gap 16px; at `lg` and `xl` the padding was 24px and
  32px. On a phone the `md` padding stops at 12px, where it went down to 8px. An icon with a
  `size-*` class keeps that size, and a font-size, padding, gap or radius class on the Alert
  still wins. A `Text` inside an Alert sets its own size, as before.
- A `Text`, `Col`, `Stack` or `Row` placed directly in an Alert takes the free width of the
  row, so a `Button` after the message sits at the end edge. Before, the button followed the
  text and stopped in the middle of a wide Alert. A message block with `flexNone` keeps
  its content width.

## 1.6.2

`2026-11-19`

A filled Table keeps the lines between its rows, and text on the danger, accent and tertiary
fills is readable at small sizes.

### Fixed

- A filled [Table](https://vaneui.com/docs/layout-components/table) keeps its row lines. Since
  1.6.0 a filled Table, section or row passed its fill to the cells, and the lines between the
  rows had no color. The cells now draw them in `--color-divider-filled`, the color a `Divider`
  takes on a fill. The nearest row or section with its own variant decides, a cell with its own
  appearance keeps its colors, and the Table's own border is as before. A `ghost` Table still
  has no row lines.

### Accessibility

- Text on the danger, accent and tertiary fills reaches 4.5:1. In the light scheme a filled
  `Badge`, `Chip` or `Button` sat at 3.9:1 in danger and tertiary and at 3.8:1 in accent.
  `--color-text-filled-danger` and `--color-text-filled-accent` are now white (they were
  `red-100` and `rose-100`) and `--color-text-filled-tertiary` is `gray-50` (it was `gray-200`
  in the light scheme and `gray-50` in the dark one). The fills are unchanged, and a project
  that sets these tokens keeps its own values. In the dark scheme the danger and accent text
  changes from the same tints to white, which was above 4.5:1 before and after.

### Changed

- The package is built with updated development tools, which clears every advisory `npm audit`
  reported for them. None of them ships in the package: its one runtime dependency,
  `tailwind-merge`, is unchanged. The built files export the same names and render the same
  markup as 1.6.1; some list their internal imports in a different order.

## 1.6.1

`2026-11-19`

The stylesheet import paths resolve for TypeScript, so a project on TypeScript 6 or later can
import `@vaneui/ui/css` from a `.ts` or `.tsx` file.

### Fixed

- `import '@vaneui/ui/css'` in a TypeScript file passes the type check on TypeScript 6 and
  later. The stylesheet import paths (`@vaneui/ui/css`, `/vars` and `/tokens`) had no type
  declarations. TypeScript 6 reports a side-effect import it cannot resolve as an error
  (`TS2882`), where earlier versions skipped it unless `noUncheckedSideEffectImports` was set.
  Each path now has a `types` target, an empty module, under the `bundler`, `node16` and
  `nodenext` resolution modes. `@import "@vaneui/ui/css"` in a CSS file was not affected and
  resolves to the same file as before.

## 1.6.0

`2026-11-16`

Fixes from a review of 1.5.0, each covered by tests. Overlays keep their content while they
close, an `Input` keeps focus while it is validated, read-only toggles stop reporting changes,
a `Card` finds its parts wherever they render, and a `className` overrides a responsive value
at every width. Some fixes change the rendered markup or where a `ref` points; those are under
Changed.

### Added

- `inertBackground` on [Modal](https://vaneui.com/docs/overlay-components/modal), `true` by
  default. An open Modal makes the rest of the page inert, and `false` turns that off for one
  modal.
- `data-vane-overlay`: a child of `<body>` with this attribute stays usable while a Modal is
  open. Use it on a toast region or on a container another library portals to `<body>`.
- `useOverlayRegistration()`, with the `OverlayRegistrationRef` type: the ref it returns
  registers an element as an overlay while it is mounted, so an open Modal leaves the
  element's container under `<body>` usable.
- `useFieldControlProps`, with the `FieldControlProps` type: a control VaneUI does not ship (a
  plain `<input>`, a masked input, a date picker) takes the
  [Field](https://vaneui.com/docs/form-components/field)'s `id`, `aria-describedby`,
  `aria-invalid`, `required`, `disabled` and `readOnly` by spreading
  `useFieldControlProps(props)`. The control's own props win, and outside a Field the props
  come back unchanged.
- Import paths for nine more components: `@vaneui/ui/alert`, `/field`, `/progress`, `/radio`,
  `/select`, `/spinner`, `/switch`, `/textarea` and `/tooltip`. They were built like the other
  component entries but missing from the package's `exports`, so the import failed.

### Changed

- [Input](https://vaneui.com/docs/form-components/input): the root element is a wrapper
  `<span>` with the `<input>` inside, in every state. Before, the wrapper was rendered only
  while the input was invalid. A valid Input's wrapper is `display: contents`, so the layout
  is the same, and `ref`, `className` and `style` still go to the `<input>`. A selector that
  expects the `<input>` as a direct child of its parent (`.form > input`) no longer matches.
- [Checkbox](https://vaneui.com/docs/form-components/checkbox): `ref` points at the `<input>`
  and is typed `HTMLInputElement`, like `Radio` and `Switch`. It pointed at the wrapper span.
  Code that used the ref to reach the wrapper reads `ref.current.parentElement`.
- [Table](https://vaneui.com/docs/layout-components/table): `Td` and `Th` default to
  `inheritAppearance` where they had `secondary`, so they follow the Table (see Fixed). The
  default table looks the same, but its cells no longer carry `data-appearance` and
  `data-variant` attributes.
- [Menu](https://vaneui.com/docs/overlay-components/menu): the item focused last is the
  menu's one tab stop (`tabindex="0"`, every other item `-1`), and hovering an item focuses
  it.
- `Menu` and `PopupTrigger` give a trigger without an `id` a generated one, which the popup's
  `aria-labelledby` points at (see Accessibility).
- `Modal`: when the element that opened a dialog is gone at close, focus goes to the opener of
  the overlay that element was in, or stays where it is. It went to the first focusable
  element of the page.

### Fixed

- Closing a `Modal`, [Popup](https://vaneui.com/docs/overlay-components/popup), `Menu`,
  [Tooltip](https://vaneui.com/docs/overlay-components/tooltip) or
  [Overlay](https://vaneui.com/docs/overlay-components/overlay) keeps its content mounted
  until the exit animation ends. Before, the content was unmounted and mounted again for the
  exit: child effects ran twice on every close, and text typed into an uncontrolled field was
  gone during the fade.
- `Input` keeps focus and the typed text when `invalid` changes, on its own and through
  `<Field error>`. Before, the `<input>` was replaced each time, so validating while the user
  typed dropped the focus.
- A `Tooltip` and a `Menu` or `PopupTrigger` on one trigger keep separate anchors. Before, in
  browsers with CSS anchor positioning, the menu jumped to the corner of the page once the
  tooltip had closed.
- `Modal`: selecting text inside the dialog and releasing the mouse over the backdrop no
  longer closes it. A press that starts on the backdrop closes it as before.
- `Modal`: with two modals open, Escape closes the top one. Before, a lower modal that
  rendered again could close first.
- `Modal`: a dialog opened from a `MenuItem` returns focus to the menu's trigger when it
  closes. Before, focus jumped to the first focusable element of the page and the page
  scrolled to it.
- `Menu`: a menu with more items than fit on screen scrolls, and `clampHeight` limits the
  scrolling area. Before, the last items ran off the screen, or out of the clamped box.
- An `Overlay` opened while a `Modal` is open stays usable. Before, the Modal made it inert.
- `Checkbox`, [Switch](https://vaneui.com/docs/form-components/switch) and
  [Radio](https://vaneui.com/docs/form-components/radio): a `readOnly` control no longer calls
  `onChange`, also when the state comes from a `RadioGroup` or a Field. Before, a controlled
  form received the flipped value while the control on screen stayed as it was. `onClick` is
  still called.
- [Chip](https://vaneui.com/docs/basic-components/chip),
  [Badge](https://vaneui.com/docs/basic-components/badge) and
  [Code](https://vaneui.com/docs/basic-components/code): `disabled` with `href` renders a link
  that cannot be followed (no `href`, `aria-disabled="true"`, still focusable), like a
  disabled `Button` link. Before, the link stayed in the tab order and Enter followed it.
- `Checkbox` and `Radio`: the checked state is visible in the `outline` and `ghost` variants.
  Before, the box took the page color and the mark floated on the page, and a `ghost` Checkbox
  showed no mark at all.
- `Field`: an empty string for `error` or `description` means no message. Before,
  `error=""` marked the control invalid and rendered an empty paragraph.
- [Card](https://vaneui.com/docs/layout-components/card): `CardHeader`, `CardBody` and
  `CardFooter` are found inside a fragment, behind `memo()`, when your own component renders
  them and when they come from a Server Component. Before, such a Card kept its own padding
  and the inset doubled. A Card with an explicit `padding`, `paddingX` or `paddingY` keeps its
  inset next to its parts.
- `Table`: an appearance or variant on the Table reaches its rows and cells. `<Table success>`
  colors the row rules and the header text, and `<Table filled>` fills the table. Before, both
  changed nothing. A `Tr`, `Thead`, `Tbody` or `Tfoot` with its own appearance and variant
  passes them to its cells, and a cell with its own appearance (`<Td danger>`) keeps it.
- A `className` that overrides a responsive value holds at every width:
  `<Section className="py-8">` keeps `py-8` on a phone. Before, the class replaced the desktop
  value only, and the component's own tablet and mobile padding, gap or font size came back
  below 1024px. This covers `py-*`, `px-*`, `p-*`, `gap-*` and font-size classes; a one-sided
  class such as `pt-*` still gives way below 1024px.
- `ThemeProvider` with `themeDefaults`, `extraClasses` or `theme` copies only the theme nodes
  it changes. `Tooltip` and `Menu` each mount one, and rendering 300 of either on the server
  took about 270ms; it now takes about 20ms.

### Accessibility

- The popup of a `PopupTrigger` or a `Menu` is named by its trigger through
  `aria-labelledby`. Before, the dialog had no accessible name. An `aria-label` or
  `aria-labelledby` you set on the popup is kept. A `Popup` used on its own warns in
  development when it opens with a dialog role and no name.
- `Radio`: a read-only radio no longer carries `aria-readonly`, which the radio role does not
  allow. The `RadioGroup` keeps it.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.5.0...v1.6.0)

## 1.5.0

`2026-10-31`

Fixes for the bugs found in the 1.4.6 component review, each covered by tests. A few fixes need
a new prop to work, so this is a minor release.

### Added

- `disabled`, `readOnly`, `required` and `invalid` on `RadioGroup`: they reach every `Radio` in
  the group, and a `Radio`'s own prop wins. The group also gets the matching `aria-*`
  attributes.
- `invalid` on `Field`: marks the control invalid without showing error text, for checks
  reported elsewhere on the page.
- `placeholder` on `Select`: a muted first option that can't be picked again. An uncontrolled
  select starts on it, and with `required` the empty value fails validation. `<Field select
  placeholder>` passes it through.
- `ModalCloseButton` takes every `Button` prop and children. With children it renders a
  labelled close button, such as a footer "Cancel", with Button's own look.

### Fixed

- A `Tooltip` can be the trigger of a `Menu` or `PopupTrigger`. Its ref, event handlers and
  `aria-*` attributes now go to the child element, so the menu opens on click and anchors to
  the button. Before, the menu never opened.
- `RadioGroup` and `<Field radiogroup>` honour `readOnly` and `error` from the Field (and now
  their own state props). Before, only `disabled` and `required` reached the radios.
- `MenuItem` keeps a passed `role`, so `menuitemcheckbox` and `menuitemradio` items work.
- `ModalCloseButton`: a passed size or appearance wins over its defaults (before, `lg` lost to
  the built-in `sm` with a conflict warning); a passed `onClick` runs before the close instead
  of replacing it, and `event.preventDefault()` in it keeps the modal open.
- `sticky` sticks at the top edge without a `top-*` class. Set `--sticky-top` to stick below a
  fixed header; a `top-*` class still wins, and an element with a `bottom-*` class gets no top.
- `indicatorBottom` draws the accent bar for `aria-selected="true"` (a tab), like
  `indicatorStart` does.
- `Field`: `error={true}` marks the control invalid without rendering an empty error paragraph,
  and a disabled Field (or a disabled child control) dims its label.
- A clickable `Chip` (`onClick` without `href`) is reachable by keyboard: it gets
  `role="button"`, a tab stop, and Enter and Space activation. A disabled one stays focusable
  but does nothing.
- A `Popup` or `Tooltip` with `arrow` measures `offset` from the arrow tip, so the tip no longer
  touches or overlaps the trigger (by up to 3px at `xl`).
- A `style` passed to `Popup` merges with its positioning instead of replacing it, which left
  the popup unpositioned.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.4.6...v1.5.0)

## 1.4.6

`2026-10-29`

Breakpoint props for showing an element only on smaller screens and for full width below a
breakpoint, so sites no longer need `lg:hidden` or `max-mobile:w-full`.

### Added

- `mobileShow`, `tabletShow` and `desktopShow`: show an element only below 768, 1024 or 1280px,
  the reverse of `mobileHide` and friends. They combine with a hide prop, so
  `<Row mobileHide tabletShow>` shows only between 768 and 1024px.
- `mobileWFull`, `tabletWFull` and `desktopWFull`: full width below 768, 1024 or 1280px,
  keeping the component's base width above it. `<Button mobileWFull>` fills a stacked row on a
  phone and stays fit width on desktop. A `Select` applies both families to its wrapper.

[Full diff](https://github.com/vaneui/vaneui/compare/v1.4.5...v1.4.6)

## 1.4.5

`2026-10-29`

Additions that let vaneui.com drop most of its custom CSS: a progress bar, divided grids,
strong borders, NavLink indicators, shadow sizes and real light subtrees.

### Added

- `Progress`: a determinate bar, `<Progress value={40} aria-label="Upload" />`. A
  `role="progressbar"` track with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`;
  `value` is clamped to 0 to `max` (100 by default). The fill is its own themed element
  (`progress.fill`), a filled bar in the appearance color over a neutral track, and it follows
  the track's shape and `transition`/`noTransition`. Heights run 2, 4, 8, 12 and 16px from `xs`
  to `xl`; `pill` by default. The fill eases to a new value, with no motion under reduced motion.
- `divided` on `Grid2` to `Grid6`: 1px lines in the divider color between and around
  the cells, in place of the gap.
- `strongBorder` on layout components (`Row`, `Col`, `Stack`, `Grid*`, `Container`, `Card`,
  `Section`): the border takes the appearance's strong color, the one its focus ring uses. A
  filled `Card`, whose border is otherwise transparent, shows it too.
- `indicatorStart` and `indicatorBottom` on `NavLink`: a 1px rail on the start edge that
  turns into a 2px accent mark when `active` or `aria-selected`, or an accent bar under the
  active tab. They are inset shadows, so the text does not move. The rail flips in
  right-to-left text.
- `shadowXs` to `shadowXl`: fix the drop shadow size on the component's own ramp
  (compact for UI components, deeper for layout ones), whatever the component's size.
  `shadow` still follows the size.
- `pointerEventsNone`/`pointerEventsAuto` and the `whitespace*` props on layout
  components: `Row`, `Col`, `Stack`, `Grid*`, `Container`, `Card` and `Section`.
- `noShrink` on `Img`, so an image keeps its size in a tight `Row`.
- Selected options: a `NavLink` or `MenuItem` with `aria-selected="true"` (an option in a
  listbox, like a search result) takes the hover fill.

### Changed

- Dark mode colors are `light-dark()` pairs. The dark block's colors are now one list of
  `light-dark(light, dark)` pairs on every `data-theme` element, and `data-theme` sets
  `color-scheme`, which picks the side. Pages without `data-theme` keep the `@theme` values and
  are unaffected. Uncompiled, `light-dark()` needs Chrome 123, Firefox 120 or Safari 17.5;
  bundlers that compile it for older browsers (Next.js does by default) keep those working. To
  change a color in both schemes, re-declare it as a pair under
  `:root[data-theme], [data-theme]:not(:root)`, after the VaneUI stylesheet.

### Fixed

- `data-theme="light"` makes a subtree light inside a dark page or wrapper. It only reset
  `color-scheme`, so the dark colors still came through. It now resolves every pair to its light
  side. On `<html>` it changes nothing, so token customizations made with `@theme` keep working.

## 1.4.4

`2026-10-10`

A consistency pass on `Tooltip`: it is now sized and coloured as a label, not a panel.

### Added

- `Tooltip` takes `Popup` props directly, like `Menu`: `<Tooltip lg placeBottom arrow>`.
  Size, appearance, variant, shape, placement, `arrow`, `offset` and `className` style the
  tooltip. `popupProps` still works and is combined with them.

### Changed

- `Tooltip` is filled in ink: near-black, and near-white in dark mode, like a filled
  primary `Button`. It was gray. `<Tooltip secondary>` or
  `themeDefaults={{ tooltip: { secondary: true } }}` brings the gray back.
- `Tooltip` text follows its size: 10, 12, 14, 16 and 18px from `xs` to `xl`, one step
  under a `Button` of the same size. It inherited the page's text (16px at every size).
- `Tooltip` padding and radius follow the `Button` ramp, so a tooltip is about as tall as a
  `Button` of the same size (29px instead of 44px at the default `sm`). Padding no longer
  shrinks on tablets and phones.
- Long tooltips wrap inside a cap that grows with size (16–32rem, 20rem at `sm`) instead
  of running on one line across the page.

### Fixed

- Popups placed above or below stay on screen next to an anchor at the viewport edge in
  browsers with CSS anchor positioning. They were centred on the anchor and cut off; they
  now line up with the anchor's edge, and the arrow follows.

## 1.4.3

`2026-09-30`

Fixes from a review of the components composed into real screens (dashboards, forms,
landing pages, articles, overlays, a storefront).

### Added

- `Table` and `Alert` take a font family (`fontSans`, `fontMono`, …) and default to
  `fontSans`. Their cells and raw text used to fall back to the page's own font (a serif
  on an unstyled page), because the scoped reset never sets one.

### Changed

- `Input` and `Select` are as tall as `Button` at every size. They used a looser line
  height, so a field was 4.8px taller than the button beside it at `md`. Their corner
  radius now matches too. Every `Input` and `Select` gets slightly shorter.
- List markers sit inside the list box. The marker gutter was 12px at `md`, so bullets
  and `10.` hung outside it; it is now 16–32px by size. An `icon` item's icon moves into the
  same gutter, so icon items and plain items share one text column.
- `transition` no longer animates the focus ring, only colors, shadows and transforms.

### Fixed

- Words no longer break mid-word in rows and tables. The long-token wrapping added for
  URLs let a short label beside a full-width control shrink to one letter per line, and
  split prices and names in table cells. Titles, lists and blockquotes now wrap long tokens
  too, instead of overflowing on a phone.
- An unselected `RadioGroup` no longer shows every radio as selected.
- The invalid state is visible. `Input`, `Select` and `Textarea` drew their danger ring at
  30% strength, fainter than a normal field; it is now full strength. Text fields also use
  the form-control border token, like `Checkbox`, `Radio` and `Switch`.
- The active `NavLink` stands out: it is semibold on a stronger tint, and hover no longer
  looks the same as the current page. A trailing `Badge` sits at the row's end.
- `Link` and a `Card` with `href` draw a visible focus ring in dark mode and on colored
  surfaces. It used the browser's default color.
- Text stays readable on filled surfaces. Secondary and tertiary text, ghost buttons and
  links on a filled `Card` or `Section` take the surface's text color.
- `filled` without an appearance no longer turns text white on an unpainted surface.
- Whole-page dark mode paints the page, so cards no longer sit darker than the page.
  Any background you set on `html` or `body` still wins.
- `Mark` shows a visible highlight.
- An svg in running text stays inline instead of breaking the line.
- `Tooltip`, `Popup` and menus render in the library font. A string `title` on `Modal`
  renders as a `Title`.
- `Modal` returns focus to the button that opened it on every close path.
- Escape inside a `Menu` closes only that menu, not the `Modal` around it or the whole
  menu tree.
- Menu items sit flush again; a 16px gap had appeared between them.
- Popups placed above or below keep their own width instead of shrinking to a small
  trigger, so tooltips no longer wrap one word per line.
- End-aligned and left popups stay at their trigger under `dir="rtl"`.
- `Modal` keeps a margin on a phone instead of running edge to edge.
- `ModalCloseButton` keeps its own look under app-wide `button.main` defaults (a filled
  default made the × invisible) and is square like `IconButton`.
- A loading `Button` with an icon keeps its size.
- A read-only `Checkbox` no longer toggles, a read-only `Select` can no longer be changed,
  and read-only toggles dim like read-only text fields.
- `Field` passes `disabled`, `required` and `readOnly` to a child control, including every
  `Radio` of a child `RadioGroup`. Control-only attributes no longer land on its wrapper div.
- `<Link sm>` renders at `sm`; an explicit size used to be ignored.
- A size set on the switch input theme reaches the track.
- A disabled `Link` looks disabled, and disabled fields show the not-allowed cursor.
  Disabled opacity now reads the `--disabled-opacity` token.
- `Select` stays on one line in a row, `noShrink` reaches it, and a placeholder option
  is muted like an `Input` placeholder.
- `Textarea` honours `rows` below three lines.
- A clickable `Chip` shows the focus ring, and linked `Card`, `Chip` and `Badge` get a hover
  tint.
- Hovering another menu item closes an open sibling submenu, and a submenu's trigger keeps
  its tint while the submenu is open.
- `Alert` text uses body line-height and a leading icon centres on the first line.
- A `Card` with `href` warns in development when it contains a button, link or field.

## 1.4.2

`2026-08-22`

### Fixed

- `Field`'s label now scales with the field. The label, description and error
  were pinned to `sm` at every size, so `<Field xl>` grew the control and left its
  label behind. The label now takes the field's size and the help and error text
  sit one step below it.
- `Field`'s inline checkbox and switch line up with their label. The control
  resolved its line box against the page root instead of the label's font
  metrics, so it sat high and the switch track overflowed its own box.
- `Field`'s help and error text stay readable on a filled surface. Their pinned
  secondary and danger colors lost contrast on a fill; under any filled ancestor,
  the field itself or a `Card` or `Row` above it, they now take that surface's
  text color.

## 1.4.1

`2026-08-22`

### Added

- `Field` can render its own control, instead of only wrapping one passed as
  a child. Pass `type` (a control kind such as `select`, or a native input type
  such as `password`, `email`, `date`) or one of the six booleans `textInput`,
  `textarea`, `select`, `checkbox`, `switch`, `radiogroup`. Surface props
  (`appearance`, `variant`, `shape`, `border`, `ring`, `shadow`, `transparent`)
  route to the rendered control, native attributes go to the control, and
  `ref` now points at the control instead of the wrapper. Layout props and
  `className` stay on the wrapper. Children still reach the control, so
  `<option>` and `<Radio>` children keep working. `checkbox` and
  `switch` lay out inline, control first and label beside it, unless an
  explicit `row`/`column` falls back to the plain stacked layout. Naming no
  control leaves today's children mode completely unchanged.

### Changed

- `Field`'s `type` prop is now a closed union of the control kinds and
  native input types above. It previously accepted any string, inherited from
  the anchor attributes `Field` spreads for tag switching, and Field has no
  `href`-based tag switching of its own, so a value like `<Field type="button">`
  was already reaching the wrapper `<div>` and emitting an invalid `type`
  attribute at runtime. The type change surfaces that pre-existing bug at
  compile time rather than removing a working option.

### Fixed

- The conflicting-props dev warning no longer fires on composable side
  toggles. `border` and `margin` side toggles compose by design, so
  `<Card borderT borderL>` and `<Card marginT marginB>` are correct usage, yet
  every component warned that they conflicted. The warning now skips composable
  categories, matching the rule the resolver itself already used. It still warns
  in the one case that is genuinely ambiguous there: when a `no*` reset is
  combined with a side toggle (`<Card borderT noBorder>`), where the reset
  discards the toggle and wins.
- `Field` no longer emits a dangling `htmlFor` for a radio group. A
  `radiogroup` is not a labelable element and never claims the generated id, so
  the label pointed at nothing. `Field` now omits `htmlFor` for a radio group in
  both modes; the accessible name continues to come from `aria-labelledby`.

## 1.4.0

`2026-08-20`

### Changed

- Portalled floating content waits for hydration before it mounts. A portal
  has no server markup, so `Popup`, `Modal` and `Overlay` returned `null` during
  SSR — but the *first client render* portalled immediately, giving React DOM it
  never emitted server-side and forcing it to throw the subtree away and rebuild
  it. They now stay closed through the hydrating render and mount on the next one.

  The gate is on the open state rather than the portal call, so the transition
  and every element-dependent effect sit downstream of it and run once the
  element actually attaches. Two consequences worth knowing:

  - Portalled content that is open on its first render now transitions in
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

- A `sharp` Select opened a rounded dropdown. The shape props emit Tailwind
  classes onto the field and never touch `--br`, so the list — a pseudo-element
  that cannot take a class — always painted the size-driven radius. `Select` now
  publishes its resolved shape as `data-shape`, which the picker rules read.
  `pill` deliberately still keeps `--br`: its own radius is effectively infinite
  and a tall list box given that radius swallows its first and last rows.

- `Modal`, `Popup` and `Tooltip` listed the `shape` category twice.
  `VISUAL_LAYOUT` already folds `SHAPE` in, and all three spread `...SHAPE` over
  it again. The duplicate is invisible to the type system — the `as const` union
  is identical either way — but every consumer that iterates the array saw the
  category twice, which rendered the shape props twice in generated prop tables
  and produced duplicate React keys. `categoryUniqueness.test.ts` now asserts no
  component names a category more than once.

## 1.3.0

`2026-08-20`

### Added

- `Label` supports `disabled`. It was the only form control without the
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

- The `Select` dropdown takes its colours from the field. `option`,
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

- The `Select` dropdown opened upward over the page. The UA styles
  `::picker(select)` with `position-try-order: most-block-size`, which picks
  whichever side has MORE room rather than the first side that fits — so any
  field past the middle of the window opened its list above itself even with
  several hundred pixels free below. Pinning the order back to `normal` opens
  the list downward and keeps the flip for when it genuinely does not fit. The
  gap between field and list is now `margin-block` rather than
  `margin-block-start`, because the flipped-up position anchors the picker's
  bottom edge and a top margin left it touching the field.

- `Field`'s help and error text could vanish on a filled `Field`. Both are
  rendered by the component with pinned appearances (`secondary` and `danger`),
  which an author cannot reach from outside, and `--color-text-secondary` IS
  `--color-bg-filled-secondary` — so `<Field filled secondary>` painted its
  description at exactly 1.00:1 against its own surface. On a filled `Field`
  both now take the surface's own text colour. A plain `Field` keeps its muted
  description.

## 1.2.1

`2026-08-20`

### Fixed

- Every appearance on `Img` painted the same neutral border. An appearance is
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

- `Button` and `IconButton` now render the `Spinner` component for their
  loading state, instead of a private ring the library maintained separately.
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

- `Spinner`'s appearance props did nothing. `<Spinner danger>` emitted
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

- The spinner ring was a 1px hairline at `xs` and `sm`. Its stroke was
  `0.125em`, and browsers floor `border-width` to whole pixels, so 1.5px and
  1.75px both painted as 1px. The stroke now floors at 2px.

- `Button`'s loading ring and `Spinner` had drifted to different strokes
  (a pinned 2px against the scaling `0.125em`), so the same ring rendered at two
  weights depending on where it came from. Both now share one rule.

## 1.1.2

`2026-08-18`

### Added

- A `Select`'s dropdown list is now styled where the engine allows it. A native
  `<select>` hands its option list to the operating system, which draws a flat,
  square, unpadded menu: the options get no layout box at all, so padding, radius
  and shadow were inert and only their colors landed. Behind
  `@supports (appearance: base-select)` the list becomes real DOM and is themed to
  match a `Menu` (surface, border, radius, shadow, padded rows, hover, and a
  checkmark on the selected option). Engines without it keep the OS picker
  unchanged, and the control is the same `<select>` either way.

### Fixed

- A `sharp` or `rounded` `Switch` reshaped only its track. The knob was
  rendered with no props and its theme pins `pill`, so a square track kept a
  circular knob. The shape now reaches the knob, and its radius insets from the
  track's by the track padding, so the two corners stay concentric rather than
  sharing one radius across boxes of different sizes.

`2026-08-18`

### Fixed

- The `Input` error icon rendered as a solid disc with a slot cut through it,
  not an exclamation mark. Its stem and dot are meant to be holes punched in the
  disc, which under the nonzero fill rule requires them to wind opposite to it.
  The stem did; the dot did not, so it merged into the disc and vanished. The
  glyph is now sampled pixel-by-pixel in the e2e suite, because both the class
  list and the icon's geometry are identical either way.

- A `Select`'s dropdown list ignored the theme. `<option>` and `<optgroup>`
  default to a transparent background, and the browser paints the popup from the
  option's own colors, so the list fell back to user-agent colors instead of the
  field's. Both now carry the surface and text tokens, group labels lose the
  user-agent italic, and a disabled option is muted.

### Changed

- A `Select`'s chevron turns danger when the field is invalid. The chevron is
  a sibling of the field rather than a descendant, so the error state was not
  reaching it and the control's trailing edge stayed neutral while `Input` and
  `Textarea` both changed.

## 1.1.0

`2026-08-18`

### Added

- `Field` wires a form control to its label, help text and error message.
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

- `Tooltip` describes its trigger on hover and on keyboard focus. Built on
  `PopupTrigger`'s tooltip semantics: the trigger gets `aria-describedby` while
  open and never `aria-haspopup` or `aria-expanded`, which do not apply.

- `Spinner` promotes the ring that already existed inside `Button` to a
  component of its own. `role="status"`, sized by the size prop and coloured by
  the appearance prop.

- `Alert` is a live-region surface: `role="alert"` by default, or
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

- [Table](https://vaneui.com/docs/layout-components/table) family. `Table`, `Thead`,
  `Tbody`, `Tfoot`, `Tr`, `Th`, `Td`, `Caption`, with the size prop cascading from any
  container element down to the cells.
- Dark mode through the `data-theme="dark"` token contract. No component code
  changes are required, and consumers can declare their own themes by re-declaring the
  same tokens under any selector.
- RTL support. Logical CSS utilities behind the existing props, plus `textStart` and
  `textEnd` alongside the physical `textLeft` and `textRight`.
- Nested submenus on [Menu](https://vaneui.com/docs/overlay-components/menu), with
  the full keyboard model including typeahead, `Home`, `End`, and arrow-key traversal.
- Icon container mode. [Icon](https://vaneui.com/docs/basic-components/icon) gained
  opt-in padding, shape, border, and ring, and its glyph size decoupled from the
  font-size variable.
- List markers and spacing. `listCircle`, `listSquare`, `listLowerAlpha`,
  `listLowerRoman`, inside/outside positioning, per-item gap control, automatic marker
  progression on nested lists, and a
  [ListItem](https://vaneui.com/docs/typography-components/list) `icon` prop for custom
  markers.
- Size-driven margin props on layout components and block typography, on the same
  scale as gap and padding.
- Per-side border widths and logical `borderStart` / `borderEnd` props.
- `alignSelf` and `justifySelf` props, with
  [Popup](https://vaneui.com/docs/overlay-components/popup) edge alignment driven
  through them.
- Granular inherit props (`inheritSize`, `inheritColor`, `inheritBg`,
  `inheritBorder`) alongside `inheritAppearance`.
- `wordBreak` category, and `whitespace` extended to typography components.
- `href` support on `Row`, `Col`, and `Stack`, with a conditional focus ring.

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
