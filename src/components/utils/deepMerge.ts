import { DeepPartial } from "./deepPartial";
import { ComponentKeys } from "../ui/props";

const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

export const deepMerge = <T extends object>(
  target: T,
  source: DeepPartial<T>
): T => {
  const output = Object.assign(Object.create(Object.getPrototypeOf(target)), target);

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key as keyof typeof source];
      const targetValue = output[key];

      if (sourceValue === undefined) {
        continue;
      }

      // Special case: If the key is 'defaults', use the contextual mergeDefaults function.
      if (
        key === 'defaults' &&
        isObject(targetValue) &&
        isObject(sourceValue)
      ) {
        output[key] = mergeDefaults(
          targetValue as Record<string, boolean>,
          sourceValue as Record<string, boolean>
        );
      }
      // For all other objects, use the standard recursive deep merge.
      else if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = deepMerge(
          targetValue,
          sourceValue as DeepPartial<typeof targetValue>
        );
      }
      // For non-object values, just assign the value from the source.
      else {
        output[key] = sourceValue;
      }
    }
  }

  return output;
};

export const deepClone = <T extends object>(source: T): T => {
  if (Array.isArray(source)) {
    return source.map(item => (isObject(item) ? deepClone(item) : item)) as unknown as T;
  }

  if (!isObject(source)) {
    return source;
  }

  const output = Object.assign(Object.create(Object.getPrototypeOf(source)), source);

  for (const key in output) {
    if (Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = deepClone(output[key]);
    }
  }

  return output;
}

// Precomputed reverse-lookup: key → its exclusive group.
// Built once at module load instead of scanning all ComponentKeys per lookup.
const keyToGroup = new Map<string, readonly string[]>();
for (const group of Object.values(ComponentKeys)) {
  for (const key of group as readonly string[]) {
    keyToGroup.set(key, group as readonly string[]);
  }
}

const findGroup = (key: string) => keyToGroup.get(key);

export const mergeDefaults = (
  baseDefaults: Record<string, boolean>,
  overrideDefaults: Record<string, boolean>
): Record<string, boolean> => {
  const finalDefaults = {...baseDefaults};

  // Iterate over the override keys to apply them.
  for (const key in overrideDefaults) {
    if (Object.prototype.hasOwnProperty.call(overrideDefaults, key)) {
      const overrideValue = overrideDefaults[key];

      // If the override is setting a key to true...
      if (overrideValue) {
        // Find the exclusive group this key belongs to (e.g., SIZE_KEYS).
        const group = findGroup(key);

        // If the key is part of an exclusive group...
        if (group) {
          // ...set all other keys in that group to false.
          group.forEach(groupKey => {
            if (groupKey !== key) {
              finalDefaults[groupKey] = false;
            }
          });
        }
      }

      finalDefaults[key] = overrideValue;
    }
  }

  return finalDefaults;
};