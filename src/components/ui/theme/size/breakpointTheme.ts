import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BreakpointKey, ComponentKeys } from "../../props";

export class BreakpointTheme extends BaseTheme implements Record<BreakpointKey, string> {
  xsCol: string = "max-xs:flex-col";
  smCol: string = "max-sm:flex-col";
  mdCol: string = "max-md:flex-col";
  lgCol: string = "max-lg:flex-col";
  xlCol: string = "max-xl:flex-col";

  constructor(initial?: Partial<Record<BreakpointKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.breakpoint.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.breakpoint ? [this[extractedKeys.breakpoint] || ''] : [];
  }
}
