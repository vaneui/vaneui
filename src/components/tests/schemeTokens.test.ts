import * as fs from 'fs';
import * as path from 'path';

// a Windows checkout with core.autocrlf has CRLF line endings; the searches below look for "\n"
const tokensCss = fs.readFileSync(path.resolve(__dirname, '../css/tokens.css'), 'utf-8').replace(/\r\n/g, '\n');
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

/**
 * Text on a fill has to keep WCAG AA contrast (4.5:1) against that fill, in both schemes.
 * 1.6.1 shipped a light 100-level tint on the accent and danger fills and gray-200 on the
 * tertiary fill, which sat at 3.8 to 3.9:1.
 */
describe('filled text contrast', () => {
  const APPEARANCES = ['primary', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info'];
  const pairs = declarations(rule([...DARK, ...LIGHT])!.body);

  /** A token's color in one scheme: its light-dark() side when it is paired, else its @theme value. */
  function schemeColor(name: string, scheme: 'light' | 'dark'): string {
    const [, light, dark] = pairs.get(name)?.match(/^light-dark\((.+), (.+)\)$/) ?? [];
    const value = scheme === 'dark' && dark ? dark : light ?? resolve(themeTokens.get(name));
    if (!value) throw new Error(`no value for --${name}`);
    return value;
  }

  /** Linear sRGB channels of a palette color (`#fff` or `oklch(L% C H)`), clipped to the gamut. */
  function linearRgb(color: string): number[] {
    if (color === '#fff') return [1, 1, 1];
    const match = color.match(/^oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)$/);
    if (!match) throw new Error(`unsupported color: ${color}`);
    const lightness = Number(match[1]) / 100;
    const chroma = Number(match[2]);
    const hue = Number(match[3]) * Math.PI / 180;
    const a = chroma * Math.cos(hue);
    const b = chroma * Math.sin(hue);
    const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (lightness - 0.0894841775 * a - 1.2914855480 * b) ** 3;
    return [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    ].map(channel => Math.min(1, Math.max(0, channel)));
  }

  function contrast(first: string, second: string): number {
    const luminance = (color: string) => {
      const [r, g, b] = linearRgb(color);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const [high, low] = [luminance(first), luminance(second)].sort((x, y) => y - x);
    return (high + 0.05) / (low + 0.05);
  }

  it('measures contrast the way WCAG defines it', () => {
    expect(contrast('#fff', 'oklch(0% 0 0)')).toBeCloseTo(21, 1);
    expect(contrast('#fff', '#fff')).toBe(1);
  });

  it.each(APPEARANCES.flatMap(appearance => [[appearance, 'light'], [appearance, 'dark']] as const))(
    'filled %s text reaches 4.5:1 on its fill in the %s scheme',
    (appearance, scheme) => {
      const text = schemeColor(`color-text-filled-${appearance}`, scheme);
      const fill = schemeColor(`color-bg-filled-${appearance}`, scheme);
      expect(contrast(text, fill)).toBeGreaterThanOrEqual(4.5);
    },
  );
});
