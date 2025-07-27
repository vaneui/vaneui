import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props";
import { BreakpointKey, SizeKey, ComponentKeys } from "../../props";

export interface BreakpointTheme extends Record<BreakpointKey, string> {
}

export class BreakpointTheme extends BaseTheme {
  public static readonly defaultClasses: Record<BreakpointKey, string> =
    {
      xsCol: "max-xs:flex-col",
      smCol: "max-sm:flex-col",
      mdCol: "max-md:flex-col",
      lgCol: "max-lg:flex-col",
      xlCol: "max-xl:flex-col"
    };

  constructor(initial?: Partial<Record<BreakpointKey, string>>) {
    super();
    ComponentKeys.breakpoint.forEach((key) => {
      this[key as BreakpointKey] = initial?.[key as BreakpointKey] ?? BreakpointTheme.defaultClasses[key as BreakpointKey];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.breakpoint as BreakpointKey;
    if (!key)
      return [];

    return [this[key] || ''];
  }
}
