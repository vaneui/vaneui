export function pickFirstKey<
  P extends object,
  K extends keyof P
>(
  props: P,
  keys: readonly K[],
  fallback: K | undefined = undefined,
): K | undefined{
  for (const k of keys) {
    // props[k] is allowed on any P, and truthiness check works
    if (props[k]) return k;
  }
  return fallback;
}

export function omitProps<
  P extends object,
  K extends PropertyKey
>(
  props: P,
  keys: readonly K[]
): Omit<P, Extract<K, keyof P>> {
  const result = { ...props };
  for (const k of keys) {
    if (k in result) {
      delete (result as any)[k];
    }
  }
  return result as Omit<P, Extract<K, keyof P>>;
}
