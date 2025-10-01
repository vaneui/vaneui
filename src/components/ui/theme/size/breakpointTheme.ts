import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BreakpointKey } from "../../props";

export class BreakpointTheme extends BaseTheme implements Record<BreakpointKey, string> {
  /** Switch to column layout on mobile devices and below (max-mobile: 20rem) */
  mobileCol: string = "max-mobile:flex-col";
  /** Switch to column layout on tablet devices and below (max-tablet: 40rem) */
  tabletCol: string = "max-tablet:flex-col";
  /** Switch to column layout on laptop devices and below (max-laptop: 64rem) */
  laptopCol: string = "max-laptop:flex-col";
  /** Switch to column layout on desktop devices and below (max-desktop: 80rem) */
  desktopCol: string = "max-desktop:flex-col";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
