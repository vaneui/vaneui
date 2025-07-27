import { 
  ComponentKeys,
  ComponentCategoryKey,
} from '../ui/props';

/**
 * Pick the first truthy key from props using a ComponentKeys category name.
 * This function looks up the keys array internally using the category name.
 * Returns the specific key type for the given category.
 */
export function pickFirstTruthyKeyByCategory<T extends ComponentCategoryKey>(
  props: Record<string, any>,
  defaults: Record<string, any>,
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

/**
 * Generic function to extract keys for any component based on its categories
 */
export function extractKeysFromCategories<T extends readonly ComponentCategoryKey[]>(
  props: Record<string, boolean>,
  defaults: Record<string, boolean>,
  categories: T
): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  
  for (const category of categories) {
    const value = pickFirstTruthyKeyByCategory(props, defaults, category);
    result[category] = value;
  }
  
  return result;
}

