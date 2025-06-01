import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";

export interface SizeTheme extends Record<SizeKey, string> {}

export class SizeTheme extends BaseTheme {
  public static readonly defaultClasses: Record<SizeKey, string> = {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  };

  constructor(initialConfig?: Partial<Record<SizeKey, string>>) {
    super();
    SIZE_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? SizeTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS);
    return [this[size ?? 'md'] || ''];
  }

  public cloneWithOverrides(overrides: Partial<Record<SizeKey, string>>): SizeTheme {
    const currentValues: Partial<Record<SizeKey, string>> = {};
    SIZE_KEYS.forEach(key => {
      currentValues[key] = this[key];
    });
    const newInitialConfig = { ...currentValues, ...overrides };
    return new SizeTheme(newInitialConfig);
  }
}
