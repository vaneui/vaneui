import {
  ComponentKeys,
  ComponentCategoryKey,
} from '../ui/props';

export function pickFirstTruthyKeyByCategory<T extends ComponentCategoryKey>(
  props: Record<string, unknown>,
  defaults: Record<string, unknown>,
  category: T
): typeof ComponentKeys[T][number] | undefined {
  const keys = ComponentKeys[category];

  const falsyKeys: string[] = [];

  for (const k of keys) {
    const p = props[k];
    if (p === true)
      return k as typeof ComponentKeys[T][number];
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k];
    if (d === true && !falsyKeys.includes(k))
      return k as typeof ComponentKeys[T][number];
  }

  return undefined;
}

/** Categories whose side toggles compose (union) instead of being one-of. */
export const MULTI_VALUE_CATEGORIES = new Set<string>(['border', 'margin']);

/**
 * Collect every active key for a composable category (border/margin). Explicit
 * truthy props win over defaults as a set; a `no*` reset (noBorder/noMargin) in
 * the selection overrides all side toggles.
 */
export function collectTruthyKeysByCategory<T extends ComponentCategoryKey>(
  props: Record<string, unknown>,
  defaults: Record<string, unknown>,
  category: T
): string[] {
  const keys = ComponentKeys[category] as readonly string[];

  const explicitOn = keys.filter(k => props[k] === true);
  const selected = explicitOn.length > 0
    ? explicitOn
    : keys.filter(k => defaults[k] === true && props[k] !== false);

  const reset = selected.find(k => k.startsWith('no'));
  return reset ? [reset] : selected;
}

/** Reset key that wins when a multi-value category's truthy keys mix a `no*` reset with side toggles. */
export function resetConflictKey(truthyKeys: readonly string[]): string | undefined {
  const reset = truthyKeys.find(k => k.startsWith('no'));
  return reset && truthyKeys.length > 1 ? reset : undefined;
}
