import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BreakpointKey, ComponentKeys } from "../../props";

export interface BreakpointTheme extends Record<BreakpointKey, string> {
}

export class BreakpointTheme extends BaseTheme {
  constructor(initial?: Partial<Record<BreakpointKey, string>>) {
    super();
    ComponentKeys.breakpoint.forEach((key) => {
      this[key] = initial?.[key] ?? {
        xsCol: "max-xs:flex-col",
        smCol: "max-sm:flex-col",
        mdCol: "max-md:flex-col",
        lgCol: "max-lg:flex-col",
        xlCol: "max-xl:flex-col"
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.breakpoint;
    if (!key)
      return [];

    return [this[key] || ''];
  }
}
