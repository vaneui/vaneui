import React, { useRef } from 'react';
import {
  ThemeProvider,
  Card,
  Text,
  Title,
  Button,
  Badge,
  Chip,
  Icon,
  Blockquote,
  Kbd,
  Mark,
  Link,
  Overlay,
  Modal,
  ModalHeader,
  ModalBody,
  Popup,
  PopupTrigger,
  Menu,
  MenuItem,
  MenuLabel,
  NavLink,
  Divider,
  Row,
  Code,
  Checkbox,
  Label,
  Input,
  List,
  ListItem,
  Col,
  Stack,
  Grid4,
  Grid6,
  Section,
  SectionTitle,
  PageTitle,
} from '../../src';

// Simple SVG icon for testing
export const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/**
 * Z-index stacking test fixtures.
 * All components are always-open so e2e tests can read computed z-index.
 */
function ZIndexFixtures() {
  const popupAnchorRef = useRef<HTMLButtonElement>(null);
  const nestedPopupAnchorRef = useRef<HTMLButtonElement>(null);

  return (
    <section data-testid="z-index-section">
      {/* 1. Standalone Overlay — should get z-index 201 (overlay base 200 + stack 1) */}
      <Overlay
        open
        noAnimation
        portal={false}
        pointerEventsNone
        data-testid="z-overlay-standalone"
      >
        <Text>Standalone overlay</Text>
      </Overlay>

      {/* 2. Modal — overlay gets z-index, content sits inside it */}
      <Modal
        open
        noAnimation
        portal={false}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        scrollLock={false}
        focusTrap={false}
        overlayProps={{
          pointerEventsNone: true,
          'data-testid': 'z-modal-overlay',
        } as Record<string, unknown>}
        data-testid="z-modal-content"
      >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Text>Modal body</Text>
          {/* Anchor button for a popup nested inside the modal */}
          <button ref={nestedPopupAnchorRef} data-testid="z-nested-popup-anchor">
            Nested popup anchor
          </button>
        </ModalBody>
      </Modal>

      {/* 3. Popup nested inside the same stacking context — popup tier (300 + stack) */}
      <Popup
        open
        noAnimation
        portal={false}
        anchorRef={nestedPopupAnchorRef}
        closeOnEscape={false}
        closeOnClickOutside={false}
        aria-label="Nested popup" data-testid="z-popup-nested"
      >
        <Text>Popup inside modal</Text>
      </Popup>

      {/* 4. Standalone popup anchored to its own button */}
      <button ref={popupAnchorRef} data-testid="z-popup-anchor" style={{ position: 'relative' }}>
        Popup anchor
      </button>
      <Popup
        open
        noAnimation
        portal={false}
        anchorRef={popupAnchorRef}
        closeOnEscape={false}
        closeOnClickOutside={false}
        aria-label="Standalone popup" data-testid="z-popup-standalone"
      >
        <Text>Standalone popup</Text>
      </Popup>
    </section>
  );
}

/**
 * Popup arrow / data-placement flip fixture (B1/B4). The anchor is pinned to
 * the viewport bottom, so a bottom-placed popup has no room below and the
 * browser flips it to the top via position-try; data-placement must follow the
 * actual rendered side (which drives the arrow), not the requested one.
 */
function ArrowFlipFixtures() {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <section data-testid="arrow-flip-section">
      <button
        ref={anchorRef}
        data-testid="arrow-flip-anchor"
        style={{ position: 'fixed', bottom: 4, left: 40, zIndex: 1 }}
      >
        anchor
      </button>
      <Popup
        open
        noAnimation
        arrow
        bottomStart
        anchorRef={anchorRef}
        closeOnEscape={false}
        closeOnClickOutside={false}
        aria-label="flip popup"
        data-testid="arrow-flip-popup"
      >
        <Text>flips up</Text>
      </Popup>
    </section>
  );
}

/** Grid column-count fixtures (B10): desktop-first ramps measured at viewports. */
function GridFixtures() {
  return (
    <section data-testid="grid-section">
      <Grid4 data-testid="grid4">
        <div>1</div><div>2</div><div>3</div><div>4</div>
      </Grid4>
      <Grid6 data-testid="grid6">
        <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
      </Grid6>
    </section>
  );
}

/** Focus-group fixture (R9): a focus-triggered popup with a focusable inside. */
function PopupTriggerFixtures() {
  return (
    <section data-testid="popuptrigger-section">
      <PopupTrigger
        triggerOnFocus
        popup={<button data-testid="pt-popup-btn">Inside</button>}
        popupProps={{ 'aria-label': 'focus popup', 'data-testid': 'pt-popup' } as Record<string, unknown>}
      >
        <input data-testid="pt-trigger" aria-label="Focus me" placeholder="Focus me" />
      </PopupTrigger>
      <button data-testid="pt-outside">outside</button>
    </section>
  );
}

/** Interactive nested-submenu fixture (B2): opened via click/keyboard in e2e. */
function SubmenuFixtures() {
  return (
    <section data-testid="submenu-section">
      <Menu trigger={<Button data-testid="sm-root-trigger">File</Button>} noAnimation>
        <MenuItem data-testid="sm-new">New</MenuItem>
        <Menu trigger={<MenuItem data-testid="sm-submenu-trigger">Open Recent</MenuItem>} noAnimation>
          <MenuItem data-testid="sm-doc1">doc1</MenuItem>
          <MenuItem data-testid="sm-doc2">doc2</MenuItem>
        </Menu>
        <MenuItem data-testid="sm-save">Save</MenuItem>
      </Menu>
    </section>
  );
}

export function TestHarness() {
  return (
    <ThemeProvider>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* ── No-global-reset guard: BARE elements outside any VaneUI
            component must keep their user-agent styles — the shipped CSS
            must never reset the consumer's page ── */}
        <section data-testid="no-global-reset">
          <h1 data-testid="bare-h1">Bare heading</h1>
          <button data-testid="bare-button">Bare button</button>
          <ul data-testid="bare-ul"><li>item</li></ul>
        </section>

        {/* ── Appearance inheritance: Card → Text/Title ── */}

        <section data-testid="inherit-primary-outline">
          <Card primary>
            <Text data-testid="inherit-primary-outline-text">Primary outline text</Text>
            <Title data-testid="inherit-primary-outline-title">Primary outline title</Title>
          </Card>
        </section>

        <section data-testid="inherit-danger-filled">
          <Card danger filled>
            <Text data-testid="inherit-danger-filled-text">Danger filled text</Text>
            <Title data-testid="inherit-danger-filled-title">Danger filled title</Title>
          </Card>
        </section>

        <section data-testid="inherit-brand-outline">
          <Card brand>
            <Text data-testid="inherit-brand-outline-text">Brand outline text</Text>
            <Title data-testid="inherit-brand-outline-title">Brand outline title</Title>
          </Card>
        </section>

        <section data-testid="inherit-success-filled">
          <Card success filled>
            <Text data-testid="inherit-success-filled-text">Success filled text</Text>
            <Title data-testid="inherit-success-filled-title">Success filled title</Title>
          </Card>
        </section>

        {/* ── Nested appearance override ── */}

        <section data-testid="nested-override">
          <Card primary>
            <Badge danger data-testid="nested-override-badge">Danger badge</Badge>
            <Text data-testid="nested-override-text">Primary text</Text>
          </Card>
        </section>

        {/* ── Size variants: Button font-size ── */}

        <section data-testid="size-variants-button">
          <Button xs data-testid="button-xs">XS</Button>
          <Button sm data-testid="button-sm">SM</Button>
          <Button md data-testid="button-md">MD</Button>
          <Button lg data-testid="button-lg">LG</Button>
          <Button xl data-testid="button-xl">XL</Button>
        </section>

        {/* ── Size variants: Text font-size ── */}

        <section data-testid="size-variants-text">
          <Text xs data-testid="text-xs">XS text</Text>
          <Text sm data-testid="text-sm">SM text</Text>
          <Text data-testid="text-md">MD text</Text>
          <Text lg data-testid="text-lg">LG text</Text>
          <Text xl data-testid="text-xl">XL text</Text>
        </section>

        {/* ── Button SVG sizing across size variants ── */}

        <section data-testid="icon-sizing">
          <Button xs aria-label="star xs" data-testid="icon-bare-xs"><StarIcon /></Button>
          <Button md aria-label="star md" data-testid="icon-bare-md"><StarIcon /></Button>
          <Button xl aria-label="star xl" data-testid="icon-bare-xl"><StarIcon /></Button>
        </section>

        {/* ── Icon sizing: Badge and Chip ── */}

        <section data-testid="icon-sizing-badge-chip">
          <Badge xs data-testid="badge-icon-xs"><StarIcon /> Badge</Badge>
          <Badge sm data-testid="badge-icon-sm"><StarIcon /> Badge</Badge>
          <Badge md data-testid="badge-icon-md"><StarIcon /> Badge</Badge>
          <Badge lg data-testid="badge-icon-lg"><StarIcon /> Badge</Badge>
          <Badge xl data-testid="badge-icon-xl"><StarIcon /> Badge</Badge>

          <Chip xs data-testid="chip-icon-xs"><StarIcon /> Chip</Chip>
          <Chip sm data-testid="chip-icon-sm"><StarIcon /> Chip</Chip>
          <Chip md data-testid="chip-icon-md"><StarIcon /> Chip</Chip>
          <Chip lg data-testid="chip-icon-lg"><StarIcon /> Chip</Chip>
          <Chip xl data-testid="chip-icon-xl"><StarIcon /> Chip</Chip>

          {/* Button icons at same sizes for cross-component comparison */}
          <Button xs data-testid="button-icon-xs"><StarIcon /> Button</Button>
          <Button sm data-testid="button-icon-sm"><StarIcon /> Button</Button>
          <Button md data-testid="button-icon-md"><StarIcon /> Button</Button>
          <Button lg data-testid="button-icon-lg"><StarIcon /> Button</Button>
          <Button xl data-testid="button-icon-xl"><StarIcon /> Button</Button>

          {/* Text-only counterparts at the same sizes — used by computed-styles.spec to
              assert padding stays the same whether or not a direct-child SVG is present. */}
          <Button xs data-testid="button-text-xs">Button</Button>
          <Button sm data-testid="button-text-sm">Button</Button>
          <Button md data-testid="button-text-md">Button</Button>
          <Button lg data-testid="button-text-lg">Button</Button>
          <Button xl data-testid="button-text-xl">Button</Button>
        </section>

        {/* ── Typography inherit vs explicit ── */}

        <section data-testid="explicit-override">
          <Card danger>
            <Text data-testid="explicit-override-inherit">Inherits danger</Text>
            <Text primary data-testid="explicit-override-primary">Explicit primary</Text>
          </Card>
        </section>

        {/* ── Blockquote ── */}

        <section data-testid="blockquote-section">
          <Blockquote data-testid="blockquote-default">Default blockquote text</Blockquote>
          <Card brand>
            <Blockquote data-testid="blockquote-inherit-brand">Inherits brand from Card</Blockquote>
            <Text data-testid="blockquote-inherit-brand-text">Brand text for comparison</Text>
          </Card>
          <Blockquote brand data-testid="blockquote-brand">Explicit brand blockquote</Blockquote>
          <Blockquote xs data-testid="blockquote-xs">XS blockquote</Blockquote>
          <Blockquote sm data-testid="blockquote-sm">SM blockquote</Blockquote>
          <Blockquote data-testid="blockquote-md">MD blockquote</Blockquote>
          <Blockquote lg data-testid="blockquote-lg">LG blockquote</Blockquote>
          <Blockquote xl data-testid="blockquote-xl">XL blockquote</Blockquote>
          {/* cite source line — themed <cite>, muted via tertiary token (not opacity) */}
          <Blockquote cite="Ada Lovelace" data-testid="blockquote-cited">Quoted text</Blockquote>
        </section>

        {/* ── Kbd ── */}

        <section data-testid="kbd-section">
          <Kbd data-testid="kbd-default">Ctrl</Kbd>
          <Kbd xs data-testid="kbd-xs">Ctrl</Kbd>
          <Kbd sm data-testid="kbd-sm">Ctrl</Kbd>
          <Kbd data-testid="kbd-md">Ctrl</Kbd>
          <Kbd lg data-testid="kbd-lg">Ctrl</Kbd>
          <Kbd xl data-testid="kbd-xl">Ctrl</Kbd>
        </section>

        {/* ── Mark ── */}

        <section data-testid="mark-section">
          <Mark data-testid="mark-default">Default highlight</Mark>
          <Mark danger data-testid="mark-danger">Danger highlight</Mark>
          <Mark xs data-testid="mark-xs">XS mark</Mark>
          <Mark sm data-testid="mark-sm">SM mark</Mark>
          <Mark data-testid="mark-md">MD mark</Mark>
          <Mark lg data-testid="mark-lg">LG mark</Mark>
          <Mark xl data-testid="mark-xl">XL mark</Mark>
        </section>

        {/* ── Inline baseline alignment (Code / Kbd / Mark in running text) ──
           Each row inlines the component inside a Text and carries two zero-size
           baseline struts: one in the parent line, one inside the component. The
           spec compares their top edges — a baseline-aligned inline element must
           share the surrounding text's baseline (regression guard: `align-middle`
           on the padded box used to sink the text below the line). */}

        <section data-testid="inline-align-section">
          {(() => {
            const strut: React.CSSProperties = { display: 'inline-block', width: 0, height: 0, verticalAlign: 'baseline' };
            return (
              <>
                <Text data-testid="align-code-line">
                  press <span style={strut} data-testid="align-code-parentbl" />
                  <Code data-testid="align-code"><span style={strut} data-testid="align-code-innerbl" />const x = 1</Code> now
                </Text>
                <Text data-testid="align-kbd-line">
                  press <span style={strut} data-testid="align-kbd-parentbl" />
                  <Kbd data-testid="align-kbd"><span style={strut} data-testid="align-kbd-innerbl" />Ctrl</Kbd> now
                </Text>
                <Text data-testid="align-mark-line">
                  the <span style={strut} data-testid="align-mark-parentbl" />
                  <Mark data-testid="align-mark"><span style={strut} data-testid="align-mark-innerbl" />important</Mark> word
                </Text>
              </>
            );
          })()}
        </section>

        {/* ── Card gap vs padding ratio ── */}

        <section data-testid="card-gap-padding">
          <Card xs data-testid="card-gap-xs">
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </Card>
          <Card sm data-testid="card-gap-sm">
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </Card>
          <Card data-testid="card-gap-md">
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </Card>
          <Card lg data-testid="card-gap-lg">
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </Card>
          <Card xl data-testid="card-gap-xl">
            <Text>Item 1</Text>
            <Text>Item 2</Text>
          </Card>
        </section>

        {/* ── Layout primitive (Stack) spacing curve: gap == padding, md→xl doubles ── */}

        <section data-testid="stack-spacing-curve">
          <Stack xs data-testid="stack-spacing-xs"><Text>A</Text><Text>B</Text></Stack>
          <Stack sm data-testid="stack-spacing-sm"><Text>A</Text><Text>B</Text></Stack>
          <Stack data-testid="stack-spacing-md"><Text>A</Text><Text>B</Text></Stack>
          <Stack lg data-testid="stack-spacing-lg"><Text>A</Text><Text>B</Text></Stack>
          <Stack xl data-testid="stack-spacing-xl"><Text>A</Text><Text>B</Text></Stack>
        </section>

        {/* ── Section spacing curve (desktop track at wide viewport): md→xl doubles ── */}

        <section data-testid="section-spacing-curve">
          <Section xs data-testid="section-spacing-xs"><Text>A</Text><Text>B</Text></Section>
          <Section sm data-testid="section-spacing-sm"><Text>A</Text><Text>B</Text></Section>
          <Section data-testid="section-spacing-md"><Text>A</Text><Text>B</Text></Section>
          <Section lg data-testid="section-spacing-lg"><Text>A</Text><Text>B</Text></Section>
          <Section xl data-testid="section-spacing-xl"><Text>A</Text><Text>B</Text></Section>
        </section>

        {/* ── Border-color inheritance: Divider inside appearance parent ── */}

        <section data-testid="border-color-inherit">
          {/* Standalone Divider — should use default primary border color */}
          <Divider data-testid="divider-standalone" />

          {/* Divider inside Card danger filled — should inherit danger border color */}
          <Card danger filled>
            <Text data-testid="border-inherit-danger-text">Danger card text</Text>
            <Divider data-testid="divider-inherit-danger" />
          </Card>

          {/* Divider inside Card brand outline — should inherit brand border color */}
          <Card brand>
            <Text data-testid="border-inherit-brand-text">Brand card text</Text>
            <Divider data-testid="divider-inherit-brand" />
          </Card>

          {/* Divider inside Card success filled — should inherit success border color */}
          <Card success filled>
            <Divider data-testid="divider-inherit-success" />
          </Card>
        </section>

        {/* ── Link external ── */}

        <section data-testid="link-section">
          <Link href="https://example.com" external data-testid="link-external">External link</Link>
          <Link href="https://example.com" data-testid="link-normal">Normal link</Link>
          {/* Default `link` appearance — uses cascading --link-text */}
          <Link href="#" data-testid="link-appearance-default">Default link</Link>
          {/* Explicit appearances — each must produce a distinct computed color */}
          <Link href="#" primary data-testid="link-appearance-primary">primary</Link>
          <Link href="#" brand data-testid="link-appearance-brand">brand</Link>
          <Link href="#" accent data-testid="link-appearance-accent">accent</Link>
          <Link href="#" secondary data-testid="link-appearance-secondary">secondary</Link>
          <Link href="#" tertiary data-testid="link-appearance-tertiary">tertiary</Link>
          <Link href="#" success data-testid="link-appearance-success">success</Link>
          <Link href="#" danger data-testid="link-appearance-danger">danger</Link>
          <Link href="#" warning data-testid="link-appearance-warning">warning</Link>
          <Link href="#" info data-testid="link-appearance-info">info</Link>
          {/* Cascade test: default Link inside a filled Card should pick up
              --link-text from the Card's [data-variant="filled"] rule, which
              binds it to --color-text-filled-link instead of --color-text-link.
              The two should render visibly different colors. */}
          <Card filled primary>
            <Link href="#" data-testid="link-cascade-in-filled-card">cascade link</Link>
          </Card>
        </section>

        {/* ── Z-Index stacking ── */}

        <ZIndexFixtures />

        {/* ── Popup arrow / data-placement flip (B1/B4) ── */}

        <ArrowFlipFixtures />

        {/* ── Grid column counts (B10) ── */}

        <GridFixtures />

        {/* ── Nested submenu (B2) ── */}

        <SubmenuFixtures />

        {/* ── PopupTrigger focus group (R9) ── */}

        <PopupTriggerFixtures />

        {/* ── NavLink icon sizing ── */}

        <section data-testid="navlink-icon-section">
          <NavLink xs data-testid="navlink-icon-xs"><StarIcon /> XS NavLink</NavLink>
          <NavLink sm data-testid="navlink-icon-sm"><StarIcon /> SM NavLink</NavLink>
          <NavLink md data-testid="navlink-icon-md"><StarIcon /> MD NavLink</NavLink>
          <NavLink lg data-testid="navlink-icon-lg"><StarIcon /> LG NavLink</NavLink>
          <NavLink xl data-testid="navlink-icon-xl"><StarIcon /> XL NavLink</NavLink>
        </section>

        {/* ── MenuLabel icon sizing ── */}

        <section data-testid="menulabel-icon-section">
          <MenuLabel md data-testid="menulabel-icon-md"><StarIcon /> Label</MenuLabel>
        </section>

        {/* ── NavLink/MenuItem idle background — should be transparent ── */}

        <section data-testid="idle-bg-section">
          <NavLink danger data-testid="navlink-idle-danger">Danger NavLink (idle)</NavLink>
          <NavLink danger filled data-testid="navlink-idle-danger-filled">Danger Filled NavLink (idle)</NavLink>
          <NavLink danger active data-testid="navlink-active-danger">Danger NavLink (active)</NavLink>
          <NavLink danger filled active data-testid="navlink-active-danger-filled">Danger Filled NavLink (active)</NavLink>
        </section>

        {/* ── Variant inheritance: filled layout → outline children ── */}

        <section data-testid="variant-inherit">
          {/* Standalone Button — stays outline (control) */}
          <Button data-testid="vi-standalone-button">Standalone</Button>

          {/* Filled Card → Button inherits filled */}
          <Card filled data-testid="vi-filled-card">
            <Button data-testid="vi-button-in-filled">Button</Button>
            <Code data-testid="vi-code-in-filled">code</Code>
            <Badge data-testid="vi-badge-in-filled">Badge</Badge>
          </Card>

          {/* Filled danger Card → Button (default primary) gets filled-primary colors */}
          <Card filled danger data-testid="vi-filled-danger-card">
            <Button data-testid="vi-button-in-danger">Button</Button>
            <Button success data-testid="vi-button-success-in-danger">Success</Button>
          </Card>

          {/* Row transparency: filled Card → Row → Button */}
          <Card filled data-testid="vi-row-transparency">
            <Row>
              <Button data-testid="vi-button-through-row">Through Row</Button>
            </Row>
          </Card>

          {/* Divider inside filled Card */}
          <Card filled data-testid="vi-divider-in-filled">
            <Divider data-testid="vi-divider-filled" />
          </Card>

          {/* Nested Cards: filled Card → outline Card → Button */}
          <Card filled data-testid="vi-nested-outer">
            <Card data-testid="vi-nested-inner">
              <Button data-testid="vi-button-nested">Nested</Button>
            </Card>
          </Card>

          {/* Explicit filled on child — should still work normally */}
          <Card filled>
            <Button filled data-testid="vi-button-explicit-filled">Explicit filled</Button>
          </Card>

          {/* Stack/Col transparency: filled Card → Stack/Col → Button */}
          <Card filled data-testid="vi-stack-transparency">
            <Stack>
              <Button data-testid="vi-button-through-stack">Through Stack</Button>
            </Stack>
          </Card>
          <Card filled data-testid="vi-col-transparency">
            <Col>
              <Button data-testid="vi-button-through-col">Through Col</Button>
            </Col>
          </Card>

          {/* Identity components inside filled Card — should keep own colors */}
          <Card filled data-testid="vi-identity-card">
            <Mark data-testid="vi-mark-in-filled">Highlighted</Mark>
            <Chip data-testid="vi-chip-in-filled">Tag</Chip>
            <Link href="#" data-testid="vi-link-in-filled">Link</Link>
          </Card>

          {/* Nested layout inheritance: filled Card → explicit Stack → Text inherits */}
          <Card filled primary data-testid="vi-nested-stack-card">
            <Stack outline primary data-testid="vi-nested-stack-outline">
              <Text data-testid="vi-text-inherits-stack">Inherits from Stack</Text>
            </Stack>
            <Stack filled danger data-testid="vi-nested-stack-danger">
              <Text data-testid="vi-text-inherits-danger-stack">Inherits from danger Stack</Text>
            </Stack>
          </Card>

          {/* Filled text contrast: text on filled backgrounds for each appearance */}
          <Card filled primary data-testid="vi-contrast-primary">
            <Text data-testid="vi-contrast-text-primary">Primary filled</Text>
          </Card>
          <Card filled brand data-testid="vi-contrast-brand">
            <Text data-testid="vi-contrast-text-brand">Brand filled</Text>
          </Card>
          <Card filled secondary data-testid="vi-contrast-secondary">
            <Text data-testid="vi-contrast-text-secondary">Secondary filled</Text>
          </Card>
          <Card filled success data-testid="vi-contrast-success">
            <Text data-testid="vi-contrast-text-success">Success filled</Text>
          </Card>
          <Card filled danger data-testid="vi-contrast-danger">
            <Text data-testid="vi-contrast-text-danger">Danger filled</Text>
          </Card>
          <Card filled warning data-testid="vi-contrast-warning">
            <Text data-testid="vi-contrast-text-warning">Warning filled</Text>
          </Card>
          <Card filled info data-testid="vi-contrast-info">
            <Text data-testid="vi-contrast-text-info">Info filled</Text>
          </Card>
          <Card filled accent data-testid="vi-contrast-accent">
            <Text data-testid="vi-contrast-text-accent">Accent filled</Text>
          </Card>
          <Card filled tertiary data-testid="vi-contrast-tertiary">
            <Text data-testid="vi-contrast-text-tertiary">Tertiary filled</Text>
          </Card>
          <Card filled link data-testid="vi-contrast-link">
            <Text data-testid="vi-contrast-text-link">Link filled</Text>
          </Card>
        </section>

        {/* ── Ghost variant: computed styles ── */}

        <section data-testid="ghost-variant">
          {/* Ghost buttons for appearance comparison */}
          <Button ghost data-testid="ghost-primary">Primary Ghost</Button>
          <Button ghost danger data-testid="ghost-danger">Danger Ghost</Button>
          <Button ghost success data-testid="ghost-success">Success Ghost</Button>
          <Button ghost brand data-testid="ghost-brand">Brand Ghost</Button>

          {/* Outline control for color comparison */}
          <Button data-testid="outline-primary-control">Outline Primary</Button>
          <Button danger data-testid="outline-danger-control">Outline Danger</Button>

          {/* Ghost badge */}
          <Badge ghost data-testid="ghost-badge">Ghost Badge</Badge>

          {/* Ghost Card with Text inside — Text inherits from ghost */}
          <Card ghost primary data-testid="ghost-card">
            <Text data-testid="ghost-card-text">Text inside ghost card</Text>
          </Card>

          {/* Ghost inside filled parent — ghost uses its own rule */}
          <Card filled danger data-testid="ghost-in-filled-parent">
            <Button ghost data-testid="ghost-button-in-filled">Ghost in Filled</Button>
          </Card>
        </section>

        {/* ── Menu (after z-index fixtures to avoid affecting stacking counts) ── */}

        <section data-testid="menu-section">
          {/* Size variants - always-open menus for measuring computed styles */}
          <Menu
            defaultOpen
            trigger={<Button data-testid="menu-trigger-default">Menu</Button>}
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            // axe: this menu is artificially long for size measurements; the
            // default max-height would make it a scrollable region whose
            // roving-tabindex items (tabIndex=-1) trip
            // scrollable-region-focusable
            className="max-h-none"
          >
            <MenuItem xs data-testid="menu-item-xs">XS item</MenuItem>
            <MenuItem sm data-testid="menu-item-sm">SM item</MenuItem>
            <MenuItem md data-testid="menu-item-md">MD item</MenuItem>
            <MenuItem lg data-testid="menu-item-lg">LG item</MenuItem>
            <MenuItem xl data-testid="menu-item-xl">XL item</MenuItem>
            <Divider />
            <MenuItem primary data-testid="menu-item-primary">Primary</MenuItem>
            <MenuItem danger data-testid="menu-item-danger">Danger</MenuItem>
            <MenuItem success data-testid="menu-item-success">Success</MenuItem>
            <MenuItem disabled data-testid="menu-item-disabled">Disabled</MenuItem>
            <Divider />
            <MenuItem xs data-testid="menu-item-icon-xs"><StarIcon /> XS Icon</MenuItem>
            <MenuItem sm data-testid="menu-item-icon-sm"><StarIcon /> SM Icon</MenuItem>
            <MenuItem md data-testid="menu-item-icon-md"><StarIcon /> MD Icon</MenuItem>
            <MenuItem lg data-testid="menu-item-icon-lg"><StarIcon /> LG Icon</MenuItem>
            <MenuItem xl data-testid="menu-item-icon-xl"><StarIcon /> XL Icon</MenuItem>
          </Menu>

          {/* Menu size variants — always-open for measuring popup frame +
              MenuItem inherited padding at each size. Each contains a single
              item with no explicit size so it inherits the Menu's size via
              the ThemeProvider propagation in Menu.tsx. */}
          <Menu
            xs
            defaultOpen
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="menu-trigger-size-xs">T</Button>}
            data-testid="menu-frame-xs"
          >
            <MenuItem data-testid="menu-inherit-xs">Item</MenuItem>
          </Menu>
          <Menu
            sm
            defaultOpen
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="menu-trigger-size-sm">T</Button>}
            data-testid="menu-frame-sm"
          >
            <MenuItem data-testid="menu-inherit-sm">Item</MenuItem>
          </Menu>
          <Menu
            md
            defaultOpen
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="menu-trigger-size-md">T</Button>}
            data-testid="menu-frame-md"
          >
            <MenuItem data-testid="menu-inherit-md">Item</MenuItem>
          </Menu>
          <Menu
            lg
            defaultOpen
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="menu-trigger-size-lg">T</Button>}
            data-testid="menu-frame-lg"
          >
            <MenuItem data-testid="menu-inherit-lg">Item</MenuItem>
          </Menu>
          <Menu
            xl
            defaultOpen
            noAnimation
            portal={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="menu-trigger-size-xl">T</Button>}
            data-testid="menu-frame-xl"
          >
            <MenuItem data-testid="menu-inherit-xl">Item</MenuItem>
          </Menu>
        </section>

        {/* ── Checkbox: border visibility and variant behavior ── */}

        <section data-testid="checkbox-section">
          {/* Default unchecked checkboxes (filled variant) — must show visible border */}
          <Checkbox aria-label="checkbox default" data-testid="checkbox-default" />
          <Checkbox primary aria-label="checkbox primary" data-testid="checkbox-primary" />
          <Checkbox success aria-label="checkbox success" data-testid="checkbox-success" />
          <Checkbox danger aria-label="checkbox danger" data-testid="checkbox-danger" />

          {/* Explicit outline variant */}
          <Checkbox outline aria-label="checkbox outline" data-testid="checkbox-outline" />
          <Checkbox outline success aria-label="checkbox outline-success" data-testid="checkbox-outline-success" />

          {/* Checked checkboxes — filled should fill with color */}
          <Checkbox defaultChecked aria-label="checkbox checked-filled" data-testid="checkbox-checked-filled" />
          <Checkbox outline defaultChecked aria-label="checkbox checked-outline" data-testid="checkbox-checked-outline" />

          {/* Checkbox on dark background — must be visible */}
          <Card filled primary data-testid="checkbox-dark-bg">
            <Label>
              <Checkbox aria-label="checkbox on-dark" data-testid="checkbox-on-dark" />
              Visible on dark
            </Label>
          </Card>

          {/* Reference: a primary-outline Card whose border is --color-border-primary
              (gray-200). Used in checkbox.spec.ts to assert that the Checkbox
              unchecked border (gray-300 via --color-border-secondary) is
              distinguishably darker than the layout default. */}
          <Card primary outline data-testid="checkbox-ref-card-primary-outline" />

          {/* Checkbox with `ring` enabled — used to verify the override sets
              --ring-color (not just --border-color). Default Checkbox has
              `noRing: true`, so ring color stays dormant unless opted in. */}
          <Checkbox ring aria-label="checkbox with-ring-unchecked" data-testid="checkbox-with-ring-unchecked" />
          <Checkbox outline ring defaultChecked aria-label="checkbox with-ring-checked-outline" data-testid="checkbox-with-ring-checked-outline" />
        </section>

        {/* ── Overlay: visual appearance and computed styles ── */}

        <section data-testid="overlay-visual-section">
          {/* Default overlay — fixed, full viewport, semi-transparent backdrop */}
          <Overlay open noAnimation portal={false} pointerEventsNone data-testid="overlay-default">
            <Card data-testid="overlay-default-content">Content</Card>
          </Overlay>

          {/* Overlay with blur */}
          <Overlay open noAnimation portal={false} pointerEventsNone blur data-testid="overlay-blur">
            <Card data-testid="overlay-blur-content">Blurred</Card>
          </Overlay>

          {/* Overlay with custom alignment (drawer-style: top-left) */}
          <Overlay open noAnimation portal={false} pointerEventsNone itemsStart justifyStart data-testid="overlay-aligned">
            <Card data-testid="overlay-aligned-content">Drawer</Card>
          </Overlay>
        </section>

        {/* ── Responsive: breakpoint props ── */}

        <section data-testid="responsive-section">
          {/* mobileCol: row on desktop, column on mobile (<768px) */}
          <Row data-testid="responsive-mobileCol" mobileCol>
            <Text data-testid="responsive-mobileCol-child1">A</Text>
            <Text data-testid="responsive-mobileCol-child2">B</Text>
          </Row>

          {/* tabletCol: row on desktop, column on tablet (<1024px) */}
          <Row data-testid="responsive-tabletCol" tabletCol>
            <Text data-testid="responsive-tabletCol-child1">C</Text>
            <Text data-testid="responsive-tabletCol-child2">D</Text>
          </Row>

          {/* mobileHide: visible on desktop, hidden on mobile (<768px) */}
          <Col data-testid="responsive-mobileHide" mobileHide>
            <Text>Visible on desktop</Text>
          </Col>

          {/* tabletHide: visible on desktop, hidden on tablet (<1024px) */}
          <Col data-testid="responsive-tabletHide" tabletHide>
            <Text>Visible on desktop</Text>
          </Col>

          {/* desktopHide: visible on wide screens, hidden on desktop (<1280px) */}
          <Col data-testid="responsive-desktopHide" desktopHide>
            <Text>Visible on wide screens</Text>
          </Col>

          {/* Responsive typography: font-size scales down at breakpoints */}
          <PageTitle responsive data-testid="responsive-pagetitle">Page Title</PageTitle>
          <SectionTitle responsive data-testid="responsive-sectiontitle">Section Title</SectionTitle>
          <Title responsive data-testid="responsive-title">Title</Title>
        </section>

        {/* ── Inherit-size: Link and Code inside headings ── */}

        <section data-testid="inherit-size-section">
          <Title lg data-testid="inherit-size-title">
            Title with <Link href="#" data-testid="inherit-size-link">link</Link> inside
          </Title>
          <SectionTitle data-testid="inherit-size-section-title">
            Section with <Code data-testid="inherit-size-code">code</Code> inside
          </SectionTitle>
        </section>

        {/* ── Icon container mode ── */}

        <section data-testid="icon-container-section">
          <Title>Icon container mode</Title>

          {/* Inline reference — should inherit currentColor, no box */}
          <span style={{ color: 'rgb(255, 0, 0)' }}>
            <Icon data-testid="icon-inline-inherit">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
            </Icon>
          </span>

          {/* Inline with appearance — should color the SVG via --text-color
              but NOT paint a surface background. Regression guard for the
              outline-variant bg-surface paint that was leaking into inline
              icons before .vane-icon[data-variant=outline] override. */}
          <Icon primary data-testid="icon-inline-primary">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Filled pill, primary — should paint a background */}
          <Icon padding pill primary filled data-testid="icon-filled-primary">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Bordered rounded, primary — should paint a border, no background */}
          <Icon padding rounded primary border data-testid="icon-bordered-primary">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Reference: real VaneUI Button with primary+filled. Used to assert
              Icon's filled bg resolves to the same primary background token
              as Button's filled bg (token-agnostic equality). */}
          <Button primary filled data-testid="icon-bg-reference">ref</Button>

          {/* Size scaling — filled pill primary at each size for padding measurement */}
          <Icon xs padding pill primary filled data-testid="icon-size-xs">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon sm padding pill primary filled data-testid="icon-size-sm">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon md padding pill primary filled data-testid="icon-size-md">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon lg padding pill primary filled data-testid="icon-size-lg">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon xl padding pill primary filled data-testid="icon-size-xl">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Shape comparison — same size + appearance, different shapes */}
          <Icon md padding sharp primary filled data-testid="icon-shape-sharp">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon md padding rounded primary filled data-testid="icon-shape-rounded">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon md padding pill primary filled data-testid="icon-shape-pill">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Appearance variety — same size + shape, different appearance */}
          <Icon md padding pill danger filled data-testid="icon-app-danger">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon md padding pill success filled data-testid="icon-app-success">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Ring — Icon with ring + appearance (ring should produce a box-shadow) */}
          <Icon md padding pill primary ring data-testid="icon-with-ring">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* No-ring control — same Icon without ring (for box-shadow comparison) */}
          <Icon md padding pill primary filled data-testid="icon-no-ring">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Shadow — Icon with shadow vs without (both filled to make box-shadow comparable) */}
          <Icon padding pill primary filled shadow data-testid="icon-with-shadow">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>
          <Icon padding pill primary filled data-testid="icon-no-shadow">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
          </Icon>

          {/* Position absolute */}
          <div style={{ position: 'relative', width: 100, height: 40 }}>
            <Icon absolute padding pill danger filled data-testid="icon-absolute" className="top-0 right-0">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg>
            </Icon>
          </div>
        </section>

        {/* ── Text-component appearance backgrounds ──
            Label/List/ListItem are text components: applying an appearance
            (e.g. tertiary) colors the text only and must not paint a background
            box. Label has no bg mapper at all; List/ListItem default to
            `transparent`. */}
        <section data-testid="text-appearance-bg-section">
          {/* Label never paints a background, not even when `filled` */}
          <Label tertiary data-testid="label-outline-tertiary">tertiary label</Label>
          <Label success filled data-testid="label-filled-success">filled label</Label>

          {/* List / ListItem: an appearance colors text only by default */}
          <List tertiary data-testid="list-outline-tertiary">
            <ListItem>outline list item</ListItem>
          </List>
          <List>
            <ListItem tertiary data-testid="list-item-outline-tertiary">outline item</ListItem>
          </List>
        </section>

        {/* ── Label control alignment (checkbox vs input) ──
            Checkbox must sit centered on the FIRST text row even with
            multi-line content (via the wrapper's selfStart default); an Input
            label stays vertically centered. Uses the exact reported samples. */}
        <section data-testid="label-align-section" style={{ width: 320 }}>
          {/* Sample 1: checkbox + wrapping single-paragraph text (inline → row) */}
          <Col>
            <Label htmlFor="terms" row>
              <Checkbox id="terms" data-testid="s1-checkbox" />
              <span data-testid="s1-text">
                I agree to the <Link href="#">Terms of Service</Link> and{' '}
                <Link href="#">Privacy Policy</Link>.
              </span>
            </Label>

            {/* Sample 2: checkbox + two stacked Text rows (inline → row) */}
            <Label htmlFor="emails" row>
              <Checkbox defaultChecked id="emails" data-testid="s2-checkbox" />
              <Col noGap tag="span">
                <Text data-testid="s2-text-first">Receive product updates</Text>
                <Text xs secondary>Occasional emails about new features</Text>
              </Col>
            </Label>
          </Col>

          {/* Sample 3: text label + input — default Label now stacks (U1) */}
          <Col noGap>
            <Label>
              <span data-testid="s3-label-text">Email</span>
              <Input placeholder="you@example.com" data-testid="s3-input" />
            </Label>
          </Col>
        </section>

        {/* ── Label size propagation: a sized Label flows its size to a nested
            Input/Checkbox via LabelSizeContext. The standalone controls at the
            same sizes are the reference the propagated size must match. ── */}
        {/* aria-label on each control: the Labels carry no text (they exist only
            to provide the size context), so an explicit name keeps the page free
            of axe "form elements must have labels" violations. */}
        <section data-testid="label-size-section">
          <Label lg>
            <Checkbox data-testid="lbl-lg-checkbox" aria-label="large checkbox in label" />
            <Input data-testid="lbl-lg-input" aria-label="large input in label" />
          </Label>
          <Label sm>
            <Checkbox data-testid="lbl-sm-checkbox" aria-label="small checkbox in label" />
            <Input data-testid="lbl-sm-input" aria-label="small input in label" />
          </Label>
          {/* explicit-size references */}
          <Input lg data-testid="std-lg-input" aria-label="large input" />
          <Input sm data-testid="std-sm-input" aria-label="small input" />
          <Checkbox lg data-testid="std-lg-checkbox" aria-label="large checkbox" />
          <Checkbox sm data-testid="std-sm-checkbox" aria-label="small checkbox" />
          {/* read-only vs editable (S5: muted look) */}
          <Input readOnly value="read only" aria-label="readonly input" data-testid="ro-input" />
          <Input value="editable" onChange={() => {}} aria-label="editable input" data-testid="rw-input" />
          {/* error vs normal (A5: non-color alert-icon cue) */}
          <Input error aria-label="error input" data-testid="err-input" />
          <Input aria-label="normal input" data-testid="ok-input" />
          {/* sized error inputs — the icon must scale with the size prop */}
          <Input xs error aria-label="xs error input" data-testid="err-input-xs" />
          <Input xl error aria-label="xl error input" data-testid="err-input-xl" />
        </section>

        {/* ── Dark mode: [data-theme="dark"] token flip ──
            The dark block in tokens.css re-declares the color tokens under
            [data-theme="dark"]. Light references render the SAME elements
            outside the dark wrapper so dark-mode.spec.ts can assert the
            computed colors actually flip. */}
        <section data-testid="dark-mode-section">
          {/* Light reference column */}
          <div data-testid="dm-light">
            <Card data-testid="dm-light-surface">
              <Button data-testid="dm-light-button-primary">Primary</Button>
              <Text data-testid="dm-light-text">Inherited text</Text>
              <Input error aria-label="light error input" data-testid="dm-light-error-input" />
            </Card>
            {/* Light control for the bare inherit-mode regression case below */}
            <Text data-testid="dm-light-bare-text">Bare light text</Text>
          </div>

          {/* Dark column — representative components under a data-theme="dark"
              subtree. The root surface is a primary-bg Card, painting the
              dark page surface (gray-950). */}
          <div data-theme="dark" data-testid="dm-dark">
            <Card data-testid="dm-dark-surface">
              <Button data-testid="dm-dark-button-primary">Primary</Button>
              <Button filled data-testid="dm-dark-button-primary-filled">Primary filled</Button>
              <Button danger data-testid="dm-dark-button-danger">Danger</Button>
              <Text data-testid="dm-dark-text">Inherited text</Text>
              <Badge data-testid="dm-dark-badge">Badge</Badge>
              <Chip data-testid="dm-dark-chip">Chip</Chip>
              <Label>
                <Checkbox aria-label="dark checkbox" data-testid="dm-dark-checkbox" />
                Dark checkbox
              </Label>
              <Label>
                <span>Email</span>
                <Input placeholder="you@example.com" aria-label="dark input" data-testid="dm-dark-input" />
              </Label>
              {/* error input — border + icon must use the danger TOKEN, which flips under dark */}
              <Input error aria-label="dark error input" data-testid="dm-dark-error-input" />
              <Link href="#" data-testid="dm-dark-link">Dark link</Link>
            </Card>

            {/* Contrast gate fixtures: all 10 appearances × filled + outline */}
            <Card filled primary data-testid="dm-contrast-filled-primary"><Text data-testid="dm-contrast-filled-text-primary">Primary filled</Text></Card>
            <Card filled brand data-testid="dm-contrast-filled-brand"><Text data-testid="dm-contrast-filled-text-brand">Brand filled</Text></Card>
            <Card filled accent data-testid="dm-contrast-filled-accent"><Text data-testid="dm-contrast-filled-text-accent">Accent filled</Text></Card>
            <Card filled secondary data-testid="dm-contrast-filled-secondary"><Text data-testid="dm-contrast-filled-text-secondary">Secondary filled</Text></Card>
            <Card filled tertiary data-testid="dm-contrast-filled-tertiary"><Text data-testid="dm-contrast-filled-text-tertiary">Tertiary filled</Text></Card>
            <Card filled link data-testid="dm-contrast-filled-link"><Text data-testid="dm-contrast-filled-text-link">Link filled</Text></Card>
            <Card filled success data-testid="dm-contrast-filled-success"><Text data-testid="dm-contrast-filled-text-success">Success filled</Text></Card>
            <Card filled danger data-testid="dm-contrast-filled-danger"><Text data-testid="dm-contrast-filled-text-danger">Danger filled</Text></Card>
            <Card filled warning data-testid="dm-contrast-filled-warning"><Text data-testid="dm-contrast-filled-text-warning">Warning filled</Text></Card>
            <Card filled info data-testid="dm-contrast-filled-info"><Text data-testid="dm-contrast-filled-text-info">Info filled</Text></Card>

            <Card primary data-testid="dm-contrast-outline-primary"><Text data-testid="dm-contrast-outline-text-primary">Primary outline</Text></Card>
            <Card brand data-testid="dm-contrast-outline-brand"><Text data-testid="dm-contrast-outline-text-brand">Brand outline</Text></Card>
            <Card accent data-testid="dm-contrast-outline-accent"><Text data-testid="dm-contrast-outline-text-accent">Accent outline</Text></Card>
            <Card secondary data-testid="dm-contrast-outline-secondary"><Text data-testid="dm-contrast-outline-text-secondary">Secondary outline</Text></Card>
            <Card tertiary data-testid="dm-contrast-outline-tertiary"><Text data-testid="dm-contrast-outline-text-tertiary">Tertiary outline</Text></Card>
            <Card link data-testid="dm-contrast-outline-link"><Text data-testid="dm-contrast-outline-text-link">Link outline</Text></Card>
            <Card success data-testid="dm-contrast-outline-success"><Text data-testid="dm-contrast-outline-text-success">Success outline</Text></Card>
            <Card danger data-testid="dm-contrast-outline-danger"><Text data-testid="dm-contrast-outline-text-danger">Danger outline</Text></Card>
            <Card warning data-testid="dm-contrast-outline-warning"><Text data-testid="dm-contrast-outline-text-warning">Warning outline</Text></Card>
            <Card info data-testid="dm-contrast-outline-info"><Text data-testid="dm-contrast-outline-text-info">Info outline</Text></Card>
          </div>

          {/* Architect's regression case: bare inherit-mode Text inside a
              data-theme="dark" div with NO appearance-bearing wrapper. The
              :root, [data-theme] defaults block must re-resolve --text-color
              against the dark tokens at this element — without it, this Text
              renders the root-resolved LIGHT color. */}
          <div data-theme="dark" data-testid="dm-dark-bare">
            <Text data-testid="dm-dark-bare-text">Bare dark text</Text>
          </div>

          {/* Explicit light marker semantics: data-theme="light" re-declares
              NO tokens — under <html data-theme="dark"> it must pin
              color-scheme: light (native controls) while the dark token
              values still inherit from html. A no-op in the default light
              page, exercised by the html-level dark tests. */}
          <div data-theme="light" data-testid="dm-light-pin">
            <Text data-testid="dm-light-pin-text">Pinned light region</Text>
          </div>
        </section>

        {/* ── RTL: logical utilities under dir="rtl" ──
            The theme layer emits logical utilities for start/end-intent styling
            (List indent ps-(--pl), Blockquote accent border-s-3 + ps-(--pl),
            ListItem icon margin me-(--gap), text-start / text-end) so it flips
            correctly under RTL, while textLeft/textRight stay physical by
            policy. The SAME elements render once in LTR (controls) and once
            inside a dir="rtl" wrapper so rtl.spec.ts can assert computed styles
            for both directions side by side. Alignment Texts are wFull because
            the Text default is wFit (a fit-width box makes text-align moot). */}
        <section data-testid="rtl-section">
          {/* LTR controls */}
          <div data-testid="rtl-ltr-controls">
            <List data-testid="ltr-list">
              <ListItem>First item</ListItem>
              <ListItem icon={<StarIcon />} data-testid="ltr-list-item-icon">Icon item</ListItem>
            </List>
            <Blockquote data-testid="ltr-blockquote">Quoted content</Blockquote>
            <Text wFull textStart data-testid="ltr-text-start">Start-aligned text</Text>
            <Text wFull textEnd data-testid="ltr-text-end">End-aligned text</Text>
            <Text wFull textLeft data-testid="ltr-text-left">Left-aligned text</Text>
          </div>

          {/* Same elements under dir="rtl" */}
          <div dir="rtl" data-testid="rtl-wrapper">
            <List data-testid="rtl-list">
              <ListItem>First item</ListItem>
              <ListItem icon={<StarIcon />} data-testid="rtl-list-item-icon">Icon item</ListItem>
            </List>
            <Blockquote data-testid="rtl-blockquote">Quoted content</Blockquote>
            <Text wFull textStart data-testid="rtl-text-start">Start-aligned text</Text>
            <Text wFull textEnd data-testid="rtl-text-end">End-aligned text</Text>
            <Text wFull textLeft data-testid="rtl-text-left">Left-aligned text</Text>
          </div>
        </section>

        {/* ── Dark portal: PORTALED floating content for the html-level dark
            tests ──
            Modal and Menu here keep portal ENABLED (the component default) so
            their content really lives at the end of document.body, OUTSIDE
            any in-flow [data-theme] wrapper — only <html data-theme="dark">
            (the primary documented mode) can theme it. Every other open
            fixture on this page uses portal={false}. Mounted LAST so the
            stacking-counter z-index values of the earlier always-open
            fixtures stay stable. The overlay is pointerEventsNone and the
            content inherits it, so hit-testing in other specs passes through;
            scrollLock/focusTrap/Escape handling are off so this fixture never
            captures page-level interactions from other tests. */}
        <section data-testid="dark-portal-section">
          <Modal
            open
            noAnimation
            closeOnOverlayClick={false}
            closeOnEscape={false}
            scrollLock={false}
            focusTrap={false}
            overlayProps={{
              pointerEventsNone: true,
              'data-testid': 'dark-portal-modal-overlay',
            } as Record<string, unknown>}
            data-testid="dark-portal-modal-content"
          >
            <ModalHeader>Portal dialog</ModalHeader>
            <ModalBody>
              <Text data-testid="dark-portal-modal-text">Portaled modal text</Text>
            </ModalBody>
          </Modal>

          <Menu
            defaultOpen
            noAnimation
            closeOnClickOutside={false}
            closeOnEscape={false}
            trigger={<Button data-testid="dark-portal-menu-trigger">Menu</Button>}
            data-testid="dark-portal-menu-popup"
          >
            <MenuItem data-testid="dark-portal-menu-item">Portaled item</MenuItem>
          </Menu>
        </section>

      </div>
    </ThemeProvider>
  );
}
