import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";
import { BREAKPOINT_KEYS, BreakpointKey, SIZE_KEYS, SizeKey } from "../../props/keys";

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
    BREAKPOINT_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? BreakpointTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.breakpoint as BreakpointKey;
    if (!key)
      return [];

    return [this[key] || ''];
  }
}
