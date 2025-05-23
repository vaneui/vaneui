import { Mode, MODE_KEYS } from "../../props/mode";
import { SizeKey, SIZE_KEYS } from "../../props/propKeys";
import { shadowClasses, hoverShadowClasses, activeShadowClasses, noShadowModeClasses } from "../../classes/layoutClasses";
import { pickFirstKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ShadowTheme extends BaseTheme {
  constructor(
    private sizeClasses: Record<Mode, Record<SizeKey, string>> = {
      base: shadowClasses,
      hover: hoverShadowClasses,
      active: activeShadowClasses,
    },
    private noShadowClasses: Record<Mode, string> = noShadowModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    return MODE_KEYS.map(mode => props.noShadow
      ? this.noShadowClasses[mode]
      : this.sizeClasses[mode][size] || '');
  }
}
