function pickFirstKeyOptional<
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
