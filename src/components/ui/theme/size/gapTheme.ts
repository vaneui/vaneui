import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface GapTheme extends Record<SizeKey, string> {
}

export class GapTheme extends BaseTheme {
  public readonly defaultClasses: Record<SizeKey, string> = {
    xs: 'gap-2', sm: 'gap-3', md: 'gap-4', lg: 'gap-5', xl: 'gap-6'
  };

  constructor(sizeMap?: Record<SizeKey, string>) {
    super();
    ComponentKeys.size.forEach((key) => {
      this[key as SizeKey] = sizeMap?.[key as SizeKey] ?? this.defaultClasses[key as SizeKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const gap = extractedKeys?.gap;

    // If noGap is true, return empty array (no gap classes)
    if (gap === 'noGap') {
      return [];
    }

    // If gap is true or undefined, apply gap classes based on size
    if (gap === 'gap') {
      const gapClass = this[size];
      return gapClass ? [gapClass] : [];
    }

    return [];
  }
}
