import fs from 'fs';
import path from 'path';

/**
 * The build prepends 'use client' to every module that imports React at runtime
 * (`useClientPlugin` in rollup.config.mjs). A theme module with JSX gets it too, and a React
 * Server Component that reads `defaultTheme.<node>` (a docs site building its props tables,
 * for example) then gets a client reference instead of the theme. Theme modules keep their
 * JSX in a separate `.tsx` module, the way `avatarFallbackIcon.tsx` does for Avatar.
 *
 * The icon parts below predate the rule. They are parts of a compound theme, never the node
 * a component spreads its own props on.
 */
const ICON_PARTS_WITH_JSX = new Set([
  'ui/button/defaultButtonSpinnerTheme',
  'ui/checkbox/defaultCheckboxCheckTheme',
  'ui/checkbox/defaultCheckboxIndeterminateTheme',
  'ui/input/defaultInputErrorIconTheme',
  'ui/select/defaultSelectChevronTheme',
  'ui/switch/defaultSwitchThumbTheme',
  'ui/radio/defaultRadioDotTheme',
]);

const COMPONENTS_DIR = path.join(__dirname, '..');
const RUNTIME_REACT_IMPORT = /^import\s+(?!type\b)[^;]*\bfrom\s+['"]react(?:\/jsx-runtime)?['"]/m;

function themeModules(): string[] {
  const source = fs.readFileSync(path.join(COMPONENTS_DIR, 'defaultTheme.ts'), 'utf8');
  return [...source.matchAll(/from '\.\/(ui\/[^']+)'/g)].map(match => match[1]);
}

describe('theme modules stay readable from React Server Components', () => {
  const modules = themeModules();

  it('finds the theme modules that defaultTheme imports', () => {
    expect(modules.length).toBeGreaterThan(50);
    expect(modules).toContain('ui/avatar/defaultAvatarTheme');
  });

  it.each(modules.filter(module => !ICON_PARTS_WITH_JSX.has(module)))('%s has no JSX and no runtime React import', module => {
    const base = path.join(COMPONENTS_DIR, module);
    expect(fs.existsSync(`${base}.tsx`)).toBe(false);
    const source = fs.readFileSync(`${base}.ts`, 'utf8');
    expect(source).not.toMatch(RUNTIME_REACT_IMPORT);
  });

  it('keeps the list of older icon parts current', () => {
    for (const module of ICON_PARTS_WITH_JSX) {
      expect(fs.existsSync(path.join(COMPONENTS_DIR, `${module}.tsx`))).toBe(true);
    }
  });
});
