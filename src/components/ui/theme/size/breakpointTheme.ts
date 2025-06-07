import { BaseTheme } from "../common/baseTheme";
import { BREAKPOINT_KEYS, BreakpointKey, SIZE_KEYS, SizeKey } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
import { rowToColumnBreakpointClasses } from "../../classes/layoutClasses";

export interface BreakpointTheme extends Record<BreakpointKey, string> {
}

export class BreakpointTheme extends BaseTheme {
  public static readonly defaultClasses: Record<BreakpointKey, string> =
    rowToColumnBreakpointClasses;

  constructor(initial?: Partial<Record<BreakpointKey, string>>) {
    super();
    BREAKPOINT_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? BreakpointTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, BREAKPOINT_KEYS);
    if (!key)
      return [];

    return [this[key] || ''];
  }
}
