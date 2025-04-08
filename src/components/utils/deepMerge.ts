/**
 * Deep merges two objects of the same type.
 * Handles both simple objects and class instances.
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns A new object with merged properties
 */
export function deepMerge<T extends object>(target: T, source?: Partial<T>): T {
  // If source is undefined or null, return a copy of target
  if (!source) {
    return Array.isArray(target) 
      ? [...target] as unknown as T 
      : { ...target };
  }

  // Create a new object to avoid mutating the original
  const result: any = Array.isArray(target) 
    ? [...target] 
    : { ...target };

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
