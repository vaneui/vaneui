import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { layoutGapClasses } from "../../classes/layoutClasses";

export class GapTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small gap - uses CSS variable --layout-gap-xs */
  xs: string = layoutGapClasses.xs;
  /** Small gap - uses CSS variable --layout-gap-sm */
  sm: string = layoutGapClasses.sm;
  /** Medium gap - uses CSS variable --layout-gap-md */
  md: string = layoutGapClasses.md;
  /** Large gap - uses CSS variable --layout-gap-lg */
  lg: string = layoutGapClasses.lg;
  /** Extra-large gap - uses CSS variable --layout-gap-xl */
  xl: string = layoutGapClasses.xl;

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
    if (extractedKeys?.gap === 'gap') {
      const gapClass = this[extractedKeys?.size ?? 'md'];
      return gapClass ? [gapClass, "gap-(--gap)"] : [];
    }
    return [];
  }
}
