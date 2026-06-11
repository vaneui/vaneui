import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { twMerge } from 'tailwind-merge';
import { ThemeProvider, useTheme, defaultTheme } from '../themeContext';
import type { ThemeProps } from '../themeContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { deepClone } from '../utils/deepMerge';
import { ComponentTheme } from '../ui/theme/common';
import type { ButtonProps } from '../ui/button';
import type { BadgeProps } from '../ui/badge';
import type React from 'react';

// P2-4 regression tests for the ComponentTheme class-resolution engine:
// 1. getClasses and getComponentConfig resolve through ONE shared path
//    (extraction + `inherit` appearance expansion) — previously the expansion
//    lived only in getComponentConfig and the entry points could disagree.
// 2. DOM-prop construction skips theme-consumed keys via a precomputed omit
//    set instead of a per-possible-key delete loop — output must be unchanged.
// 3. The per-instance resolution cache (WeakMap-keyed by theme identity) must
//    NEVER leak across deepClone / deepMerge / withDefaults boundaries: every
//    clone produced by ThemeProvider customization starts cold and resolves
//    classes from ITS customized state, never from the source's warm cache.

type AnyComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType };

function expectAgreement<P extends AnyComponentProps, T extends object>(
  theme: ComponentTheme<P, T>,
  props: P
): void {
  const { finalClasses } = theme.getComponentConfig(props);
  // no className in props => finalClasses is exactly the merged theme classes,
  // so both entry points must resolve the identical class list
  expect(finalClasses).toBe(twMerge(...theme.getClasses(props)));
}

describe('getClasses / getComponentConfig agreement', () => {
  it('agrees for Button (explicit props and pure defaults)', () => {
    expectAgreement(defaultTheme.button.main, {});
    expectAgreement(defaultTheme.button.main, { primary: true, filled: true, lg: true });
    expectAgreement(defaultTheme.button.main, { danger: true, pill: true });
  });

  it('agrees for Badge', () => {
    expectAgreement(defaultTheme.badge, {});
    expectAgreement(defaultTheme.badge, { success: true, filled: true });
  });

  it('agrees for typography components that default to the inherit appearance', () => {
    // Text/Label resolve appearance=inherit by default — the path where the
    // two entry points historically diverged (expansion in config only)
    expectAgreement(defaultTheme.text, {});
    expectAgreement(defaultTheme.text, { inherit: true, bold: true });
    expectAgreement(defaultTheme.text, { primary: true });
    expectAgreement(defaultTheme.label, {});
    expectAgreement(defaultTheme.link, {});
  });

  it('agrees for layout components', () => {
    expectAgreement(defaultTheme.card.main, {});
    expectAgreement(defaultTheme.row, {});
    expectAgreement(defaultTheme.section, {});
  });

  it('public getClasses applies extraClasses keyed on expanded inherit flags', () => {
    let captured: ThemeProps | undefined;

    function Capture() {
      captured = useTheme();
      return null;
    }

    render(
      <ThemeProvider extraClasses={{ text: { inheritColor: 'inherit-color-probe' } }}>
        <Capture />
      </ThemeProvider>
    );

    const textTheme = captured!.text;
    // Text defaults to appearance=inherit, which expands to inheritColor/Bg/Border.
    // The render path always honored extraClasses keyed on the expanded flags...
    expect(textTheme.getComponentConfig({}).finalClasses).toContain('inherit-color-probe');
    // ...and since P2-4 the public getClasses resolves through the same path
    // (before the fix it skipped the expansion and missed this class)
    expect(textTheme.getClasses({})).toContain('inherit-color-probe');
    expectAgreement(textTheme, {});
  });

  it('explicit noInheritColor blocks the expansion on both entry points', () => {
    const textTheme = defaultTheme.text;
    const config = textTheme.getComponentConfig({ noInheritColor: true });
    // expansion suppressed => appearance=inherit no longer hides data-appearance
    expect((config.finalProps as Record<string, unknown>)['data-appearance']).toBe('inherit');
    expectAgreement(textTheme, { noInheritColor: true });
  });
});

describe('getComponentConfig DOM prop construction', () => {
  it('strips boolean category props and engine props, forwards HTML attributes', () => {
    const onClick = jest.fn();
    const config = defaultTheme.button.main.getComponentConfig({
      primary: true,
      lg: true,
      filled: true,
      pill: true,
      gap: true,
      noShadow: true,
      id: 'my-id',
      'aria-label': 'action',
      'data-custom': 'x',
      onClick,
      className: 'user-class',
      children: 'child',
    } as ButtonProps);

    const finalProps = config.finalProps as Record<string, unknown>;
    for (const stripped of ['primary', 'lg', 'filled', 'pill', 'gap', 'noShadow', 'className', 'tag', 'children', 'theme']) {
      expect(finalProps).not.toHaveProperty(stripped);
    }
    expect(finalProps.id).toBe('my-id');
    expect(finalProps['aria-label']).toBe('action');
    expect(finalProps['data-custom']).toBe('x');
    expect(finalProps.onClick).toBe(onClick);
    expect(finalProps['data-size']).toBe('lg');
    expect(finalProps['data-appearance']).toBe('primary');
    expect(finalProps['data-variant']).toBe('filled');
    expect(config.finalClasses).toContain('user-class');
    expect(config.Tag).toBe('button');
  });

  it('strips the theme engine prop injected by ThemedComponent', () => {
    const config = defaultTheme.badge.getComponentConfig(
      { theme: defaultTheme.badge } as unknown as BadgeProps
    );
    expect(config.finalProps as Record<string, unknown>).not.toHaveProperty('theme');
  });

  it('preserves native disabled (with data-disabled) on disabled-capable tags', () => {
    const config = defaultTheme.button.main.getComponentConfig({ disabled: true });
    const finalProps = config.finalProps as Record<string, unknown>;
    expect(finalProps.disabled).toBe(true);
    expect(finalProps['data-disabled']).toBe('true');
  });
});

describe('per-instance resolution cache safety', () => {
  it('repeated identical calls return equal classes as fresh, caller-mutation-safe arrays', () => {
    const theme = defaultTheme.button.main;
    const first = theme.getClasses({ primary: true, lg: true });
    const second = theme.getClasses({ primary: true, lg: true });

    expect(second).toEqual(first);
    // fresh array per call — a caller mutating the result must not corrupt
    // subsequent resolutions
    expect(second).not.toBe(first);
    second.push('caller-corruption');
    expect(theme.getClasses({ primary: true, lg: true })).toEqual(first);
  });

  it('deepClone copies never inherit the resolution cache (clone resolves from its own state)', () => {
    const base = defaultTheme.badge;
    const warm = base.getClasses({}); // warm the base instance (base split + walk cache)
    expect(warm).toContain('vane-badge');

    const clone = deepClone(base);
    // mutate the clone BEFORE its first resolution — its lazily built state
    // must reflect the mutation; a cache inherited from the warm base would not
    (clone as { base: string }).base = 'probe-base-class';

    expect(clone.getClasses({})).toContain('probe-base-class');
    expect(clone.getClasses({})).not.toContain('vane-badge');
    // the warm base instance is unaffected
    expect(base.getClasses({})).toEqual(warm);
    // and the clone's DOM-prop path works (omit set is derived per instance,
    // not a structurally-copied — and therefore broken — Set)
    const config = clone.getComponentConfig({ primary: true });
    expect(config.finalProps as Record<string, unknown>).not.toHaveProperty('primary');
  });

  it('themeOverride mutations on the provider clone are honored despite a warm base cache', () => {
    const baseButtonTheme = defaultTheme.button.main;
    // warm the BASE instance for the exact key combination the render will use
    const warmBase = baseButtonTheme.getClasses({});
    expect(warmBase).toContain('text-(length:--fs)');

    const { container } = render(
      <ThemeProvider
        themeOverride={(theme) => {
          // in-place mutation of the CLONED mapper node inside the provider's
          // useMemo — strictly before children render against the clone.
          // (probe name deliberately has no utility prefix so twMerge passes
          // it through instead of conflict-resolving it against text color)
          theme.button.main.themes.size.text.base = 'probe-fs-override';
          return theme;
        }}
      >
        <Button>btn</Button>
      </ThemeProvider>
    );

    const el = container.querySelector('button') as HTMLElement;
    expect(el.className).toContain('probe-fs-override');
    expect(el.className).not.toContain('text-(length:--fs)');
    // the base theme keeps resolving its original (cached) classes
    expect(baseButtonTheme.getClasses({})).toEqual(warmBase);
  });

  it('extraClasses customization applies on the provider clone with a warm base cache', () => {
    const warm = defaultTheme.badge.getClasses({ success: true });
    expect(warm).not.toContain('extra-success-probe');

    const { container } = render(
      <ThemeProvider extraClasses={{ badge: { success: 'extra-success-probe' } }}>
        <Badge success>ok</Badge>
      </ThemeProvider>
    );

    expect((container.firstChild as HTMLElement).className).toContain('extra-success-probe');
    expect(defaultTheme.badge.getClasses({ success: true })).toEqual(warm);
  });

  it('themeDefaults on the provider clone change key extraction while the warm base keeps its own', () => {
    const warmBase = defaultTheme.button.main.getComponentConfig({});
    expect((warmBase.finalProps as Record<string, unknown>)['data-size']).toBe('sm');

    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { xl: true } } }}>
        <Button>big</Button>
      </ThemeProvider>
    );

    expect(container.querySelector('button')).toHaveAttribute('data-size', 'xl');
    const afterProps = defaultTheme.button.main.getComponentConfig({}).finalProps;
    expect((afterProps as Record<string, unknown>)['data-size']).toBe('sm');
  });

  it('nested providers re-cloning a warm customized parent theme stay independent', () => {
    const { getByTestId } = render(
      <ThemeProvider extraClasses={{ badge: { success: 'outer-probe' } }}>
        {/* renders (and warms) the OUTER clone before the inner provider clones it */}
        <Badge success data-testid="outer">a</Badge>
        <ThemeProvider extraClasses={{ badge: { success: 'inner-probe' } }}>
          <Badge success data-testid="inner">b</Badge>
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(getByTestId('outer').className).toContain('outer-probe');
    expect(getByTestId('outer').className).not.toContain('inner-probe');
    // merge strategy replaces the `success` key on the inner clone
    expect(getByTestId('inner').className).toContain('inner-probe');
    expect(getByTestId('inner').className).not.toContain('outer-probe');
  });

  it('withDefaults variants resolve independently of the warm parent instance', () => {
    const parent = defaultTheme.button.main;
    const parentSize = (parent.getComponentConfig({}).finalProps as Record<string, unknown>)['data-size'];
    expect(parentSize).toBe('sm'); // warms the parent

    const variant = parent.withDefaults({ xl: true });
    expect((variant.getComponentConfig({}).finalProps as Record<string, unknown>)['data-size']).toBe('xl');
    expect((parent.getComponentConfig({}).finalProps as Record<string, unknown>)['data-size']).toBe('sm');
  });
});
