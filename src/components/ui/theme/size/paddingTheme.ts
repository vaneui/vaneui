import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class PaddingTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small padding - varies by component implementation */
  xs: string = "";
  /** Small padding - varies by component implementation */
  sm: string = "";
  /** Medium padding - varies by component implementation */
  md: string = "";
  /** Large padding - varies by component implementation */
  lg: string = "";
  /** Extra-large padding - varies by component implementation */
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