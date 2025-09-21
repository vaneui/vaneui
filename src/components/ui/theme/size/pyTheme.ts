import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import { layoutPaddingClasses } from "../../classes/layoutClasses";
import type { CategoryProps } from "../../props";

/** Vertical padding theme - controls top and bottom padding */
export class PyTheme extends PaddingTheme {
  constructor(sizeMap?: Record<SizeKey, string>) {
    super(sizeMap);
    // Override with PyTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = layoutPaddingClasses[key];
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const paddingClass = this[extractedKeys?.size ?? 'md'];
      return paddingClass ? [paddingClass, "py-(--py)"] : [];
    }
    return [];
  }
}
