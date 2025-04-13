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