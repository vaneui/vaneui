import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class LineHeightTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small line height - matches text-xs default line height */
  xs: string = "[--lh-unit:1.333]"; // calc(1 / 0.75) ≈ 1.333
  /** Small line height - matches text-sm default line height */
  sm: string = "[--lh-unit:1.429]"; // calc(1.25 / 0.875) ≈ 1.429
  /** Medium line height - matches text-base default line height */
  md: string = "[--lh-unit:1.5]"; // calc(1.5 / 1) = 1.5
  /** Large line height - matches text-lg default line height */
  lg: string = "[--lh-unit:1.556]"; // calc(1.75 / 1.125) ≈ 1.556
  /** Extra-large line height - matches text-xl default line height */
  xl: string = "[--lh-unit:1.4]"; // calc(1.75 / 1.25) = 1.4

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
      const lhUnitClass = this[extractedKeys.size];
      return lhUnitClass ? [lhUnitClass, "leading-(--lh)"] : [];
    }
    return [this.md, "leading-(--lh)"];
  }

  // Static factory methods for different text size ranges
  static createForSectionTitle(): LineHeightTheme {
    return new LineHeightTheme({
      xs: "[--lh-unit:1.333]", // text-2xl: calc(2 / 1.5) ≈ 1.333
      sm: "[--lh-unit:1.2]",   // text-3xl: calc(2.25 / 1.875) = 1.2
      md: "[--lh-unit:1.111]", // text-4xl: calc(2.5 / 2.25) ≈ 1.111
      lg: "[--lh-unit:1]",     // text-5xl: 1
      xl: "[--lh-unit:1]"      // text-6xl+: 1
    });
  }

  static createForPageTitle(): LineHeightTheme {
    return new LineHeightTheme({
      xs: "[--lh-unit:1.2]",   // text-3xl: calc(2.25 / 1.875) = 1.2
      sm: "[--lh-unit:1.111]", // text-4xl: calc(2.5 / 2.25) ≈ 1.111
      md: "[--lh-unit:1]",     // text-5xl: 1
      lg: "[--lh-unit:1]",     // text-6xl: 1
      xl: "[--lh-unit:1]"      // text-7xl: 1
    });
  }

  static createForTitle(): LineHeightTheme {
    return new LineHeightTheme({
      xs: "[--lh-unit:1.556]", // text-lg: calc(1.75 / 1.125) ≈ 1.556
      sm: "[--lh-unit:1.4]",   // text-xl: calc(1.75 / 1.25) = 1.4
      md: "[--lh-unit:1.333]", // text-2xl: calc(2 / 1.5) ≈ 1.333
      lg: "[--lh-unit:1.2]",   // text-3xl: calc(2.25 / 1.875) = 1.2
      xl: "[--lh-unit:1.111]"  // text-4xl: calc(2.5 / 2.25) ≈ 1.111
    })
  }
}