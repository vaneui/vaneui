import { BaseTheme } from "../common/baseTheme";
import { BREAKPOINT_KEYS, BreakpointKey, SIZE_KEYS, SizeKey } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";

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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, BREAKPOINT_KEYS);
    if (!key)
      return [];

    return [this[key] || ''];
  }
}
