import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, useTheme, defaultTheme } from '../themeContext';
import type { ThemeProps } from '../themeContext';

// Regression tests for the ThemeProvider memoization fix:
// a provider with nothing to customize must reuse the base theme by
// reference and keep a stable context identity across re-renders, so
// useTheme consumers are not cascaded on every provider render.
describe('ThemeProvider identity stability', () => {
  it('should keep the same theme identity across re-renders when no props are given', () => {
    const captured: ThemeProps[] = [];

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
    const captured: ThemeProps[] = [];

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
    const captured: ThemeProps[] = [];
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
    let capturedTheme: ThemeProps | undefined;

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
