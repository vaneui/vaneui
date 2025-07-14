import { BaseTheme } from "../common/baseTheme";
import { SIZE_KEYS, SizeKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

export interface SizeTheme extends Record<SizeKey, string> {}

export class SizeTheme extends BaseTheme {
  public static readonly defaultClasses: Record<SizeKey, string> = {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  };

  constructor(initial?: Partial<Record<SizeKey, string>>) {
    super();
    SIZE_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? SizeTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS);
    return [this[size ?? 'md'] || ''];
  }
}
