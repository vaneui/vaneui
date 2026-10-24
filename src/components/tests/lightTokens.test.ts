import * as fs from 'fs';
import * as path from 'path';

const tokensCss = fs.readFileSync(path.resolve(__dirname, '../css/tokens.css'), 'utf-8');
const paletteCss = fs.readFileSync(require.resolve('tailwindcss/theme.css'), 'utf-8');

function declarations(block: string): Map<string, string> {
  return new Map([...block.matchAll(/^\s*--([a-z0-9-]+):\s*([^;]+);/gm)].map(m => [m[1], m[2].trim()]));
}

function ruleBody(selector: string): string {
  const start = tokensCss.indexOf(`\n${selector}`);
  return tokensCss.slice(tokensCss.indexOf('{', start) + 1, tokensCss.indexOf('\n}', start));
}

const themeTokens = declarations(tokensCss.slice(tokensCss.indexOf('@theme {'), tokensCss.indexOf('DARK SCHEME')));
const darkTokens = declarations(ruleBody(':root[data-theme="dark"],'));
const lightTokens = declarations(ruleBody('[data-theme="light"]:not(:root),'));
const palette = declarations(paletteCss);

describe('[data-theme="light"] tokens', () => {
  it('re-declares every token the dark block sets, and nothing else', () => {
    expect(darkTokens.size).toBeGreaterThan(50);
    expect([...lightTokens.keys()].sort()).toEqual([...darkTokens.keys()].sort());
  });

  it('uses the @theme light value of each token, resolved to a literal', () => {
    for (const [name, value] of lightTokens) {
      const themeValue = themeTokens.get(name);
      const ref = themeValue?.match(/^var\(--([a-z0-9-]+)\)$/);
      expect([name, value]).toEqual([name, ref ? palette.get(ref[1]) : themeValue]);
    }
  });
});
