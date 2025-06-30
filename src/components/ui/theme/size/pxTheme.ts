import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";


export interface PxTheme extends Record<PaddingKey, string | Record<SizeKey, string>> {
}

export class PxTheme extends BaseTheme {
  public static readonly defaultClasses: Record<PaddingKey, string | Record<SizeKey, string>> = {
    padding: {
      xs: "px-2",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-10"
    },
    noPadding: "px-0"
  };

  constructor(initial?: Partial<Record<PaddingKey, string | Record<SizeKey, string>>>) {
    super();
    PADDING_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? PxTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const size = pickFirstTruthyKey(props, defaults, SIZE_KEYS) || 'md';
    const key = pickFirstTruthyKey(props, defaults, PADDING_KEYS) || 'noPadding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}