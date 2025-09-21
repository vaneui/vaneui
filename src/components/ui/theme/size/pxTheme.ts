import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import { layoutPaddingClasses } from "../../classes/layoutClasses";
import type { CategoryProps } from "../../props";

/** Horizontal padding theme - controls left and right padding */
export class PxTheme extends PaddingTheme {
  private aspectRatioMap?: Record<SizeKey, string>;

  constructor(sizeMap?: Record<SizeKey, string>, aspectRatioMap?: Record<SizeKey, string>) {
    super(sizeMap);
    this.aspectRatioMap = aspectRatioMap;
    // Override with PxTheme's default classes if no custom sizeMap provided
    if (!sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = layoutPaddingClasses[key];
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      const size = extractedKeys?.size ?? 'md';
      const paddingClass = this[size];
      const aspectRatioClass = this.aspectRatioMap?.[size];
      
      const classes: string[] = [];
      if (paddingClass) classes.push(paddingClass);
      if (aspectRatioClass) classes.push(aspectRatioClass);
      classes.push("px-(--px)");
      
      return classes.length > 1 ? classes : [];
    }
    return [];
  }
}