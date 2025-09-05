import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class PaddingTheme extends BaseTheme implements Record<SizeKey, string> {
  xs: string = "";
  sm: string = "";
  md: string = "";
  lg: string = "";
  xl: string = "";

  constructor(initial?: Partial<Record<SizeKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.size.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const padding = extractedKeys?.padding;

    // If padding is true or undefined, apply padding classes based on size
    if (padding === 'padding' || padding === undefined) {
      const paddingClass = this[size];
      return paddingClass ? [paddingClass] : [];
    }

    return [];
  }
}