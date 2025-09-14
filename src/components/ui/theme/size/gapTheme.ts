import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class GapTheme extends BaseTheme implements Record<SizeKey, string> {
  /** Extra-small gap - 0.5rem spacing between items */
  xs: string = 'gap-2';
  /** Small gap - 0.75rem spacing between items */
  sm: string = 'gap-3';
  /** Medium gap - 1rem spacing between items */
  md: string = 'gap-4';
  /** Large gap - 1.25rem spacing between items */
  lg: string = 'gap-5';
  /** Extra-large gap - 1.5rem spacing between items */
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
    if (extractedKeys?.gap === 'gap') {
      const gapClass = this[extractedKeys?.size ?? 'md'];
      return gapClass ? [gapClass] : [];
    }
    return [];
  }
}
