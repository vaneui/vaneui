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
