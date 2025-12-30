import { SizeKey, ComponentKeys } from "../../props";
import { PaddingTheme } from "./paddingTheme";
import type { CategoryProps } from "../../props";

/** Horizontal padding theme - controls left and right padding via aspect ratio */
export class PxTheme extends PaddingTheme {
  constructor(aspectRatio: Record<SizeKey, string>) {
    super(aspectRatio);
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
      return [aspectRatioClass, "px-(--px)"];
    }
    return [];
  }
}