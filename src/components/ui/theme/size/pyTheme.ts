import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import type { CategoryProps } from "../../props";

/** Vertical padding theme - controls top and bottom padding */
export class PyTheme extends PaddingTheme {
  private isUIComponent?: boolean;

  constructor(sizeMap?: Record<SizeKey, string>, isUIComponent = false) {
    super(sizeMap);
    this.isUIComponent = isUIComponent;
    // Override with PyTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = {
          xs: "[--py-unit:2]",
          sm: "[--py-unit:3]",
          md: "[--py-unit:4]",
          lg: "[--py-unit:5]",
          xl: "[--py-unit:6]",
        }[key];
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const paddingClass = this[extractedKeys?.size ?? 'md'];
      if (!paddingClass) return [];
      
      // Use UI or layout CSS variables based on component type
      const cssVar = this.isUIComponent ? "py-(--ui-py)" : "py-(--py)";
      return [paddingClass, cssVar];
    }
    return [];
  }

  static createForUI(): PyTheme {
    return new PyTheme({
      xs: "[--py-unit:1]",
      sm: "[--py-unit:1.5]",
      md: "[--py-unit:2]",
      lg: "[--py-unit:2.5]",
      xl: "[--py-unit:3]",
    }, true);
  }
}
