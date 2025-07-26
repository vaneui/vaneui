import { SizeKey, SIZE_KEYS, PADDING_KEYS, PaddingKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const key = (extractedKeys?.padding as PaddingKey) ?? 'padding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}