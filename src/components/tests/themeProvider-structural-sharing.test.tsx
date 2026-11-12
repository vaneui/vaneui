import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '../themeContext';
import { defaultTheme } from '../defaultTheme';
import type { ThemeProps, ThemeProviderProps } from '../themeTypes';
import { deepClone, deepMerge, mergeDefaults } from '../utils/deepMerge';
import { Button, Card, Menu, MenuItem, Tooltip } from '../../index';

// A customized ThemeProvider used to deep-clone the whole theme tree (about 2,700
// objects) before applying anything. It now copies only the nodes on a customized
// path and shares every other node with its base theme by reference. These tests
// pin the three properties that must hold together:
//   1. only the customized path is copied,
//   2. the base theme (a parent provider's, or defaultTheme) is never written to,
//   3. the resulting tree equals what the whole-tree clone produced.

type ProviderOptions = Omit<ThemeProviderProps, 'children'>;
type AnyNode = Record<string, unknown>;

const isObjectLike = (value: unknown): value is AnyNode => typeof value === 'object' && value !== null;

/** Freezes every object reachable from `root`, so any in-place write throws. */
function deepFreeze<T>(root: T, seen = new Set<object>()): T {
  // React element types (forwardRef/memo objects held in `tag`) are not theme nodes
  if (!isObjectLike(root) || seen.has(root) || '$$typeof' in root) return root;
  seen.add(root);
  Object.freeze(root);
  for (const key of Object.keys(root)) deepFreeze(root[key], seen);
  return root;
}

/** Every object reachable from `root`, by identity. */
function collectNodes(root: unknown, into = new Set<object>()): Set<object> {
  if (!isObjectLike(root) || into.has(root)) return into;
  into.add(root);
  for (const key of Object.keys(root)) collectNodes(root[key], into);
  return into;
}

/** Number of objects in `theme` that do not exist in `base`. */
function freshNodeCount(theme: ThemeProps, base: ThemeProps): number {
  const baseNodes = collectNodes(base);
  let fresh = 0;
  collectNodes(theme).forEach(node => { if (!baseNodes.has(node)) fresh++; });
  return fresh;
}

function captureTheme(tree: (probe: React.ReactElement) => React.ReactElement): ThemeProps {
  let captured: ThemeProps | null = null;
  const Probe = () => {
    captured = useTheme();
    return null;
  };
  render(tree(<Probe/>));
  if (!captured) throw new Error('no theme captured');
  return captured;
}

// defaultTheme is the base of every root and every mergeStrategy="replace" provider.
// Frozen for this whole file: a provider that writes to it fails loudly.
deepFreeze(defaultTheme);

describe('ThemeProvider structural sharing', () => {
  it('copies only the path named in themeDefaults', () => {
    const theme = captureTheme(probe => (
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>{probe}</ThemeProvider>
    ));

    expect(theme).not.toBe(defaultTheme);
    expect(theme.button).not.toBe(defaultTheme.button);
    expect(theme.button.main).not.toBe(defaultTheme.button.main);
    expect(theme.button.main.defaults).toMatchObject({ filled: true, outline: false });

    // siblings of the customized node, its mapper tree and every other component are shared
    expect(theme.button.spinner).toBe(defaultTheme.button.spinner);
    expect(theme.button.main.themes).toBe(defaultTheme.button.main.themes);
    (Object.keys(defaultTheme) as (keyof ThemeProps)[])
      .filter(key => key !== 'button')
      .forEach(key => expect(theme[key]).toBe(defaultTheme[key]));

    // root, button, button.main and its defaults object
    expect(freshNodeCount(theme, defaultTheme)).toBe(4);
  });

  it('copies only the path named in extraClasses', () => {
    const theme = captureTheme(probe => (
      <ThemeProvider extraClasses={{ card: { main: { primary: 'card-extra' } } }}>{probe}</ThemeProvider>
    ));

    expect(theme.card.main.extraClasses).toEqual({ primary: 'card-extra' });
    expect(theme.card.header).toBe(defaultTheme.card.header);
    expect(theme.button).toBe(defaultTheme.button);
    expect(freshNodeCount(theme, defaultTheme)).toBe(4);
  });

  it('copies only the paths named in the theme prop', () => {
    const theme = captureTheme(probe => (
      <ThemeProvider theme={{ badge: { defaults: { success: true } } }}>{probe}</ThemeProvider>
    ));

    expect(theme.badge.defaults).toMatchObject({ success: true, secondary: false });
    expect(theme.badge.themes).toBe(defaultTheme.badge.themes);
    expect(theme.button).toBe(defaultTheme.button);
    // root, badge and its defaults object
    expect(freshNodeCount(theme, defaultTheme)).toBe(3);
  });

  it('shares the parent theme in a nested provider', () => {
    let parent: ThemeProps | null = null;
    const ParentProbe = ({ children }: { children: React.ReactNode }) => {
      parent = useTheme();
      return <>{children}</>;
    };
    const child = captureTheme(probe => (
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <ParentProbe>
          <ThemeProvider themeDefaults={{ card: { main: { shadow: true } } }}>{probe}</ThemeProvider>
        </ParentProbe>
      </ThemeProvider>
    ));

    expect(child.button).toBe(parent!.button);
    expect(child.button.main.defaults).toMatchObject({ filled: true });
    expect(child.card.main).not.toBe(parent!.card.main);
    expect(child.card.main.defaults).toMatchObject({ shadow: true });
    expect(freshNodeCount(child, parent!)).toBe(4);
  });

  it('starts mergeStrategy="replace" from defaultTheme without copying it', () => {
    const theme = captureTheme(probe => (
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <ThemeProvider themeDefaults={{ button: { main: { danger: true } } }} mergeStrategy="replace">
          {probe}
        </ThemeProvider>
      </ThemeProvider>
    ));

    expect(theme.button.main.defaults).toMatchObject({ danger: true });
    expect((theme.button.main.defaults as Record<string, boolean>).filled).toBeUndefined();
    expect(theme.card).toBe(defaultTheme.card);
    expect(freshNodeCount(theme, defaultTheme)).toBe(4);
  });

  it('returns the base theme itself when a customization matches no theme node', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const theme = captureTheme(probe => (
      <ThemeProvider themeDefaults={{ button: { filled: true } } as never}>{probe}</ThemeProvider>
    ));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('themeDefaults path "button.filled"'));
    warn.mockRestore();

    expect(theme).toBe(defaultTheme);
  });

  it('the provider a Tooltip mounts copies the popup node only', () => {
    let outer: ThemeProps | null = null;
    let inner: ThemeProps | null = null;
    const Trigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
      function Trigger(props, ref) {
        inner = useTheme();
        return <button ref={ref} {...props}>trigger</button>;
      }
    );
    const OuterProbe = () => {
      outer = useTheme();
      return null;
    };
    render(
      <ThemeProvider>
        <OuterProbe/>
        <Tooltip content="hint"><Trigger/></Tooltip>
      </ThemeProvider>
    );

    expect(inner).not.toBe(outer);
    expect(inner!.popup).not.toBe(outer!.popup);
    expect(inner!.button).toBe(outer!.button);
    expect(inner!.tooltip).toBe(outer!.tooltip);
    // root, popup and its defaults object
    expect(freshNodeCount(inner!, outer!)).toBe(3);
  });

  it('the provider a Menu mounts copies the popup and divider nodes only', () => {
    let outer: ThemeProps | null = null;
    let inner: ThemeProps | null = null;
    const ItemProbe = () => {
      inner = useTheme();
      return null;
    };
    const OuterProbe = () => {
      outer = useTheme();
      return null;
    };
    render(
      <ThemeProvider>
        <OuterProbe/>
        <Menu defaultOpen trigger={<Button>Actions</Button>}>
          <MenuItem>Edit</MenuItem>
          <ItemProbe/>
        </Menu>
      </ThemeProvider>
    );

    expect(inner!.popup).not.toBe(outer!.popup);
    expect(inner!.divider).not.toBe(outer!.divider);
    expect(inner!.menu).toBe(outer!.menu);
    expect(inner!.button).toBe(outer!.button);
    // root, popup, divider and their two defaults objects
    expect(freshNodeCount(inner!, outer!)).toBe(5);
  });
});

describe('ThemeProvider never writes to its base theme', () => {
  /** Freezes the theme of the provider above it before the providers below compute theirs. */
  const FreezeTheme = ({ children }: { children: React.ReactNode }) => {
    deepFreeze(useTheme());
    return <>{children}</>;
  };

  const customizations: [string, ProviderOptions][] = [
    ['themeDefaults', { themeDefaults: { button: { main: { lg: true, filled: true } }, badge: { success: true } } }],
    ['extraClasses', { extraClasses: { button: { main: { primary: 'btn-extra' } }, card: { main: { md: 'card-extra' } } } }],
    ['theme', { theme: { button: { main: { defaults: { danger: true }, base: 'vane-button custom-base' } } } }],
    ['themeOverride', {
      themeOverride: (theme) => {
        theme.button.main.defaults = { ...theme.button.main.defaults, pill: true };
        theme.button.main.base += ' override-base';
        theme.card.main.extraClasses.primary = 'override-extra';
        return theme;
      },
    }],
    ['all four', {
      theme: { button: { main: { defaults: { danger: true } } } },
      themeOverride: (theme) => {
        theme.button.main.base += ' override-base';
        return theme;
      },
      themeDefaults: { button: { main: { lg: true } } },
      extraClasses: { button: { main: { lg: 'lg-extra' } } },
    }],
  ];

  it.each(customizations)('%s on a root provider leaves the frozen defaultTheme untouched', (_name, options) => {
    const snapshot = JSON.stringify(defaultTheme.button.main.defaults) + defaultTheme.button.main.base;
    const { container } = render(
      <ThemeProvider {...options}><Button>Go</Button><Card>Card</Card></ThemeProvider>
    );
    expect(container.querySelector('.vane-button')).toBeInTheDocument();
    expect(JSON.stringify(defaultTheme.button.main.defaults) + defaultTheme.button.main.base).toBe(snapshot);
    expect(defaultTheme.button.main.extraClasses).toEqual({});
    expect(defaultTheme.card.main.extraClasses).toEqual({});
  });

  it.each(customizations)('%s in a nested provider leaves the frozen parent theme untouched', (_name, options) => {
    const { container } = render(
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }} extraClasses={{ button: { main: { filled: 'parent-extra' } } }}>
        <FreezeTheme>
          <ThemeProvider {...options}><Button>Go</Button></ThemeProvider>
          <ThemeProvider {...options} mergeStrategy="replace"><Button>Go</Button></ThemeProvider>
        </FreezeTheme>
        <Button data-testid="parent-button">Parent</Button>
      </ThemeProvider>
    );
    // the parent's own subtree still renders its own customization
    const parentButton = container.querySelector('[data-testid="parent-button"]');
    expect(parentButton).toHaveAttribute('data-variant', 'filled');
    expect(parentButton).toHaveClass('parent-extra');
    expect(parentButton).not.toHaveClass('btn-extra', 'lg-extra', 'override-base', 'custom-base');
    expect(parentButton).toHaveAttribute('data-size', 'sm');
  });

  it('a themeOverride callback still receives a private, writable copy', () => {
    let received: ThemeProps | null = null;
    let parent: ThemeProps | null = null;
    const ParentProbe = ({ children }: { children: React.ReactNode }) => {
      parent = deepFreeze(useTheme());
      return <>{children}</>;
    };
    const theme = captureTheme(probe => (
      <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
        <ParentProbe>
          <ThemeProvider themeOverride={(t) => {
            received = t;
            t.button.main.themes.size.px.base = 'px-override';
            return t;
          }}>
            {probe}
          </ThemeProvider>
        </ParentProbe>
      </ThemeProvider>
    ));

    expect(theme).toBe(received);
    expect(Object.isFrozen(received)).toBe(false);
    // nothing in the callback's tree is shared with the parent, mapper instances included
    const parentNodes = collectNodes(parent);
    let shared = 0;
    collectNodes(received).forEach(node => { if (parentNodes.has(node) && !('$$typeof' in node)) shared++; });
    expect(shared).toBe(0);
    expect(parent!.button.main.themes.size.px.base).not.toBe('px-override');
  });
});

// The previous algorithm, kept here as the reference: clone the whole base tree, then
// merge and patch the clone in place.
function referenceTheme(base: ThemeProps, options: ProviderOptions): ThemeProps {
  const applyInPlace = (
    themeNode: unknown,
    customNode: unknown,
    slot: 'defaults' | 'extraClasses',
  ): void => {
    if (!isObjectLike(themeNode) || !isObjectLike(customNode)) return;
    if (slot in themeNode && isObjectLike(themeNode[slot]) && !(slot in customNode)) {
      themeNode[slot] = slot === 'defaults'
        ? mergeDefaults(themeNode[slot] as Record<string, boolean>, customNode as Record<string, boolean>)
        : { ...(themeNode[slot] as AnyNode), ...customNode };
      return;
    }
    for (const key in customNode) {
      if (key in themeNode && isObjectLike(themeNode[key]) && isObjectLike(customNode[key])) {
        applyInPlace(themeNode[key], customNode[key], slot);
      }
    }
  };

  let theme = options.theme ? deepMerge(deepClone(base), options.theme) : deepClone(base);
  if (typeof options.themeOverride === 'function') theme = options.themeOverride(deepClone(theme));
  if (options.themeDefaults !== undefined) applyInPlace(theme, options.themeDefaults, 'defaults');
  if (options.extraClasses !== undefined) applyInPlace(theme, options.extraClasses, 'extraClasses');
  return theme;
}

describe('ThemeProvider result equals the whole-tree clone', () => {
  const scenarios: [string, ProviderOptions][] = [
    ['themeDefaults on a sub-themed component', { themeDefaults: { button: { main: { filled: true, lg: true } } } }],
    ['themeDefaults on flat components', { themeDefaults: { badge: { success: true }, text: { lg: true }, row: { noGap: true } } }],
    ['themeDefaults with composable side keys', { themeDefaults: { card: { main: { borderT: true, noPadding: true } } } }],
    ['themeDefaults with a false value', { themeDefaults: { card: { main: { border: false } } } }],
    ['extraClasses', { extraClasses: { button: { main: { primary: 'a b', filled: 'c' } }, badge: { pill: 'd' } } }],
    ['theme with defaults, base and a mapper override', {
      theme: {
        button: { main: { defaults: { danger: true }, base: 'vane-button x', themes: { size: { px: { base: 'px-9' } } } } },
        chip: { extraClasses: { secondary: 'chip-x' } },
      },
    }],
    ['themeOverride mutating in place', {
      themeOverride: (theme) => {
        theme.button.main.defaults = { ...theme.button.main.defaults, pill: true };
        theme.card.main.base += ' card-x';
        theme.badge.themes.size.px.base = 'px-1';
        return theme;
      },
    }],
    ['themeOverride returning a new root', {
      themeOverride: (theme) => ({ ...theme, badge: theme.chip as unknown as ThemeProps['badge'] }),
    }],
    ['theme, themeOverride, themeDefaults and extraClasses together', {
      theme: { button: { main: { defaults: { danger: true } } } },
      themeOverride: (theme) => {
        theme.button.main.base += ' y';
        return theme;
      },
      themeDefaults: { button: { main: { lg: true } }, menu: { item: { md: true } } },
      extraClasses: { button: { main: { lg: 'lg-x' } } },
    }],
    ['customizations that match no node', { themeDefaults: { button: { filled: true } } as never, extraClasses: { nope: { a: 'b' } } as never }],
    ['an empty themeDefaults object', { themeDefaults: {} }],
  ];

  let warn: jest.SpyInstance;
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => warn.mockRestore());

  it.each(scenarios)('root provider: %s', (_name, options) => {
    const actual = captureTheme(probe => <ThemeProvider {...options}>{probe}</ThemeProvider>);
    expect(actual).toStrictEqual(referenceTheme(defaultTheme, options));
  });

  const parentOptions: ProviderOptions = {
    themeDefaults: { button: { main: { filled: true } }, card: { main: { shadow: true } } },
    extraClasses: { button: { main: { filled: 'parent-filled' } } },
  };

  it.each(scenarios)('nested provider (merge): %s', (_name, options) => {
    const actual = captureTheme(probe => (
      <ThemeProvider {...parentOptions}><ThemeProvider {...options}>{probe}</ThemeProvider></ThemeProvider>
    ));
    expect(actual).toStrictEqual(referenceTheme(referenceTheme(defaultTheme, parentOptions), options));
  });

  it.each(scenarios)('nested provider (replace): %s', (_name, options) => {
    const actual = captureTheme(probe => (
      <ThemeProvider {...parentOptions}>
        <ThemeProvider {...options} mergeStrategy="replace">{probe}</ThemeProvider>
      </ThemeProvider>
    ));
    expect(actual).toStrictEqual(referenceTheme(defaultTheme, options));
  });
});
