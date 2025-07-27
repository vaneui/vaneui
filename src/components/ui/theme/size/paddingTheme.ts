import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.padding.forEach((key) => {
      this[key as PaddingKey] = initial?.[key as PaddingKey] ?? this.defaultClasses[key as PaddingKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = (extractedKeys?.size as SizeKey) ?? 'md';
    const key = (extractedKeys?.padding as PaddingKey) ?? 'padding';

    return [typeof this[key] === 'string' ? this[key] : (this[key] as Record<SizeKey, string>)[size]];
  }
}