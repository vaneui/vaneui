import { borderModeClasses, noBorderModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey } from "../../props/keys";

export class BorderTheme extends BaseTheme {
  constructor(
    private modeClasses: Record<ModeKey, string> = borderModeClasses,
    private noBorderClasses: Record<ModeKey, string> = noBorderModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    return MODE_KEYS.map(mode => props.noBorder
      ? this.noBorderClasses[mode]
      : this.modeClasses[mode] || '');
  }
}
