import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey, NO_BORDER_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";

export class BorderTheme extends BaseTheme {
  constructor(
    private borderClasses: Record<ModeKey, string> = {
      base: "border",
      hover: "hover:border",
      active: "active:border",
    },
    private noBorderClasses: Record<ModeKey, string> = {
      base: "border-none",
      hover: "hover:border-none",
      active: "active:border-none",
    },
  ) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const noBorder = pickKey(props, defaults, NO_BORDER_KEYS);
    return MODE_KEYS.map(mode =>
      noBorder != undefined && noBorder ? this.noBorderClasses[mode] : this.borderClasses[mode] || '');
  }
}
