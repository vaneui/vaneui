import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { BreakpointKey } from "../../props";

export class BreakpointClassMapper extends BaseClassMapper implements Record<BreakpointKey, string> {
  /** Stack into a column below 768px (max-mobile: width < 48rem, exclusive — 768px itself is desktop) */
  mobileStack: string = "max-mobile:flex-col";
  /** Stack into a column below 1024px (max-tablet: width < 64rem, exclusive — 1024px itself is desktop) */
  tabletStack: string = "max-tablet:flex-col";
  /** Stack into a column below 1280px (max-desktop: width < 80rem, exclusive — 1280px itself is desktop) */
  desktopStack: string = "max-desktop:flex-col";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
