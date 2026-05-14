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
