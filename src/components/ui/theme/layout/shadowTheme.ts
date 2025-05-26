import { Mode, MODE_KEYS } from "../../props/mode";
import { SizeKey, SIZE_KEYS, NO_SHADOW_KEYS } from "../../props/propKeys";
import { shadowClasses, hoverShadowClasses, activeShadowClasses, noShadowModeClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ShadowTheme implements BaseTheme {
  constructor(
    private sizeClasses: Record<Mode, Record<SizeKey, string>> = {
      base: shadowClasses,
      hover: hoverShadowClasses,
      active: activeShadowClasses,
    },
    private noShadowClasses: Record<Mode, string> = noShadowModeClasses,
  ) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const size = pickKey(props, defaults, SIZE_KEYS, 'md');
    const noShadow = pickKey(props, defaults, NO_SHADOW_KEYS);
    return MODE_KEYS.map(mode => noShadow
      ? this.noShadowClasses[mode]
      : this.sizeClasses[mode][size ?? 'md'] || '');
  }
}
