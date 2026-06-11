import { render } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';

// P2-3 bundle decoupling: importing one component must not load the full
// theme registry (defaultTheme), ThemeProvider, or any OTHER component's
// theme modules. The context default is null and every component statically
// imports only its own default theme as the no-provider fallback.
//
// Probe mocks: a jest.mock factory runs ONLY when the mocked module is
// actually required. If the Button import graph (or the render below)
// reaches any of these modules, the factory throws and the test fails with
// the probe message. jest.mock keys on the RESOLVED path, so any import
// specifier reaching these files trips the probe.
jest.mock('../defaultTheme', () => {
  throw new Error('PROBE: the full theme registry (defaultTheme) was loaded by the Button import graph');
});
jest.mock('../ThemeProvider', () => {
  throw new Error('PROBE: ThemeProvider was loaded by the Button import graph');
});
jest.mock('../ui/modal/defaultModalContentTheme', () => {
  throw new Error('PROBE: a Modal theme module was loaded by the Button import graph');
});
jest.mock('../ui/menu/defaultMenuItemTheme', () => {
  throw new Error('PROBE: a Menu theme module was loaded by the Button import graph');
});

describe('bundle decoupling (P2-3)', () => {
  it('renders a standalone Button without the registry, ThemeProvider, or other components\' themes', () => {
    // required inside the test (not imported at top level) so the probe
    // mocks above are registered before the Button graph loads
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Button } = require('../ui/button') as typeof import('../ui/button');

    const { container } = render(<Button primary lg filled>Decoupled</Button>);
    const el = container.firstChild as HTMLElement;

    // the static fallback theme is fully functional without a provider
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveAttribute('data-size', 'lg');
    expect(el).toHaveAttribute('data-appearance', 'primary');
    expect(el).toHaveAttribute('data-variant', 'filled');
    expect(el.className).toContain('vane-button');
  });

  it('renders the loading branch (both button sub-themes) without the registry', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Button } = require('../ui/button') as typeof import('../ui/button');

    const { container } = render(<Button loading>Save</Button>);
    const el = container.firstChild as HTMLElement;

    expect(el).toHaveAttribute('data-loading', 'true');
    expect(el).toHaveAttribute('aria-busy', 'true');
    // spinner sub-theme resolved via its own static fallback
    expect(el.querySelector('[data-vane-type]')).not.toBeNull();
  });

  // Durable source-level guard: themeContext.tsx is the module every
  // component imports for useTheme — it must never grow a value import. A
  // single `export { ThemeProvider } from './ThemeProvider'` line would
  // silently re-couple every component to the full registry.
  it('themeContext.tsx contains no value imports or value re-exports', () => {
    const source = readFileSync(join(__dirname, '..', 'themeContext.tsx'), 'utf8');

    // no module edge to the registry or the provider, in any form
    expect(source).not.toMatch(/from\s+['"]\.\/defaultTheme['"]/);
    expect(source).not.toMatch(/from\s+['"]\.\/ThemeProvider['"]/);

    // every `import ... from` is either type-only or from react
    const valueImports = [...source.matchAll(/import\s+(?!type\b)[^;]*?from\s+['"]([^'"]+)['"]/g)]
      .map(m => m[1]);
    expect(valueImports).toEqual(['react']);

    // no value re-exports at all (type re-exports are erased at runtime)
    expect(source).not.toMatch(/export\s+\{[^}]*\}\s+from/);
  });
});
