import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { BreakpointKey } from "../../props";

export class BreakpointClassMapper extends BaseClassMapper implements Record<BreakpointKey, string> {
  /** Stack into a column at mobile width and below (max-mobile: 48rem) */
  mobileStack: string = "max-mobile:flex-col";
  /** Stack into a column at tablet width and below (max-tablet: 64rem) */
  tabletStack: string = "max-tablet:flex-col";
  /** Stack into a column at desktop width and below (max-desktop: 80rem) */
  desktopStack: string = "max-desktop:flex-col";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
