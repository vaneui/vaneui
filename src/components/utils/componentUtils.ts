import { Mode } from "../ui/props/mode";
import { SIZE_KEYS, SizeKey } from "../ui/props/propKeys";

export function pickFirstKeyOptional<
  P extends object,
  K extends keyof P
>(
  props: P,
  keys: readonly K[],
  fallback: K | undefined = undefined,
): K | undefined {
  for (const k of keys) {
    if (props[k]) return k;
  }
  return fallback;
}

export function pickFirstKey<
  P extends object,
  K extends keyof P
>(
  props: P,
  keys: readonly K[],
  fallback: K,
): K {
  for (const k of keys) {
    if (props[k]) return k;
  }
  return fallback;
}

/**
 * Create a size variant with the given size map
 * @param sizeMap Map of sizes to CSS classes
 * @returns Record of sizes with modes
 */
export function makeSizeVariant(
  sizeMap: Record<SizeKey, string>
): Record<SizeKey, Record<Mode, string>> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: sizeMap[size],
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, Record<Mode, string>>);
}
