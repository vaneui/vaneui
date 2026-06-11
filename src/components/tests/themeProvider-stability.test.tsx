import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '../themeContext';
import { defaultTheme } from '../defaultTheme';
import type { ThemeProps } from '../themeContext';
import { Label } from '../ui/label';

// Regression tests for the ThemeProvider memoization fix:
// a provider with nothing to customize must reuse the base theme by
// reference and keep a stable context identity across re-renders, so
// useTheme consumers are not cascaded on every provider render.
describe('ThemeProvider identity stability', () => {
  it('should keep the same theme identity across re-renders when no props are given', () => {
    const captured: (ThemeProps | null)[] = [];

    function Capture() {
      captured.push(useTheme());
      return null;
    }

    // fresh elements per render — reusing one element object would let React
    // bail out on identical element references and skip the subtree entirely
    const makeTree = () => (
      <ThemeProvider>
        <Capture />
      </ThemeProvider>
    );

    const { rerender } = render(makeTree());
    rerender(makeTree());
    rerender(makeTree());

    expect(captured.length).toBe(3);
    expect(captured[1]).toBe(captured[0]);
    expect(captured[2]).toBe(captured[0]);
  });

  it('should reuse the parent theme by reference when a nested provider has nothing to customize', () => {
    const captured: (ThemeProps | null)[] = [];

    function Capture() {
      captured.push(useTheme());
      return null;
    }

    render(
      <ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
        <Capture />
        <ThemeProvider>
          <Capture />
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(captured.length).toBe(2);
    // the bare nested provider must not fork the parent theme
    expect(captured[1]).toBe(captured[0]);
  });

  it('should not re-render memoized useTheme consumers when the provider re-renders', () => {
    let consumerRenders = 0;

    function Consumer() {
      useTheme();
      consumerRenders++;
      return null;
    }

    const MemoConsumer = React.memo(Consumer);
    const makeTree = () => (
      <ThemeProvider>
        <MemoConsumer />
      </ThemeProvider>
    );

    const { rerender } = render(makeTree());
    expect(consumerRenders).toBe(1);

    rerender(makeTree());
    rerender(makeTree());

    // stable context identity + React.memo => no consumer re-renders
    expect(consumerRenders).toBe(1);
  });

  it('should keep a stable identity for a customized provider when its inputs are referentially stable', () => {
    const captured: (ThemeProps | null)[] = [];
    const stableDefaults = { button: { main: { filled: true } } };

    function Capture() {
      captured.push(useTheme());
      return null;
    }

    const makeTree = () => (
      <ThemeProvider themeDefaults={stableDefaults}>
        <Capture />
      </ThemeProvider>
    );

    const { rerender } = render(makeTree());
    rerender(makeTree());

    expect(captured.length).toBe(2);
    expect(captured[1]).toBe(captured[0]);
    // customized provider must still produce an isolated copy, not mutate the default theme
    expect(captured[0]).not.toBe(defaultTheme);
    expect(defaultTheme.button.main.defaults.filled).toBeUndefined();
  });

  it('should still apply customizations through the non-fast path', () => {
    let capturedTheme: ThemeProps | null | undefined;

    function Capture() {
      capturedTheme = useTheme();
      return null;
    }

    render(
      <ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
        <Capture />
      </ThemeProvider>
    );

    expect(capturedTheme).toBeDefined();
    expect((capturedTheme!.button.main.defaults as Record<string, boolean>).lg).toBe(true);
    // exclusive-group reset: built-in sm default must be cleared
    expect((capturedTheme!.button.main.defaults as Record<string, boolean>).sm).toBe(false);
  });
});

// P2-10: Label communicates its resolved size to nested Input/Checkbox via
// the scalar LabelSizeContext — it must NOT fork the theme graph the way its
// old nested-ThemeProvider mechanism did (one full theme clone retained per
// mounted Label).
describe('Label subtree theme identity (no per-Label theme fork)', () => {
  it('useTheme() inside a Label subtree returns the same theme object as outside', () => {
    const captured: (ThemeProps | null)[] = [];

    function Capture() {
      captured.push(useTheme());
      return null;
    }

    const makeTree = () => (
      <ThemeProvider>
        <Capture />
        <Label>
          <Capture />
        </Label>
      </ThemeProvider>
    );

    const { rerender } = render(makeTree());
    rerender(makeTree());

    expect(captured.length).toBe(4);
    // inside the Label === outside the Label — no fork on mount...
    expect(captured[1]).toBe(captured[0]);
    // ...and the identity also stays stable across re-renders
    expect(captured[2]).toBe(captured[0]);
    expect(captured[3]).toBe(captured[0]);
  });
});

describe('ThemeProvider dead-customization warning', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should warn in dev when themeDefaults uses the flat form on a sub-themed component', () => {
    render(
      // wrong: button has sub-themes, so this path dead-ends at {main, spinner}
      <ThemeProvider themeDefaults={{ button: { filled: true } } as never}>
        <div />
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('themeDefaults path "button.filled" does not match any theme node')
    );
  });

  it('should not warn for correctly nested themeDefaults', () => {
    render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <div />
      </ThemeProvider>
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('should warn in dev when extraClasses uses the flat form on a sub-themed component', () => {
    render(
      <ThemeProvider extraClasses={{ button: { primary: 'custom' } } as never}>
        <div />
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('extraClasses path "button.primary" does not match any theme node')
    );
  });
});

// P2-3: the context default is null — useTheme is honestly typed
// `ThemeProps | null`. Without a provider components fall back to their own
// default themes; direct useTheme consumers must handle null.
describe('useTheme contract (P2-3)', () => {
  it('returns null when no ThemeProvider is mounted', () => {
    let captured: ThemeProps | null | undefined;

    function Capture() {
      captured = useTheme();
      return null;
    }

    render(<Capture />);

    expect(captured).toBeNull();
  });

  it('returns the full merged theme tree inside a ThemeProvider', () => {
    let captured: ThemeProps | null | undefined;

    function Capture() {
      captured = useTheme();
      return null;
    }

    render(
      <ThemeProvider>
        <Capture />
      </ThemeProvider>
    );

    expect(captured).not.toBeNull();
    // a bare provider serves the default registry by reference (fast path)
    expect(captured).toBe(defaultTheme);
    expect(captured!.button.main).toBe(defaultTheme.button.main);
  });
});

describe('deepClone per-occurrence isolation', () => {
  it('should fork shared objects per occurrence so in-place themeOverride mutations stay component-local', async () => {
    const { deepClone } = await import('../utils/deepMerge');

    const shared = { value: 'shared' };
    const source = { a: { mapper: shared }, b: { mapper: shared } };

    const cloned = deepClone(source);

    expect(cloned).not.toBe(source);
    expect(cloned.a.mapper).not.toBe(shared);
    // each occurrence must be an INDEPENDENT clone — themeOverride mutates
    // nodes in place and relies on per-component isolation
    expect(cloned.a.mapper).not.toBe(cloned.b.mapper);
    cloned.a.mapper.value = 'mutated';
    expect(cloned.b.mapper.value).toBe('shared');
  });
});
