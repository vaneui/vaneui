import { SizeKey, SIZE_KEYS, NO_PADDING_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";
import { pyClasses } from "../../classes/spacingClasses";

export interface PyTheme extends Record<SizeKey, string> {}

export class PyTheme extends BaseTheme {
  public static readonly defaultClasses: Record<SizeKey, string> = pyClasses;

  constructor(initialConfig?: Partial<Record<SizeKey, string>>) {
    super();
    SIZE_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? PyTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const noPadding = pickKey(props, defaults, NO_PADDING_KEYS);
    if (noPadding) {
      return ['py-0'];
    }

    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    return [this[size ?? 'md']];
  }

  public cloneWithOverrides(overrides: Partial<Record<SizeKey, string>>): PyTheme {
    const currentValues: Partial<Record<SizeKey, string>> = {};
    SIZE_KEYS.forEach(key => {
      currentValues[key] = this[key];
    });
    const newInitialConfig = { ...currentValues, ...overrides };
    return new PyTheme(newInitialConfig);
  }
}
