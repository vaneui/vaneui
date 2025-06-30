function pickFirstTruthyKeyOptional<
  P extends object,
  K extends keyof P
>(
  collection: P,
  keys: readonly K[]
): K | undefined {
  for (const k of keys) {
    if (collection[k] === true)
      return k;
  }
  return undefined;
}

/**
 * Pick the first truthy key from props, then from defaults, then fallback.
 */
export function pickFirstTruthyKey<P, K extends keyof P>(
  props: Partial<P>,
  defaults: Partial<P>,
  keys: readonly K[]
): K | undefined {
  // first check explicit usage in props
  const explicit = pickFirstTruthyKeyOptional(props, keys);
  if (explicit) return explicit;

  // then check component‐level defaults
  const def = pickFirstTruthyKeyOptional(defaults, keys);
  if (def) return def;

  return undefined;
}
