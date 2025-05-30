import { ringModeClasses, noRingModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";
import { MODE_KEYS, ModeKey } from "../../props/keys";

export class RingTheme extends BaseTheme {
  constructor(
    private modeClasses: Record<ModeKey, string> = ringModeClasses,
    private noRingClasses: Record<ModeKey, string> = noRingModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    return MODE_KEYS.map(mode => props.noRing
      ? this.noRingClasses[mode]
      : this.modeClasses[mode] || '');
  }
}
