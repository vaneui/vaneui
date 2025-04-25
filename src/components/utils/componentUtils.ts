export const getFirstTruthyKey = <T extends object>(
  defaultValue: keyof T,
  props: T
): keyof T => {
  const keys = Object.keys(props) as (keyof T)[];
  const activeKeys = keys.filter(key => (props[key] as unknown as boolean));
  if (activeKeys.length > 1) {
    console.warn(
      `Multiple keys are active (${activeKeys.join(", ")}). Using the first one.`
    );
  }
  return activeKeys[0] || defaultValue;
};

export function pickFirst<
  P,
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