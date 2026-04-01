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
  Menu,
  MenuItem,
  MenuLabel,
  NavLink,
  Divider,
  Row,
  Code,
  Checkbox,
  Label,
  Col,
  Stack,
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
        data-testid="z-popup-nested"
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
        data-testid="z-popup-standalone"
      >
        <Text>Standalone popup</Text>
      </Popup>
    </section>
  );
}

export function TestHarness() {
  return (
    <ThemeProvider>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 32 }}>

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

        {/* ── Icon sizing: bare SVG vs Icon component ── */}

        <section data-testid="icon-sizing">
          <Button xs data-testid="icon-bare-xs"><StarIcon /></Button>
          <Button xs data-testid="icon-wrapped-xs"><Icon xs><StarIcon /></Icon></Button>
          <Button md data-testid="icon-bare-md"><StarIcon /></Button>
          <Button md data-testid="icon-wrapped-md"><Icon md><StarIcon /></Icon></Button>
          <Button xl data-testid="icon-bare-xl"><StarIcon /></Button>
          <Button xl data-testid="icon-wrapped-xl"><Icon xl><StarIcon /></Icon></Button>
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
        </section>

        {/* ── Z-Index stacking ── */}

        <ZIndexFixtures />

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
        </section>

        {/* ── Checkbox: border visibility and variant behavior ── */}

        <section data-testid="checkbox-section">
          {/* Default unchecked checkboxes (filled variant) — must show visible border */}
          <Checkbox data-testid="checkbox-default" />
          <Checkbox primary data-testid="checkbox-primary" />
          <Checkbox success data-testid="checkbox-success" />
          <Checkbox danger data-testid="checkbox-danger" />

          {/* Explicit outline variant */}
          <Checkbox outline data-testid="checkbox-outline" />
          <Checkbox outline success data-testid="checkbox-outline-success" />

          {/* Checked checkboxes — filled should fill with color */}
          <Checkbox defaultChecked data-testid="checkbox-checked-filled" />
          <Checkbox outline defaultChecked data-testid="checkbox-checked-outline" />

          {/* Checkbox on dark background — must be visible */}
          <Card filled primary data-testid="checkbox-dark-bg">
            <Label>
              <Checkbox data-testid="checkbox-on-dark" />
              Visible on dark
            </Label>
          </Card>
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

      </div>
    </ThemeProvider>
  );
}
