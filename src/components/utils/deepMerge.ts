import { DeepPartial } from "./deepPartial";

const isObject = (item: unknown): item is Record<string, any> => {
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

      if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = deepMerge(
          targetValue,
          sourceValue as DeepPartial<typeof targetValue>
        );
      } else {
        output[key] = sourceValue;
      }
    }
  }

  return output;
};

/**
 * Deep merges two objects of the same type.
 * Handles both simple objects and class instances.
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns A new object with merged properties
 */
export function deepMerge1<T extends object>(target: T, source?: DeepPartial<T> | Partial<T>): T {
  // If source is undefined or null, return a copy of target
  if (!source) {
    return Array.isArray(target)
      ? [...target] as unknown as T
      : {...target};
  }

  // Create a new object to avoid mutating the original
  const result: any = Array.isArray(target)
    ? [...target]
    : {...target};

  // Iterate through source properties
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      // Skip undefined values
      if (sourceValue === undefined) {
        continue;
      }

      // Handle null values
      if (sourceValue === null) {
        result[key] = null;
        continue;
      }

      // If both values are objects (and not null), deep merge them
      if (
        typeof sourceValue === 'object' &&
        typeof targetValue === 'object' &&
        targetValue !== null
      ) {
        // Handle arrays - replace instead of merge
        if (Array.isArray(sourceValue)) {
          result[key] = [...sourceValue];
        }
        // Handle class instances by checking constructor
        else if (
          targetValue.constructor &&
          targetValue.constructor !== Object &&
          typeof targetValue.constructor === 'function'
        ) {
          // If it's a class instance, create a new instance with merged properties
          const Constructor = targetValue.constructor as new (arg: any) => any;
          result[key] = new Constructor(deepMerge(targetValue, sourceValue));
        }
        // Handle objects with all boolean values (like fontWeight and size in TypographySettings)
        else if (
          isAllBooleanValues(targetValue) &&
          isAllBooleanValues(sourceValue) &&
          hasTrueValue(sourceValue)
        ) {
          // Create a new object with all values set to false
          const newObj: any = {};
          for (const k in targetValue) {
            newObj[k] = false;
          }
          // Then apply the source values
          for (const k in sourceValue) {
            newObj[k] = sourceValue[k];
          }
          result[key] = newObj;
        } else {
          // For plain objects, just deep merge
          result[key] = deepMerge(targetValue, sourceValue);
        }
      } else {
        // For primitive values, just assign
        result[key] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * Checks if all values in an object are booleans
 * @param obj The object to check
 * @returns True if all values are booleans, false otherwise
 */
function isAllBooleanValues(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (typeof obj[key] !== 'boolean') {
      return false;
    }
  }

  return Object.keys(obj).length > 0;
}

/**
 * Checks if an object has at least one true value
 * @param obj The object to check
 * @returns True if the object has at least one true value, false otherwise
 */
function hasTrueValue(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }

  return false;
}
