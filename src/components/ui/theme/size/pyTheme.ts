import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface PyTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PyTheme extends BaseTheme {
  public static readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "py-2",
      sm: "py-4",
      md: "py-6",
      lg: "py-8",
      xl: "py-10"
    },
    noPadding: "py-0"
  };

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super();
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? PyTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickFirstTruthyKey(props, defaults, PADDING_KEYS) || 'noPadding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}
