import { ComponentCategories, ComponentKeys, defaultTheme } from '../../index';

/**
 * An appearance is only a palette: it sets the intermediate `--app-*` variables.
 * The variant axis maps those onto `--text-color` / `--bg-color` / `--border-color`,
 * and `data-variant` is only emitted when a variant key was extracted. A component
 * that declares an appearance but resolves no variant therefore renders EVERY
 * appearance identically, and nothing fails loudly: the class list is the same
 * either way, so class-name assertions cannot see it.
 *
 * This shipped twice. Spinner 1.1.0 had no variant category at all; Img 1.1.0 had
 * the category but no variant default, so `<Img border danger>` drew a neutral border.
 */

/** Components that colour through another path and legitimately emit no data-variant. */
const RESOLVES_WITHOUT_VARIANT = new Set([
  // LinkVariantClassMapper consumes --app-text directly, bypassing the variant axis
  'link',
]);

function defaultsFor(key: string): Record<string, unknown> | null {
  const node = (defaultTheme as unknown as Record<string, unknown>)[key];
  if (!node || typeof node !== 'object') return null;
  const n = node as Record<string, unknown>;
  for (const candidate of [n.main, n.content, n.root, n.item, n.input, node]) {
    if (candidate && typeof candidate === 'object' && 'defaults' in candidate) {
      const d = (candidate as { defaults?: Record<string, unknown> }).defaults;
      if (d) return d;
    }
  }
  return null;
}

describe('Appearance resolution', () => {
  const withAppearance = Object.entries(ComponentCategories)
    .filter(([, cats]) => (cats as readonly string[]).includes('appearance'))
    .map(([key, cats]) => [key, cats as readonly string[]] as const);

  it('should find every component that declares an appearance', () => {
    expect(withAppearance.length).toBeGreaterThan(40);
  });

  // The check is "offenders === the documented exception", so both a NEW unresolvable
  // component and a silently-fixed exception fail, forcing an explicit decision.
  it('should leave no component whose appearance cannot resolve to a colour', () => {
    const unresolvable: string[] = [];

    for (const [key, cats] of withAppearance) {
      if (!cats.includes('variant')) {
        unresolvable.push(`${key}: appearance but no variant category`);
        continue;
      }
      const defaults = defaultsFor(key);
      if (!defaults) {
        unresolvable.push(`${key}: no defaults found on defaultTheme.${key}`);
        continue;
      }
      if (!ComponentKeys.variant.some((v) => defaults[v] === true)) {
        unresolvable.push(`${key}: variant category but no variant default`);
      }
    }

    expect(unresolvable.map((entry) => entry.split(':')[0]).sort())
      .toEqual([...RESOLVES_WITHOUT_VARIANT].sort());
  });
});
