import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";

export class SizeTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small size variant */
  xs: string = "";
  /** Small size variant */
  sm: string = "";
  /** Medium size variant (default) */
  md: string = "";
  /** Large size variant */
  lg: string = "";
  /** Extra-large size variant */
  xl: string = "";

  constructor(sizeMap?: Record<SizeKey, string>) {
    super();
    ComponentKeys.size.forEach((key) => {
      this[key] = sizeMap?.[key] ?? "";
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    return size ? [this[size]] : [''];
  }
}
