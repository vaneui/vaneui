import { borderModeClasses, noBorderModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, NO_BORDER_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";

export class BorderTheme extends BaseTheme {
  constructor(
    private modeClasses: Record<ModeKey, string> = borderModeClasses,
    private noBorderClasses: Record<ModeKey, string> = noBorderModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const noBorder = pickKey(props, defaults, NO_BORDER_KEYS);
    return MODE_KEYS.map(mode =>
      noBorder != undefined && noBorder ? this.noBorderClasses[mode] : this.modeClasses[mode] || '');
  }
}
