import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface PaddingTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PaddingTheme extends BaseTheme {
  public readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: ""
    },
    noPadding: ""
  };

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super();
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? this.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickFirstTruthyKey(props, defaults, PADDING_KEYS) || 'noPadding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}