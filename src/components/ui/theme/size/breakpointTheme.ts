import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BreakpointKey } from "../../props";

export class BreakpointTheme extends BaseTheme implements Record<BreakpointKey, string> {
  xsCol: string = "max-xs:flex-col";
  smCol: string = "max-sm:flex-col";
  mdCol: string = "max-md:flex-col";
  lgCol: string = "max-lg:flex-col";
  xlCol: string = "max-xl:flex-col";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
