import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import type { CategoryProps } from "../../props";

/** Horizontal padding theme - controls left and right padding via aspect ratio */
export class PxTheme extends PaddingTheme {
  private isUIComponent?: boolean;

  constructor(aspectRatio?: Record<SizeKey, string>, isUIComponent = false) {
    super(aspectRatio);
    this.isUIComponent = isUIComponent;
    // Override with PxTheme's default aspect ratio classes if no custom map provided
    if (!aspectRatio) {
      ComponentKeys.size.forEach((key) => {
        this[key] = "[--aspect-ratio:1]";
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const size = extractedKeys?.size ?? 'md';
      const aspectRatioClass = this[size];

      const classes: string[] = [];
      // Only add aspect-ratio class - no padding classes
      if (aspectRatioClass)
        classes.push(aspectRatioClass);

      // Use UI or layout CSS variables based on component type
      const cssVar = this.isUIComponent ? "px-(--ui-px)" : "px-(--px)";
      classes.push(cssVar);

      return classes;
    }
    return [];
  }
}