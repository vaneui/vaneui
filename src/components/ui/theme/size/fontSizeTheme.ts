import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class FontSizeTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small font size - text-xs (0.75rem = 6 * 0.125rem) */
  xs: string = "[--fs-unit:6]";
  /** Small font size - text-sm (0.875rem = 7 * 0.125rem) */
  sm: string = "[--fs-unit:7]";
  /** Medium font size - text-base (1rem = 8 * 0.125rem) */
  md: string = "[--fs-unit:8]";
  /** Large font size - text-lg (1.125rem = 9 * 0.125rem) */
  lg: string = "[--fs-unit:9]";
  /** Extra-large font size - text-xl (1.25rem = 10 * 0.125rem) */
  xl: string = "[--fs-unit:10]";

  constructor(customMapping?: Record<SizeKey, string>) {
    super();
    if (customMapping) {
      this.xs = customMapping.xs || this.xs;
      this.sm = customMapping.sm || this.sm;
      this.md = customMapping.md || this.md;
      this.lg = customMapping.lg || this.lg;
      this.xl = customMapping.xl || this.xl;
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.size) {
      const fsUnitClass = this[extractedKeys.size];
      return fsUnitClass ? [fsUnitClass, "text-(length:--fs)"] : [];
    }
    return [this.md, "text-(length:--fs)"];
  }

  // Static factory methods for different text size ranges
  static createForPageTitle(): FontSizeTheme {
    return new FontSizeTheme({
      xs: "[--fs-unit:15] max-laptop:[--fs-unit:12] max-tablet:[--fs-unit:9]", // text-3xl: 1.875rem = 15 * 0.125rem
      sm: "[--fs-unit:18] max-laptop:[--fs-unit:15] max-tablet:[--fs-unit:12]", // text-4xl: 2.25rem = 18 * 0.125rem
      md: "[--fs-unit:24] max-laptop:[--fs-unit:21] max-tablet:[--fs-unit:18]", // text-5xl: 3rem = 24 * 0.125rem
      lg: "[--fs-unit:30] max-laptop:[--fs-unit:27] max-tablet:[--fs-unit:24]", // text-6xl: 3.75rem = 30 * 0.125rem
      xl: "[--fs-unit:36] max-laptop:[--fs-unit:33] max-tablet:[--fs-unit:30]"  // text-7xl: 4.5rem = 36 * 0.125rem
    });
  }

  static createForSectionTitle(): FontSizeTheme {
    return new FontSizeTheme({
      xs: "[--fs-unit:12] max-laptop:[--fs-unit:10] max-tablet:[--fs-unit:8]", // text-2xl: 1.5rem = 12 * 0.125rem
      sm: "[--fs-unit:15] max-laptop:[--fs-unit:13] max-tablet:[--fs-unit:11]", // text-3xl: 1.875rem = 15 * 0.125rem
      md: "[--fs-unit:18] max-laptop:[--fs-unit:16] max-tablet:[--fs-unit:14]", // text-4xl: 2.25rem = 18 * 0.125rem
      lg: "[--fs-unit:24] max-laptop:[--fs-unit:22] max-tablet:[--fs-unit:20]", // text-5xl: 3rem = 24 * 0.125rem
      xl: "[--fs-unit:30] max-laptop:[--fs-unit:28] max-tablet:[--fs-unit:26]"  // text-6xl: 3.75rem = 30 * 0.125rem
    });
  }

  static createForTitle(): FontSizeTheme {
    return new FontSizeTheme({
      xs: "[--fs-unit:9]  max-laptop:[--fs-unit:8]  max-tablet:[--fs-unit:7]",  // text-lg: 1.125rem = 9 * 0.125rem
      sm: "[--fs-unit:10] max-laptop:[--fs-unit:9]  max-tablet:[--fs-unit:8]",  // text-xl: 1.25rem = 10 * 0.125rem
      md: "[--fs-unit:12] max-laptop:[--fs-unit:11] max-tablet:[--fs-unit:10]", // text-2xl: 1.5rem = 12 * 0.125rem
      lg: "[--fs-unit:15] max-laptop:[--fs-unit:14] max-tablet:[--fs-unit:13]", // text-3xl: 1.875rem = 15 * 0.125rem
      xl: "[--fs-unit:18] max-laptop:[--fs-unit:17] max-tablet:[--fs-unit:16]"  // text-4xl: 2.25rem = 18 * 0.125rem
    });
  }
}