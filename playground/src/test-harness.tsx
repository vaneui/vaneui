import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ThemeProvider,
  Card,
  Text,
  Title,
  Button,
  Badge,
  Icon,
  Blockquote,
  Kbd,
  Mark,
} from '../../src';

// Import VaneUI CSS
import '../../dist/vars.css';
import '../../dist/ui.css';

// Simple SVG icon for testing
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

function TestHarness() {
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
          <Button data-testid="button-md">MD</Button>
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
          <Button data-testid="icon-bare-md"><StarIcon /></Button>
          <Button data-testid="icon-wrapped-md"><Icon><StarIcon /></Icon></Button>
          <Button xl data-testid="icon-bare-xl"><StarIcon /></Button>
          <Button xl data-testid="icon-wrapped-xl"><Icon xl><StarIcon /></Icon></Button>
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

      </div>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TestHarness />
  </React.StrictMode>
);
