# VaneUI Component Usage Guide

This guide is for consuming projects that use `@vaneui/ui`. It covers correct component usage, composition patterns, and common mistakes.

## Setup

### Required CSS — pick exactly ONE of the two options

`@vaneui/ui/css` is fully self-contained (it embeds everything `@vaneui/ui/vars` contains). Importing both ships ~40 KB of duplicate rules at two different cascade strengths — never do it.

**Option A — no Tailwind setup (prebuilt styles):**

```tsx
import '@vaneui/ui/css';   // self-contained: tokens + rules + utilities
import { ThemeProvider, Button, Card, Row, Stack, Text, Title } from '@vaneui/ui';
```

The prebuilt stylesheet is compiled for VaneUI's own components; it does not contain Tailwind's full utility set. A Tailwind class passed through `className` or `extraClasses` has no effect unless it happens to be in the bundle, and most (`max-w-md`, `p-6`, `size-8`, `ms-auto`, `z-40`) are not. For arbitrary utilities, use Option B or the `style` prop.

**Option B — your own Tailwind v4 build.** Add all four lines to your main CSS file:

```css
/* your app.css */
@import "tailwindcss";
@import "@vaneui/ui/tokens";  /* design tokens and the mobile / tablet / desktop breakpoints */
@import "@vaneui/ui/vars";    /* CSS variables + component rules (no utilities) */
@source "../node_modules/@vaneui/ui";
```

`@source` lets your Tailwind build emit the utilities VaneUI's components use by scanning the library. Its path is relative to the CSS file that contains it.

The tokens import is required. It registers VaneUI's breakpoints with your Tailwind build, and without it Tailwind emits no CSS for any `max-mobile:`, `max-tablet:` or `max-desktop:` class: `mobileStack`, the `*Hide`, `*Show` and `*WFull` props and responsive padding and font sizes then do nothing, with no build error.

### ThemeProvider

Wrap your app in `ThemeProvider` to customize the theme. Without it, each component falls back to its built-in default theme.

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

Customize defaults globally. Components with sub-themes (Button, Card, Modal, Menu, NavLink, Checkbox, Field, Switch, Radio, Table, Progress, Breadcrumb, SegmentedControl) need the nested form — Button's main element lives at `button.main`:

```tsx
<ThemeProvider themeDefaults={{ button: { main: { filled: true, lg: true } } }}>
  {/* All buttons are now filled + large by default */}
  <Button>Save</Button>
</ThemeProvider>
```

Components without sub-themes (Badge, Chip, Text, Row, ...) use the flat form: `themeDefaults={{ badge: { success: true } }}`. A path that matches no theme node does nothing (a dev-mode console warning calls it out). `IconButton` has its own node (`iconButton`), so `button.main` defaults do not reach it; set both when they should match.

Add extra CSS classes per prop:

```tsx
<ThemeProvider extraClasses={{ button: { main: { primary: "custom-primary-class" } } }}>
  <Button>Styled</Button>
</ThemeProvider>
```

Nested providers inherit from parent (`mergeStrategy="merge"`, default) or reset (`mergeStrategy="replace"`):

```tsx
<ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
  <Button>Filled (inherited)</Button>
  <ThemeProvider themeDefaults={{ button: { main: { danger: true } } }} mergeStrategy="replace">
    <Button>Danger outline (reset, not filled)</Button>
  </ThemeProvider>
</ThemeProvider>
```

## Dark Mode

`data-theme="dark"` is the official dark-mode extension point. The shipped CSS declares each scheme color as a `light-dark(light, dark)` pair on every `data-theme` element, and `data-theme` sets `color-scheme`, which picks the side; no component code changes. Pages without `data-theme` keep the `@theme` values.

**Primary mode — `<html data-theme="dark">`:**

```html
<html data-theme="dark">
```

This themes the whole page, including portaled content and native controls (`color-scheme: dark` gives dark scrollbars and form fields). To avoid a light-mode flash with SSR, the attribute must already be present in the server-rendered markup, or be set by an inline script in `<head>` that runs before first paint:

```html
<script>
  if (localStorage.theme === 'dark') document.documentElement.dataset.theme = 'dark';
</script>
```

**Subtree mode — for in-flow content:**

```tsx
<div data-theme="dark">
  <Card>...</Card>  {/* primary Card paints the dark page surface */}
</div>
```

Tokens are CSS custom properties, so the dark values inherit down the wrapper's subtree. Give the subtree a surface: a `Card`, or a `Section` with an explicit appearance (`<Section primary>`). A bare `Section` and the wrapper div paint nothing.

**Portal caveat:** `Modal`, `Popup`, and `Overlay` render into a portal at the end of `<body>`, so they resolve the theme of `<html>`/`<body>`, not an inner wrapper's. `<html data-theme="dark">` is the primary supported mode; subtree theming covers in-flow content.

**Forcing light:** `data-theme="light"` makes a subtree light again inside a dark page or wrapper: it sets `color-scheme: light`, so the pairs resolve to their light side. On `<html>` it changes nothing, so light-page customizations stay. A color you customize for dark should be a pair too, so light subtrees inside it get your light value (see below).

**Custom themes:** consumers can re-declare any `--color-*` token under their own selectors:

```css
[data-theme="ocean"] {
  --color-bg-info: oklch(95% 0.02 220);
  --color-text-info: oklch(45% 0.12 220);
}
```

To change a color in both schemes, re-declare it as a pair on the `data-theme` elements, and set the light value on `:root` for pages without `data-theme`. Put both rules after the VaneUI stylesheet: `[data-theme]:not(:root)` carries the same weight as the built-in light-subtree rule, so the pair also wins in a light region inside a dark page (a bare `[data-theme]` loses there).

```css
:root {
  --color-bg-info: oklch(95% 0.02 220);
}

:root[data-theme],
[data-theme]:not(:root) {
  --color-bg-info: light-dark(oklch(95% 0.02 220), oklch(30% 0.05 220));
}
```

Keep `light-dark()` pairs off a `:root`-only rule: bundlers that compile it for older browsers (Next.js does by default) resolve it where it is declared, so nested `data-theme` subtrees would not switch. Uncompiled, `light-dark()` needs Chrome 123, Firefox 120 or Safari 17.5.

## Component Selection Guide

| Need | Component | Notes |
|------|-----------|-------|
| Clickable action | `Button` | Renders `<button>`, or `<a>` with `href` |
| Icon-only button | `IconButton` | Square button, renders `<button>` or `<a>` with `href`. Give an icon-only `IconButton` (and `ModalCloseButton`) an `aria-label` for an accessible name |
| Page trail | `Breadcrumb` + `BreadcrumbItem` | `nav` labelled "Breadcrumb" around an `<ol>`. An item with `href` is a link; the last item is the current page unless one sets `current`. `separator` replaces the chevron |
| One choice out of a few (filter, view switch) | `SegmentedControl` + `SegmentedControlItem` | A row of radio buttons on a neutral track; the selected segment is raised. Takes `value`/`defaultValue`/`onChange` like `RadioGroup`. Give it an `aria-label` |
| Navigation link | `NavLink` | For sidebars/nav menus. Has `active` prop with `aria-current="page"`. Renders `<a>` with `href`, `<button>` without |
| Content container with border | `Card` | Renders `<div>`, or `<a>` with `href`. Sub-components: `CardHeader`, `CardBody`, `CardFooter` |
| Horizontal layout | `Row` | Flexbox row, `itemsCenter` by default |
| Vertical layout | `Stack` | Flexbox column with padding |
| Vertical layout (no padding) | `Col` | Flexbox column, no padding |
| Page-width wrapper | `Container` | Centered, max-width, no padding |
| Semantic page section | `Section` | Flex column with padding, responsive |
| Equal-column grid | `Grid2`-`Grid6` | CSS Grid with N columns. `divided` draws 1px lines between cells instead of the gap |
| Page heading | `PageTitle` | Renders `<h1>`, responsive |
| Section heading | `SectionTitle` | Renders `<h2>`, responsive |
| Subsection heading | `Title` | Renders `<h3>`, responsive |
| Body text | `Text` | Renders `<p>` |
| Hyperlink | `Link` | Renders `<a>`, underline by default, blue link color by default |
| Status indicator | `Badge` | Pill-shaped, semibold (normal case; add `uppercase` for status-chip look). `dot` adds a status dot; with no text and an `aria-label` the badge is the dot |
| Person or team picture | `Avatar` | Image (`src`), else initials of `name`, else a person icon. `name` is the text alternative. Circle by default, `rounded` for a square |
| Loading placeholder | `skeleton` prop, or `Skeleton` | `skeleton` on a component (or a container) draws it and everything inside as a placeholder in the same layout. `Skeleton` is a plain box for an area with no component, such as a chart |
| Overlapping avatars | `AvatarGroup` | Takes the size for its avatars; `max` and `total` add a "+N" avatar. Give it an `aria-label` |
| Tag / filter token | `Chip` | Rounded, sans-serif, secondary by default |
| Inline code | `Code` | Monospace, rounded, with padding |
| Keyboard shortcut | `Kbd` | Monospace, bordered, 3D effect |
| Text highlight | `Mark` | Background highlight, defaults to warning (yellow) |
| Quoted content | `Blockquote` | Left border accent, inherits parent appearance |
| Text input | `Input` | Renders `<input>`, all HTML input attrs. `startSection` / `endSection` put an icon, prefix, unit or button inside the field |
| Toggle | `Checkbox` | Custom styled, use inside `Label` |
| Form field (label + help + error) | `Field` | Owns the id, points the label at the control, links help/error with `aria-describedby`. Can render its own control via `type` or one of `textInput`/`textarea`/`select`/`checkbox`/`switch`/`radiogroup`, or wrap one passed as a child. An `error` also marks the control invalid |
| Inline status message | `Alert` | Live region: `role="alert"`, or `role="status"` with `polite` |
| Busy indicator | `Spinner` | `role="status"`; give it an `aria-label` |
| Progress | `Progress` | `role="progressbar"` with `value` (and `max`, 100 by default), or `indeterminate` for work of unknown length; give it an `aria-label`. The fill takes the appearance color; restyle it with `themeDefaults={{ progress: { fill: {...} } }}` |
| Hover/focus hint | `Tooltip` + trigger | Ink label that describes its trigger (no `aria-haspopup`/`aria-expanded`). Takes size, appearance and `place*` props directly: `<Tooltip lg placeBottom>` |
| Input label | `Label` | Flex **column** (label above field) with gap, sm size, `inheritAppearance`. Use `row` for inline controls (e.g. Checkbox) |
| Bullet/number list | `List` + `ListItem` | `<ul>` default, `<ol>` with `listDecimal` |
| Horizontal rule | `Divider` | Thin line separator |
| Image | `Img` | Rounded by default. `aspectSquare` / `aspectVideo` fix the shape |
| Fullscreen backdrop | `Overlay` | Portal-rendered, click-to-close, optional blur |
| Dialog | `Modal` | Accessible dialog with focus trap, scroll lock. Sub-components: `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalCloseButton` |
| Floating element | `Popup` + `PopupTrigger` | CSS Anchor Positioning; 12 `place*` placement props (see Popup placement below) |
| Dropdown menu | `Menu` + `MenuItem` + `MenuLabel` | Button-triggered dropdown with keyboard navigation. Use `Divider` between groups |

## Common Patterns

### Page layout

```tsx
<Container>
  <Section>
    <PageTitle>Dashboard</PageTitle>
    <Text>Welcome back.</Text>
  </Section>
  <Section>
    <SectionTitle>Overview</SectionTitle>
    <Row mobileStack>
      <Card>
        <Title>Revenue</Title>
        <Text>$12,000</Text>
      </Card>
      <Card>
        <Title>Users</Title>
        <Text>1,234</Text>
      </Card>
    </Row>
  </Section>
</Container>
```

### Form

```tsx
<Card>
  {/* Col, not Stack: the Card already pads, so a padded Stack would double the inset */}
  <Col>
    <Title>Sign Up</Title>
    {/* Label stacks label-above-field by default (flex column) */}
    <Label>
      Email
      <Input type="email" placeholder="you@example.com" />
    </Label>
    <Label>
      Password
      <Input type="password" placeholder="********" />
    </Label>
    {/* inline control + text: use `row` (optionally `itemsCenter`) */}
    <Label row>
      <Checkbox />
      I agree to the terms
    </Label>
    <Button filled>Create Account</Button>
  </Col>
</Card>
```

`Button` and `IconButton` set no `type`, so inside a `<form>` the browser treats each one as a
submit button: a click, or Enter in a field, submits the form. Pass `type="button"` on every
button that does not submit (Cancel, Add row, a toggle) and `type="submit"` on the one that does.

```tsx
<form onSubmit={save}>
  <Field label="Name"><Input name="name" /></Field>
  <Row>
    <Button type="button" secondary onClick={cancel}>Cancel</Button>
    <Button type="submit" filled>Save</Button>
  </Row>
</form>
```

Prefer `Field` when a control needs help text or an error message: it generates the
id, points the label at the control and links both messages with `aria-describedby`,
which `Label` alone does not do.

```tsx
<Field label="Email" description="We never share it." error={errors.email}>
  <Input type="email" />
</Field>
```

In a `Row` of Fields where only some have help or error text, use `<Row itemsStart>` so the controls stay aligned.

### Field sections

`startSection` and `endSection` put content inside an `Input`: an icon, a prefix, a unit or a
button. The field reserves the section's measured width, and the section follows the field's
size. `Select` takes `startSection` only (its end holds the chevron), and `Field` passes both to
the control it renders. A section ignores the pointer, so a click on an icon focuses the field;
a button or link in a section stays clickable.

```tsx
<Input aria-label="Search" startSection={<Search />} placeholder="Search docs" />
<Input aria-label="Site" startSection="https://" />
<Input aria-label="Weight" type="number" endSection="kg" />
<Field type="url" label="Homepage" startSection="https://" />
```

With a section, `className`, the width props and the sizing part of `style` (width, margin,
flex) apply to the wrapper around the field, as on `Select`.

`<Textarea autosize>` grows with its text and has no resize handle. `resizeNone`, `resizeX` and
`resize` change the handle; the default is `resizeY`.

Mark a field's validation state with the `invalid` validity prop — it layers a danger border/ring over the input's current appearance: `<Input invalid />`.

`Field` can also render the control itself — name a `type` or a control boolean and drop the child:

```tsx
<Field type="email" label="Email" description="We never share it."/>
```

A control VaneUI does not ship (a plain `<input>`, a masked input, a date picker) takes the Field's `id`, `aria-describedby`, `aria-invalid`, `required`, `disabled` and `readOnly` by spreading `useFieldControlProps(props)`. The control's own props win, and outside a Field the props come back unchanged.

```tsx
function DateInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" {...useFieldControlProps(props)} />;
}

<Field label="Start date" error={errors.start}>
  <DateInput />
</Field>
```

An empty string for `error` or `description` means no message, so `error={errors.email ?? ''}` leaves the field valid.

### Button group

```tsx
<Row>
  <Button secondary>Cancel</Button>
  <Button filled>Save</Button>
</Row>
```

`Button`, `Input`, `Textarea` and `Select` all default to `sm`, so a field and a button written with no size prop are the same height. Give them the same size prop when you change one (`<Input md>` next to `<Button md>`).

```tsx
<Row>
  <Input placeholder="Email" />
  <Button filled>Subscribe</Button>
</Row>
```

### Button variants

```tsx
<Button>Default (primary outline)</Button>
<Button filled>Primary filled</Button>
<Button danger>Danger outline</Button>
<Button danger filled>Danger filled</Button>
<Button success filled lg>Large success</Button>
<Button href="/docs">Link button (renders <a>)</Button>
<Button pill>Pill shaped</Button>
<Button sharp>Sharp corners</Button>
```

### Card as link

```tsx
<Card href="/details">
  <Title>Clickable card</Title>
  <Text>Renders as an anchor tag.</Text>
</Card>
```

### Feature grid

```tsx
<Grid3>
  <Card>
    <Title>Feature 1</Title>
    <Text>Description of feature one.</Text>
  </Card>
  <Card>
    <Title>Feature 2</Title>
    <Text>Description of feature two.</Text>
  </Card>
  <Card>
    <Title>Feature 3</Title>
    <Text>Description of feature three.</Text>
  </Card>
</Grid3>
```

### Status badges

```tsx
<Row>
  <Badge success filled>Active</Badge>
  <Badge warning filled>Pending</Badge>
  <Badge danger filled>Error</Badge>
</Row>
```

### Alert with a title and an action

```tsx
<Alert warning itemsCenter>
  <Col noGap>
    <Text fontSemibold>Your trial ends in three days</Text>
    <Text sm>Add a payment method to keep your projects running.</Text>
  </Col>
  <Button warning filled>Add card</Button>
</Alert>
```

A `Text`, `Col`, `Stack` or `Row` placed directly in an Alert takes the free width, so the Button after it sits at the end edge. Wrap a bare-text message in `Text` when an action follows it. `itemsCenter` centres the action on a short message; leave it out when the Alert has a leading icon and a message of several lines, so the icon stays on the first line. For a long message, put the buttons in the `Col`, under the text.

Alert text is one step below body text (14px at `md`), and its radius, padding, gap and a leading icon follow the size prop. A `Text` that carries the message, on its own or in that `Col`, follows the Alert's size too: an unsized `Text` takes the Alert's text size, and `<Text sm>` sits one step below it. A plain `<svg>` icon is sized by the Alert; give it a `size-*` class to set your own.

A status dot before the text, or a dot on its own:

```tsx
<Badge success dot>Online</Badge>
<Badge danger dot aria-label="Offline" />
```

### Avatars

```tsx
<Avatar src={user.photo} name={user.name} />
<Avatar name="Ada Lovelace" />            {/* initials AL */}
<AvatarGroup aria-label="Editors" max={3}>
  {editors.map(e => <Avatar key={e.id} src={e.photo} name={e.name} />)}
</AvatarGroup>
```

### Loading placeholders

`skeleton` shows a component as a placeholder in its own layout. On a container it reaches
everything inside: text turns into bars as long as each line, the box components (Button, Badge,
Chip, fields, toggles, segmented controls, Avatar, Img, Icon, Progress) into solid shapes of their own size, and the
container keeps its surface and border. Render the real components with the data, or with
placeholder text of the expected length, so the loaded page does not jump:

```tsx
<Card skeleton={loading}>
  <Row>
    <Avatar src={user?.photo} name={user?.name} />
    <Title>{user?.name}</Title>{/* empty while loading: a 12-character bar */}
  </Row>
  <Text>{user?.bio ?? 'A line of placeholder text about this long.'}</Text>
  <Button filled>Follow</Button>
</Card>
```

The element with the prop gets `aria-busy="true"` and `inert`: nothing inside takes focus or
clicks, and it is hidden from screen readers, so announce the wait elsewhere (for example a
`<Text srOnly role="status">Loading profile</Text>`). A text with nothing in it yet (`{user?.name}`
while `user` is undefined) draws one bar 12 characters long; set `--skeleton-text-width` to change
it. An empty Button, Badge, Chip, Code, Kbd or Mark takes the room of a 6-character label
(`--skeleton-label-width`). Placeholder text of the expected length matches the loaded layout
more closely. Keep text in a component of its own (`Text`, `Title`, a cell): Safari draws the bar
over text placed straight in a `Row`, `Col`, `Card`, `Stack`, `Section` or `Container` as a thin
line. The placeholders pulse, and stand still with reduced motion. Set `--skeleton-color`
to tint them.

`Skeleton` is a box for an area with no component of its own. It is full width and one line of
text tall at its size; aspect props, a height or a class set its shape.

```tsx
<Skeleton aspectVideo />                      {/* a chart or a video */}
<Skeleton lg className="w-1/2" />
```

### Breadcrumb

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/" tag={Link}>Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs" tag={Link}>Docs</BreadcrumbItem>
  <BreadcrumbItem>Button</BreadcrumbItem>
</Breadcrumb>
```

### Segmented control

```tsx
const [status, setStatus] = useState('open');

<SegmentedControl aria-label="Status" value={status} onChange={e => setStatus(e.target.value)}>
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="open">Open</SegmentedControlItem>
  <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
</SegmentedControl>
```

Each segment is a native radio, so the arrow keys move the selection and a form submits the
value under `name`. The control is as tall as a Button of its size (`sm` by default), and its size,
appearance, variant and shape reach the segments: `<SegmentedControl accent filled>` fills the
selected segment with the accent color, and `ghost` drops the track and tints the selected segment. A segment with its own appearance keeps it, `disabled` on a
segment skips it, and `wFull` stretches the segments to fill the width. A segment's `className`
and `style` go to its `<label>`; `ref` and the other attributes go to its radio.

### Tables

`<Table striped>` tints every other body row, `<Table hoverable>` the row under the pointer.

### List

```tsx
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

<List listDecimal>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
</List>
```

### Inline code in text

```tsx
<Text>Run <Code>npm install @vaneui/ui</Code> to get started.</Text>
```

### Custom tag rendering

```tsx
<Stack tag="nav">...</Stack>
<Row tag="header">...</Row>
<Card tag="article">...</Card>
```

### External links

```tsx
{/* External link — auto target="_blank" and rel="noopener noreferrer" */}
<Link href="https://github.com" external>GitHub</Link>

{/* Manual target="_blank" — auto rel="noopener noreferrer" */}
<Link href="https://github.com" target="_blank">GitHub</Link>
```

### Sidebar navigation

```tsx
{/* noGap: NavLinks carry their own padding; icons take the NavLink's size */}
<Col noGap>
  <NavLink href="/dashboard" active><Home /> Dashboard</NavLink>
  <NavLink href="/settings"><Settings /> Settings</NavLink>
  <NavLink href="/profile"><User /> Profile</NavLink>
  <NavLink href="/help" disabled><HelpCircle /> Help</NavLink>
</Col>
```

NavLink is `wFull` so sidebar items fill the column. In a horizontal nav or tab bar, add `wFit`:

```tsx
<Row>
  <NavLink href="/overview" active wFit>Overview</NavLink>
  <NavLink href="/reviews" wFit>Reviews</NavLink>
</Row>
```

To mark the current item with a line instead of only a tint, add `indicatorStart` (a rail on the start edge that turns into a 2px accent mark when `active` or `aria-selected="true"`) or `indicatorBottom` (an accent bar under the active tab). Both are inset shadows, so the text does not move:

```tsx
<Col noGap>
  <NavLink href="/install" indicatorStart ghost secondary>Installation</NavLink>
  <NavLink href="/concepts" indicatorStart ghost active>Core concepts</NavLink>
</Col>
<Row noGap borderB>
  <NavLink href="/docs" indicatorBottom ghost sharp active wFit>Docs</NavLink>
  <NavLink href="/playground" indicatorBottom ghost sharp secondary wFit>Playground</NavLink>
</Row>
```

### Modal dialog

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <Title>Confirm Action</Title>
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>
    <Text>Are you sure you want to proceed?</Text>
  </ModalBody>
  <ModalFooter>
    <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
    <Button filled onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>
```

An open Modal makes the rest of the page inert. VaneUI's own overlays stay usable. A child of `<body>` that has to stay usable too (a toast region, a container another library portals there) takes the `data-vane-overlay` attribute, or registers itself with the ref from `useOverlayRegistration()`. `inertBackground={false}` turns the inert pass off for one modal.

### Dropdown menu

```tsx
<Menu trigger={<Button>Actions <ChevronDown size={14} /></Button>}>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <Divider />
  <MenuItem danger>Delete</MenuItem>
</Menu>
```

### Popup placement

`Popup` positions itself against its anchor via one of 12 `place*` props: `placeTop`, `placeBottom`, `placeLeft`, `placeRight` plus each side's `*Start`/`*End` alignment (`placeTopStart`, `placeTopEnd`, `placeBottomStart`, `placeBottomEnd`, `placeLeftStart`, `placeLeftEnd`, `placeRightStart`, `placeRightEnd`).

`PopupTrigger` owns the anchor and the open state, so the placement goes in `popupProps`:

```tsx
<PopupTrigger popup={<Text>Saved filters</Text>} popupProps={{ placeBottomStart: true }}>
  <Button>Filters</Button>
</PopupTrigger>
```

A `Popup` used on its own needs the anchor's ref (`anchorRef` is required):

```tsx
const anchorRef = useRef<HTMLButtonElement>(null);
const [open, setOpen] = useState(false);

<Button ref={anchorRef} onClick={() => setOpen(true)}>Filters</Button>
<Popup anchorRef={anchorRef} open={open} onClose={() => setOpen(false)} placeBottomStart>
  <Text>Saved filters</Text>
</Popup>
```

For size-driven floating dimensions, `constrainWidth` applies a size-dependent minimum width and `clampHeight` a size-dependent maximum height.

### Card with sub-components

```tsx
<Card>
  <CardHeader>
    <Title>Settings</Title>
    <Badge success>Active</Badge>
  </CardHeader>
  <CardBody>
    <Text>Configure your preferences below.</Text>
  </CardBody>
  <CardFooter>
    <Button secondary>Cancel</Button>
    <Button filled>Save</Button>
  </CardFooter>
</Card>
```

With a part as its direct child, the Card drops its own padding and the parts carry the inset. That holds when the parts sit in a fragment, come from your own component or are rendered from a Server Component. A part nested inside another element does not count. An explicit `padding`, `paddingX` or `paddingY` on the Card keeps its own inset as well.

The parts of a Card or a Modal meet one inset apart: the body keeps its padding, the header drops its bottom padding and the footer its top padding, and the surface puts no gap between them. For a divider, add `borderB` to the header or `borderT` to the footer; a part with a line (or a `filled` part) keeps its padding on that side.

## Responsive Layout

VaneUI is **desktop-first**. Base styles target desktop. Use breakpoint props to adapt for smaller screens.

Every padded surface (`Section`, `Card`, `Stack`, `Container`, `Modal`, `Popup`) scales its
padding down on tablet and mobile, so a nested stack does not starve content on a phone.
`Row`, `Col`, `Grid*` and `Container` default to `noPadding` and add nothing unless you opt
in. Prefer `Col` over `Stack` inside an already padded `Card` when you want no second inset.

```tsx
{/* Row on desktop, stacks to column on mobile */}
<Row mobileStack>
  <Card>Left</Card>
  <Card>Right</Card>
</Row>

{/* Row on desktop, stacks to column on tablet and below */}
<Row tabletStack>
  <Card>Left</Card>
  <Card>Right</Card>
</Row>

{/* Hide on mobile */}
<Col mobileHide>
  <Text>Desktop only sidebar</Text>
</Col>

{/* Hide below desktop (< 1280px): shown only on wide screens */}
<Row desktopHide>
  <Text>Wide-screen toolbar</Text>
</Row>

{/* Show only below tablet (< 1024px): a menu button for small screens */}
<IconButton tabletShow aria-label="Menu"><MenuIcon/></IconButton>

{/* Full width on mobile, its fit width above */}
<Button mobileWFull>Get started</Button>
```

Breakpoints stack/hide **below** the width (exclusive): mobile < 768px, tablet < 1024px, desktop < 1280px. The boundary pixel itself (768/1024/1280) is the larger tier. `*Show` is the reverse of `*Hide`: the element shows only below the width and is hidden from it up. `*WFull` makes a component full width below the width and keeps its base width (`wFit` on a Button) above it. Hide and show are separate categories, so `mobileHide tabletShow` shows only between 768 and 1024px. Combining several `*Stack`, `*Hide`, `*Show` or `*WFull` props of one kind resolves to the widest = their union.

`*Stack` only affects **row-direction** components. It emits `flex-col`, so on `Col`/`Stack`/`Container`/`Section` (already column) it is a no-op — use it on `Row`.

Stacking a `Row` keeps its default `itemsCenter`, so the stacked children shrink to **content width** and center. For full-width stacked cards on mobile, add `itemsStretch` (or `wFull` on each child). Fit-width children such as `Button` and `Badge` keep their width either way; give them `mobileWFull` to fill the stacked row:

```tsx
<Row mobileStack itemsStretch>
  <Card>Full-width when stacked</Card>
  <Card>Full-width when stacked</Card>
</Row>
```

## Size Props

All components support size props. Only one is active at a time. If two props of the same category are both set (e.g. `<Text xs lg>`, or `md` colliding with a spread), the canonical key order decides the winner — NOT JSX order — and dev builds log a console warning. Pass only one prop per category.

```tsx
<Text xs>Extra small</Text>
<Text sm>Small</Text>
<Text>Medium (default)</Text>
<Text lg>Large</Text>
<Text xl>Extra large</Text>
```

Defaults vary by component: most default to `md`, but the controls and the dense components default to `sm`: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Field`, `Label`, `MenuItem`, `MenuLabel`, `NavLink`, `Tooltip`, `Badge` and `Table` (a bare `<Button>` or `<Input>` has 14px text). `Icon` has its own scale: 12, 16, 20, 24 and 32px, 20px by default. Size controls font-size, padding, gap, and border-radius simultaneously via CSS variables. Do not use Tailwind size classes to override these.

## Appearance Props

One appearance per component. Controls text, background, and border colors.

```tsx
<Button>Primary (default)</Button>
<Button accent>Accent</Button>
<Button secondary>Secondary</Button>
<Button tertiary>Tertiary</Button>
<Button success>Success</Button>
<Button danger>Danger</Button>
<Button warning>Warning</Button>
<Button info>Info</Button>
```

Note: `Link` renders its blue link color by default (no explicit appearance). `Chip` defaults to `secondary` (not `primary`). Typography components (`Text`, `Title`, etc.) default to `inheritAppearance` (not `primary`).

## Variant Props

Controls whether colors are applied as background fill or as border/text only.

```tsx
<Button>Outline (default)</Button>
<Button filled>Filled background</Button>
<Button ghost>Ghost</Button>
```

`ghost` renders a transparent background with no border and appearance-colored text, plus a tinted background on hover — for low-emphasis actions.

`outline` is the default for most components. Exceptions: `Checkbox`, `Radio`, `Switch` and `Tooltip` default to `filled`, and `Link` has no variant default (it renders as a link).

An appearance or variant on `Table` reaches its rows and cells, so set it once on the table: `<Table success>` colors the row rules and the header text, `<Table filled>` fills the table, its text follows the fill and its row rules take the divider color of a fill. A cell with its own appearance (`<Td danger>`) keeps it.

## Shape Props

Controls border-radius. One per component.

```tsx
<Button>Rounded (default)</Button>
<Button pill>Pill / fully rounded</Button>
<Button sharp>No border-radius</Button>
```

To make the whole library sharper or rounder, set `--br-scale` (1 by default) in your CSS instead
of giving every component a shape: it multiplies the corners of every component, and `pill` and
`sharp` keep their shape.

```css
:root { --br-scale: 0.5; } /* 0 for square corners, 2 for twice as round */
```

An `Img` that opens or closes a Card built from parts (`<Card><Img/><CardBody>...</CardBody></Card>`)
takes the Card's corners on that edge and is square where it meets the parts.

## Toggle Props

These are on/off switches. Check defaults before using — many are already true.

```tsx
{/* Layout toggles */}
<Card noGap>No gap between children</Card>
<Row gapSm>A fixed small gap at every size and width (gapXs–gapXl)</Row>
<Card aspectVideo>A 16:9 box (aspectSquare, aspectAuto)</Card>
<Card noPadding>No padding</Card>
<Card shadow>Add shadow</Card>
<Card noShadow>Remove shadow</Card>
<Card border>Add border</Card>
<Card noBorder>Remove border</Card>
<Row flexWrap>Allow wrapping</Row>

{/* Typography toggles */}
<Text fontBold>Bold text</Text>
<Text fontSemibold>Semibold text</Text>
<Text italic>Italic text</Text>
<Text underline>Underlined text</Text>
<Text uppercase>UPPERCASE TEXT</Text>
<Text fontMono>Monospace text</Text>
<Text textCenter>Centered</Text>
<Text textRight>Right-aligned</Text>
<Text srOnly>Read by screen readers, not shown</Text>
```

## Text Alignment & RTL

Start/end-intent styling is logical by default: the List marker indent, the Blockquote accent border, and the ListItem icon margin use CSS logical properties, so they render identically in LTR and flip automatically under `dir="rtl"`.

Text alignment offers both modes:

- `textStart` / `textEnd` — direction-aware: start is left in LTR, right in RTL
- `textLeft` / `textRight` — physical: always that side, never flip

```tsx
<Text textStart>Aligns to the reading-direction start</Text>
<Text textEnd>Aligns to the reading-direction end</Text>
<Text textLeft>Always physically left, even under dir="rtl"</Text>
```

## Text Inside Boxed Components

Button, IconButton, Badge, Chip, MenuItem, MenuLabel, SegmentedControlItem, Alert and Tooltip render each run of their own text in a `<span class="vane-text-run">`, and NavLink renders its label in `vane-nav-link-label`. The stylesheet trims that span to the height of the capital letters, so the text sits in the middle of the component with any font. The size of the component does not change. Browsers without `text-box` (before Chrome 133, Safari 18.2, Firefox 154) render the text where the font's line box puts it.

```tsx
<Button><Save /> Save changes</Button>
{/* renders: <button><svg/><span class="vane-text-run"> Save changes</span></button> */}
```

- In tests, find a component by its role or class (`getByRole('button', { name: 'Save changes' })`). `getByText('Save changes')` returns the span, not the button.
- Text passed as an element (a translation component, a fragment, your own `<span>`) is not wrapped. Give your own span `className="vane-text-run"` to center it the same way.
- Label renders each run of its own text in a plain `<span class="vane-label-text">`, which is not trimmed.

## Anti-Patterns

### Don't use Tailwind classes for things VaneUI props handle

```tsx
// WRONG - Tailwind overrides
<Row className="flex items-center gap-4">
<Button className="bg-red-500 text-white rounded-full font-bold">
<Card className="p-4">
<Text className="font-bold text-center">

// RIGHT - VaneUI props
<Row>
<Button danger filled pill fontBold>
<Card>
<Text fontBold textCenter>
```

### Don't specify props that are already defaults

```tsx
// WRONG - redundant (these are already true by default)
<Row gap itemsCenter>
<Button primary outline fontSemibold rounded padding insetRing>
<Card padding rounded gap border>
<Badge secondary pill fontSemibold>
<Stack column gap padding>
<Link underline>

// RIGHT - just use the component
<Row>
<Button>
<Card>
<Badge>
<Stack>
<Link>
```

### Don't wrap Button or NavLink in Link for navigation

```tsx
// WRONG - nested interactive elements (accessibility violation)
<Link href="/docs">
  <Button>Documentation</Button>
</Link>

// RIGHT - Button supports href and tag props
<Button href="/docs" tag={Link}>Documentation</Button>

// RIGHT - or use NavLink for sidebar/header navigation
<NavLink href="/docs" tag={Link}>Documentation</NavLink>
```

### Don't use Text or span as anchor — use Link

```tsx
// WRONG - Text is not a link component
<Text tag="a" href="/about">About</Text>
<span><a href="/about">About</a></span>

// RIGHT - Link component with proper semantics and theming
<Link href="/about">About</Link>
```

### Don't use Button for navigation items — use NavLink

```tsx
// WRONG - Button is for actions, not navigation
<Button sm noShadow noInsetRing sharp justifyStart tag={Link} href="/settings"
        className="w-full border-l-2">
  Settings
</Button>

// RIGHT - NavLink is purpose-built for navigation
<NavLink href="/settings" tag={Link} active={isCurrentPage}>
  <Settings size={16} /> Settings
</NavLink>
```

### Don't use div wrappers when a VaneUI component exists

```tsx
// WRONG
<div className="flex flex-col gap-4 p-4">
  <div className="flex gap-2 items-center">

// RIGHT
<Stack>
  <Row>
```

### Don't hardcode colors

```tsx
// WRONG
<Button className="bg-green-500 hover:bg-green-600 text-white">

// RIGHT
<Button success filled>
```

### Don't use onClick on Card for navigation

```tsx
// WRONG - div with click handler, not accessible
<Card onClick={() => navigate('/page')}>

// RIGHT - renders as <a>, keyboard accessible
<Card href="/page">
```

### Don't mix className sizing with size props

```tsx
// WRONG - conflicting size systems
<Button lg className="text-sm p-1">

// RIGHT - pick one size
<Button sm>
```

## Margins

Layout components (`Card`, `Row`, `Col`, `Stack`, `Section`, `Container`, `Grid*`) **and block typography** (`Text`, `Title`, `SectionTitle`, `PageTitle`, `Blockquote`, `Link`) have size-driven external-spacing props — the margin scales with the size prop, like `gap`/`padding`. Block typography defaults to `noMargin` (it resets the browser's default block margin); opt in per element for document/prose rhythm:

```tsx
<Card margin>All-sides margin</Card>
<Section marginY>Vertical margin only</Section>
<Row marginX>Horizontal margin only</Row>
<SectionTitle marginT>Space above a heading</SectionTitle>
<Text marginB>Space below a paragraph</Text>
<Col noMargin>Reset margin</Col>
```

`marginT`/`marginB` cover top/bottom individually and **compose** — `marginT marginB` applies both (or use `marginY`); `noMargin` resets all sides and wins. Border side toggles compose the same way (`borderT borderL` applies both; `noBorder` resets and wins). `Link` is inline, so its vertical margins are ignored by CSS (only `marginX` takes effect). For the **inline sides** (`ml-4`/`mr-4`) or an **exact value**, use `className`.

## Full-width children (Container / Section)

`Container` and `Section` align children on the cross axis (`itemsCenter` / `itemsStart`), so a child shrinks to its content width. To make a child fill the column, add `itemsStretch` on the parent (or `wFull` on the child):

```tsx
<Container itemsStretch>
  <Card>Fills the container width</Card>
</Container>
```

## className Usage

`className` is for things VaneUI props don't cover (width, height, custom positioning, etc.):

```tsx
<Card className="w-full">Full-width card</Card>
<Input className="w-64" placeholder="Fixed width" />
<Container className="min-h-screen">Full-height container</Container>
<Row sticky primary className="z-10">Sticky header</Row>  {/* sticks at top: 0 (set --sticky-top to clear a fixed bar); primary paints a surface so content doesn't show through */}
```

User `className` always wins over theme classes via `twMerge`. That holds at every width: a responsive component (`Section`, `Card`, `Stack`, `Container`, `Alert`, `Modal`, `Popup`, the titles) repeats its padding, gap and font size for tablet and mobile, and a class that overrides one of those values replaces all three, so `<Section className="py-8">` keeps `py-8` on a phone. Override the whole value (`py-*`, `px-*`, `p-*`, `gap-*`, a font-size class): a one-sided class such as `pt-*` or `gap-x-*` still gives way to the theme below 1024px. Explicit responsive props (`mobileStack`, `tabletHide`, `mobileWFull`) and the Grid column collapse are not overridden by a class without a breakpoint.
