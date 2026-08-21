import { ComponentKeys } from '../ui/props';

// Enforces the prop naming law (see .claude/rules/naming-law.md). Guards against
// the `light`-means-font-weight class of mistake by requiring every category to
// be classified, and every prefixed category's values to carry their prefix.

// Prefixed (Tailwind-utility mirroring): value must start with the prefix (or be
// the single `no*` negation). The prefix, not the full class, is enforced — so
// logical/suffix divergences (borderStart -> border-s, alignSelf* -> self-*) pass.
const PREFIXED_CATEGORIES: Record<string, string> = {
  fontWeight: 'font', fontFamily: 'font',
  listStyle: 'list', listPosition: 'list',
  textAlign: 'text', items: 'items', justify: 'justify',
  justifySelf: 'justifySelf', alignSelf: 'alignSelf',
  overflow: 'overflow', cursor: 'cursor', whitespace: 'whitespace',
  objectFit: 'object', wordBreak: 'break', letterSpacing: 'tracking',
  width: 'w', height: 'h', padding: 'padding', margin: 'margin',
  border: 'border', gap: 'gap', shadow: 'shadow', transition: 'transition',
  focusVisible: 'focusVisible', ring: 'insetRing', blur: 'backdropBlur',
  pointerEvents: 'pointerEvents', wrap: 'flex', flex: 'flex', placement: 'place',
};

// Semantic (abstracted above Tailwind): allow-listed, not prefix-checked.
const SEMANTIC_CATEGORIES = new Set<string>([
  'appearance', 'variant', 'shape', 'size', 'control',
  'display', 'position', 'flexDirection', 'fontStyle', 'textDecoration',
  'textTransform', 'truncate',
  'breakpoint', 'hide', 'orientation', 'responsiveSizing',
  'validity', 'constrainWidth', 'clampHeight',
  'transparent', 'disabled', 'readOnly', 'shrink',
  'inheritSize', 'inheritColor', 'inheritBg', 'inheritBorder',
]);

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

describe('Prop naming law', () => {
  const categories = Object.keys(ComponentKeys);

  it('classifies every category as prefixed or semantic (new category must be classified)', () => {
    const unclassified = categories.filter(
      c => !(c in PREFIXED_CATEGORIES) && !SEMANTIC_CATEGORIES.has(c)
    );
    expect(unclassified).toEqual([]);
  });

  it('never classifies a category as both', () => {
    const both = categories.filter(c => c in PREFIXED_CATEGORIES && SEMANTIC_CATEGORIES.has(c));
    expect(both).toEqual([]);
  });

  it('every value is camelCase (no dropped-prefix hyphen/space)', () => {
    const bad: string[] = [];
    for (const c of categories) {
      for (const v of ComponentKeys[c as keyof typeof ComponentKeys]) {
        if (!/^[a-z][a-zA-Z0-9]*$/.test(v)) bad.push(`${c}.${v}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('prefixed categories keep their CSS-property prefix on every value', () => {
    const violations: string[] = [];
    for (const [c, prefix] of Object.entries(PREFIXED_CATEGORIES)) {
      const negation = 'no' + cap(prefix);
      for (const v of ComponentKeys[c as keyof typeof ComponentKeys]) {
        if (!v.startsWith(prefix) && v !== negation) violations.push(`${c}.${v} (want ${prefix}*)`);
      }
    }
    expect(violations).toEqual([]);
  });
});
