import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResponsiveWidthKey, WidthKey } from "../../props";

export class WidthClassMapper extends BaseClassMapper implements Record<WidthKey | ResponsiveWidthKey, string> {
  wFull: string = "w-full";
  wFit: string = "w-fit";
  wAuto: string = "w-auto";
  wScreen: string = "w-screen max-w-none";
  /** Full width below a breakpoint; the base width (often wFit) still applies above it */
  mobileWFull: string = "max-mobile:w-full";
  tabletWFull: string = "max-tablet:w-full";
  desktopWFull: string = "max-desktop:w-full";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const widthValue = extractedKeys?.width;

    if (widthValue && widthValue in this) {
      classes.push(this[widthValue as WidthKey]);
    }

    const responsiveValue = extractedKeys?.responsiveWidth;
    if (responsiveValue && responsiveValue in this) {
      classes.push(this[responsiveValue as ResponsiveWidthKey]);
    }

    return classes;
  }
}
