import { SizeKey, PaddingKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface PaddingTheme extends Record<SizeKey, string> {
}

export class PaddingTheme extends BaseTheme {
  public readonly defaultClasses: Record<SizeKey, string> = {
    xs: "", sm: "", md: "", lg: "", xl: ""
  };

  constructor(initial?: Partial<Record<SizeKey, string>>) {
    super();
    ComponentKeys.size.forEach((key) => {
      this[key as SizeKey] = initial?.[key as SizeKey] ?? this.defaultClasses[key as SizeKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const padding = extractedKeys?.padding;

    // If noPadding is true, return empty array (no padding classes)
    if (padding === 'noPadding') {
      return [];
    }

    // If padding is true or undefined, apply padding classes based on size
    if (padding === 'padding' || padding === undefined) {
      const paddingClass = this[size];
      return paddingClass ? [paddingClass] : [];
    }

    return [];
  }
}