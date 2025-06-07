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
