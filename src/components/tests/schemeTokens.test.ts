import * as fs from 'fs';
import * as path from 'path';

const tokensCss = fs.readFileSync(path.resolve(__dirname, '../css/tokens.css'), 'utf-8');
const paletteCss = fs.readFileSync(require.resolve('tailwindcss/theme.css'), 'utf-8');

const DARK = [':root[data-theme="dark"]', '[data-theme="dark"]', ':host([data-theme="dark"])'];
const LIGHT = ['[data-theme="light"]:not(:root)', ':host([data-theme="light"])'];

function declarations(block: string): Map<string, string> {
  return new Map([...block.matchAll(/^\s*--([a-z0-9-]+):\s*([^;]+);/gm)].map(m => [m[1], m[2].trim()]));
}

const themeEnd = tokensCss.indexOf('\n}\n');
const themeBlock = tokensCss.slice(tokensCss.indexOf('@theme {'), themeEnd);
const rules = [...tokensCss.slice(themeEnd + 2).matchAll(/^([^\s/*{}][^{}]*?)\s*\{([^{}]*)\n\}/gm)]
  .map(m => ({ selectors: m[1].split(',').map(s => s.trim()), body: m[2] }));
const rule = (selectors: string[]) => rules.find(r => r.selectors.join() === selectors.join());

const themeTokens = declarations(themeBlock);
const palette = declarations(paletteCss);
const resolve = (value?: string) => {
  const ref = value?.match(/^var\(--([a-z0-9-]+)\)$/);
  return ref ? palette.get(ref[1]) : value;
};

describe('dark and light scheme tokens', () => {
  it('keeps light-dark() out of @theme, where compiled builds would resolve it once on :root', () => {
    expect(themeBlock).not.toContain('light-dark(');
  });

  it('pairs each scheme color on every data-theme element, light side equal to @theme', () => {
    const pairs = declarations(rule([...DARK, ...LIGHT])!.body);
    expect(pairs.size).toBeGreaterThan(50);
    for (const [name, value] of pairs) {
      const [, light, dark] = value.match(/^light-dark\((.+), (.+)\)$/) ?? [];
      expect([name, light]).toEqual([name, resolve(themeTokens.get(name))]);
      expect([name, dark]).toEqual([name, expect.not.stringContaining('var(')]);
    }
  });

  it('sets the color scheme and shadow alphas per data-theme, with light alphas equal to @theme', () => {
    const dark = rule(DARK)!;
    const light = rule(LIGHT)!;
    expect(dark.body).toContain('color-scheme: dark;');
    expect(light.body).toContain('color-scheme: light;');
    expect([...declarations(dark.body).keys()]).toEqual(['shadow-alpha', 'shadow-alpha-soft']);
    expect(declarations(light.body)).toEqual(new Map([
      ['shadow-alpha', themeTokens.get('shadow-alpha')],
      ['shadow-alpha-soft', themeTokens.get('shadow-alpha-soft')],
    ]));
  });
});
