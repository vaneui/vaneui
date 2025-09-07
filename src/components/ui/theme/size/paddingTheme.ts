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
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const paddingClass = this[extractedKeys?.size ?? 'md'];
      return paddingClass ? [paddingClass] : [];
    }
    return [];
  }
}