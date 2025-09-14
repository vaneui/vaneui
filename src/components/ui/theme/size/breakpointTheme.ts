import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BreakpointKey } from "../../props";

export class BreakpointTheme extends BaseTheme implements Record<BreakpointKey, string> {
  /** Switch to column layout on extra-small screens and below */
  xsCol: string = "max-xs:flex-col";
  /** Switch to column layout on small screens and below */
  smCol: string = "max-sm:flex-col";
  /** Switch to column layout on medium screens and below */
  mdCol: string = "max-md:flex-col";
  /** Switch to column layout on large screens and below */
  lgCol: string = "max-lg:flex-col";
  /** Switch to column layout on extra-large screens and below */
  xlCol: string = "max-xl:flex-col";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
