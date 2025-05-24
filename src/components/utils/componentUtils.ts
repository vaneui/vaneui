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
 * Pick the first truthy key from props, then from defaults, then fallback.
 */
export function pickKey<P, K extends keyof P>(
  props: Partial<P>,
  defaults: Partial<P>,
  keys: readonly K[],
  fallback?: K
): K | undefined {
  // 1) explicit user prop
  const explicit = pickFirstKeyOptional(props, keys);
  if (explicit) return explicit;

  // 2) component‐level default
  const def = pickFirstKeyOptional(defaults, keys);
  if (def) return def;

  // 3) built‐in fallback
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
