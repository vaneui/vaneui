import { Mode, MODE_KEYS } from "../../props/mode";
import { borderModeClasses, noBorderModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";

export class BorderTheme extends BaseTheme {
  constructor(
    private modeClasses: Record<Mode, string> = borderModeClasses,
    private noBorderClasses: Record<Mode, string> = noBorderModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    return MODE_KEYS.map(mode => props.noBorder
      ? this.noBorderClasses[mode]
      : this.modeClasses[mode] || '');
  }
}
