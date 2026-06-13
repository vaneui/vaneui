import fs from 'node:fs';
import {
  SCOPE,
  stripComments,
  splitSelectorList,
  scopeSelector,
  scopeSelectorList,
  transform,
  verifyScopedOutput,
} from '../../../scripts/scopePreflightTransform';

/**
 * Pins the scoped-preflight transform (scripts/scopePreflightTransform.ts).
 *
 * History: the original implementation split selector lists on raw `,`,
 * which lands inside functional pseudo-classes — Tailwind's preflight
 * contains `input:where([type='button'], [type='reset'], [type='submit'])`
 * and `:where(select:is([multiple], [size])) optgroup` — and shipped a
 * mutated (luckily still equivalent) selector in dist/ui.css. The preflight
 * dependency floats, and ONE invalid selector drops its whole rule silently,
 * so the transform must be structurally correct, not accidentally correct.
 */
describe('scopePreflightTransform', () => {
  describe('splitSelectorList', () => {
    it('splits a plain multi-selector list', () => {
      expect(splitSelectorList('h1, h2,h3')).toEqual(['h1', 'h2', 'h3']);
    });

    it('does not split on commas inside functional pseudo-classes', () => {
      expect(
        splitSelectorList("input:where([type='button'], [type='reset'], [type='submit'])"),
      ).toEqual(["input:where([type='button'], [type='reset'], [type='submit'])"]);
    });

    it('does not split on commas inside quoted attribute values', () => {
      expect(splitSelectorList("[title='a,b'], p")).toEqual(["[title='a,b']", 'p']);
      expect(splitSelectorList('[title="a,b"]')).toEqual(['[title="a,b"]']);
    });

    it('does not split on commas inside brackets', () => {
      expect(splitSelectorList('a[data-x=","], b')).toEqual(['a[data-x=","]', 'b']);
    });
  });

  describe('scopeSelector', () => {
    it('suffixes a simple selector with the scope', () => {
      expect(scopeSelector('p')).toBe(`p${SCOPE}`);
    });

    it('keeps pseudo-elements rightmost', () => {
      expect(scopeSelector('input::placeholder')).toBe(`input${SCOPE}::placeholder`);
      expect(scopeSelector('::before')).toBe(`${SCOPE}::before`);
    });

    it('ignores :: inside parens when placing the scope', () => {
      expect(scopeSelector(':where(p)::before')).toBe(`:where(p)${SCOPE}::before`);
    });

    it('places the scope OUTSIDE all parens for the real preflight selectors', () => {
      expect(scopeSelector("input:where([type='button'], [type='reset'], [type='submit'])")).toBe(
        `input:where([type='button'], [type='reset'], [type='submit'])${SCOPE}`,
      );
      expect(scopeSelector(':where(select:is([multiple], [size])) optgroup')).toBe(
        `:where(select:is([multiple], [size])) optgroup${SCOPE}`,
      );
    });
  });

  describe('scopeSelectorList', () => {
    it('suffixes every top-level selector exactly once', () => {
      expect(scopeSelectorList('h1, h2')).toBe(`h1${SCOPE},\nh2${SCOPE}`);
    });
  });

  describe('transform over the installed Tailwind preflight (property test)', () => {
    const preflightPath = require.resolve('tailwindcss/preflight.css');
    const source = stripComments(fs.readFileSync(preflightPath, 'utf8'));
    const scoped = transform(source);

    it('passes the integrity guard (balance, scope at depth 0, counts preserved)', () => {
      expect(() => verifyScopedOutput(source, scoped)).not.toThrow();
    });

    it('never places the scope inside parentheses anywhere in the output', () => {
      // Walk the output character by character tracking paren depth; the
      // scope string must only ever START at depth 0.
      let depth = 0;
      for (let i = 0; i < scoped.length; i++) {
        if (scoped[i] === '(') depth++;
        else if (scoped[i] === ')') depth--;
        if (depth > 0 && scoped.startsWith(SCOPE, i + 1)) {
          throw new Error(`scope found inside parens at index ${i + 1}: ...${scoped.slice(Math.max(0, i - 40), i + 60)}...`);
        }
      }
    });

    it('does not reproduce the historical mutated shape (scope injected into :is())', () => {
      // The original bug emitted `:where(select:is([multiple]:where(SCOPE),[size]))...`
      expect(scoped).not.toContain(`[multiple]${SCOPE}`);
      expect(scoped).not.toContain(`:is([multiple]:where(`);
    });

    it('scopes the two known tricky preflight rules correctly when present', () => {
      // Guarded: if a future preflight drops these selectors the assertions
      // self-skip rather than pinning Tailwind's content.
      if (source.includes(':where(select:is([multiple], [size])) optgroup')) {
        expect(scoped).toContain(`:where(select:is([multiple], [size])) optgroup${SCOPE}`);
      }
      if (source.includes("[type='button'], [type='reset'], [type='submit']")) {
        expect(scoped).toContain(`[type='submit'])${SCOPE}`);
      }
    });
  });

  describe('verifyScopedOutput (the guard itself fails loudly)', () => {
    it('throws when a selector was dropped', () => {
      const input = 'h1, h2 { margin: 0; }';
      const bad = `h1${SCOPE} { margin: 0; }`;
      expect(() => verifyScopedOutput(input, bad)).toThrow(/integrity violation/);
    });

    it('throws when the scope lands inside parens', () => {
      const input = ':where(a, b) { margin: 0; }';
      const bad = `:where(a${SCOPE}, b) { margin: 0; }`;
      expect(() => verifyScopedOutput(input, bad)).toThrow(/integrity violation/);
    });

    it('throws on unbalanced parens', () => {
      const input = 'p { margin: 0; }';
      const bad = `p:where(${SCOPE} { margin: 0; }`;
      expect(() => verifyScopedOutput(input, bad)).toThrow(/integrity violation/);
    });
  });

  describe('at-rule bodies and string-in-value edge cases (regression)', () => {
    it('does NOT scope keyframe step selectors inside @keyframes', () => {
      const out = transform('@keyframes spin {\n  from { opacity: 0; }\n  50%, 100% { opacity: 1; }\n}\n');
      expect(out).toContain('@keyframes spin');
      expect(out).not.toContain(`from${SCOPE}`);
      expect(out).not.toContain(`50%${SCOPE}`);
      expect(out).not.toContain(`100%${SCOPE}`);
      // step selectors are copied through verbatim
      expect(out).toContain('from {');
    });

    it('does NOT scope vendor-prefixed @-webkit-keyframes steps', () => {
      const out = transform('@-webkit-keyframes spin { to { opacity: 1; } }');
      expect(out).not.toContain(`to${SCOPE}`);
    });

    it('keeps the rule after a block-less @layer statement scoped', () => {
      const out = transform('@layer theme, base, components, utilities;\nh1 { margin: 0; }');
      expect(out).toContain('@layer theme, base, components, utilities;');
      expect(out).toContain(`h1${SCOPE}`);
    });

    it('does not glue @charset / @import statement at-rules to the next rule', () => {
      const out = transform('@charset "UTF-8";\n@import "x.css";\nh1 { margin: 0; }');
      expect(out).toContain('@charset "UTF-8";');
      expect(out).toContain('@import "x.css";');
      expect(out).toContain(`h1${SCOPE}`);
      // statement at-rules have no selector, so the scope appears only on h1
      expect(out.split(SCOPE).length - 1).toBe(1);
    });

    it('scopes style rules inside @media and preserves the at-rule prelude', () => {
      const css = '@media (min-width: 600px) { h1, h2 { margin: 0; } }';
      const out = transform(css);
      expect(out).toContain('@media (min-width: 600px)');
      expect(out).toContain(`h1${SCOPE}`);
      expect(out).toContain(`h2${SCOPE}`);
      expect(() => verifyScopedOutput(css, out)).not.toThrow();
    });

    it('passes the @supports prelude through and scopes its inner rule', () => {
      const css = '@supports (color: red) { ::placeholder { color: red; } }';
      const out = transform(css);
      expect(out).toContain('@supports (color: red)');
      expect(out).toContain(`${SCOPE}::placeholder`);
      expect(() => verifyScopedOutput(css, out)).not.toThrow();
    });

    it('does not desync rule boundaries on a brace inside a declaration string', () => {
      const css = `a { content: "}"; color: red; }\nb { color: blue; }`;
      const out = transform(css);
      expect(out).toContain(`a${SCOPE}`);
      expect(out).toContain(`b${SCOPE}`);
      // the declaration body (including the brace-in-string) survives intact
      expect(out).toContain('content: "}"');
      expect(out).toContain('color: red');
      // exactly two rules scoped; the scope never lands inside a declaration body
      expect(out.split(SCOPE).length - 1).toBe(2);
      expect(() => verifyScopedOutput(css, out)).not.toThrow();
    });
  });
});
