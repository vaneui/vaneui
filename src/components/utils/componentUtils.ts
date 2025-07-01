/**
 * Pick the first truthy key from props, then from defaults, then undefined.
 */
export function pickFirstTruthyKey<P, K extends keyof P>(
  props: Partial<P>,
  defaults: Partial<P>,
  keys: readonly K[]
): K | undefined {

  let falsyKeys: K[] = [];

  for (const k of keys) {
    const p = props[k];
    if (p === true)
      return k;
    if (p === false)
      falsyKeys.push(k);
  }

  for (const k of keys) {
    const d = defaults[k];
    if (d === true && !falsyKeys.includes(k))
      return k;
  }

  return undefined;
}
