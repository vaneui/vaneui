import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class GapTheme extends BaseTheme implements Record<SizeKey, string> {
  xs: string = 'gap-2';
  sm: string = 'gap-3';
  md: string = 'gap-4';
  lg: string = 'gap-5';
  xl: string = 'gap-6';

  constructor(sizeMap?: Record<SizeKey, string>) {
    super();
    if (sizeMap) {
      ComponentKeys.size.forEach((key) => {
        if (sizeMap[key] !== undefined) {
          this[key] = sizeMap[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const gap = extractedKeys?.gap;

    // If gap is true or undefined, apply gap classes based on size
    if (gap === 'gap') {
      const gapClass = this[size];
      return gapClass ? [gapClass] : [];
    }

    return [];
  }
}
