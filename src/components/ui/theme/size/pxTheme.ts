import { SizeKey } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import type { CategoryProps } from "../../props";

/** Horizontal padding theme - controls left and right padding */
export class PxTheme extends PaddingTheme {
  private aspectRatioMap?: Record<SizeKey, string>;
  private isUIComponent?: boolean;

  constructor(aspectRatio?: Record<SizeKey, string>, isUIComponent = false) {
    super();
    this.aspectRatioMap = aspectRatio;
    this.isUIComponent = isUIComponent;
    // PxTheme should not set any padding classes - that's PyTheme's job
    // PxTheme only handles aspect-ratio
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const size = extractedKeys?.size ?? 'md';
      const aspectRatioClass = this.aspectRatioMap?.[size];
      
      const classes: string[] = [];
      // Only add aspect-ratio class - no padding classes
      if (aspectRatioClass) classes.push(aspectRatioClass);
      
      // Use UI or layout CSS variables based on component type
      const cssVar = this.isUIComponent ? "px-(--ui-px)" : "px-(--px)";
      classes.push(cssVar);
      
      return classes;
    }
    return [];
  }
}