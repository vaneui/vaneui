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

      // 'defaults' uses mergeDefaults so exclusive groups (size, appearance, ...) are reset correctly
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
      else if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = deepMerge(
          targetValue,
          sourceValue as DeepPartial<typeof targetValue>
        );
      }
      else {
        output[key] = sourceValue;
      }
    }
  }

  return output;
};

// NOTE: deliberately NO visited/identity map — theme nodes shared between
// components (e.g. a mapper tree used by several ComponentThemes) MUST be
// forked per occurrence, because themeOverride callbacks mutate cloned nodes
// in place and rely on per-component isolation.
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

// reverse-lookup built once at module load (key → its exclusive group)
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

  for (const key in overrideDefaults) {
    if (Object.prototype.hasOwnProperty.call(overrideDefaults, key)) {
      const overrideValue = overrideDefaults[key];

      // setting one exclusive-group key to true resets the others to false
      if (overrideValue) {
        const group = findGroup(key);
        if (group) {
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