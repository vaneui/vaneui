import { Mode, MODE_KEYS } from "../../props/mode";
import { ringModeClasses, noRingModeClasses } from "../../classes/layoutClasses";
import { BaseTheme } from "../common/baseTheme";

export class RingTheme extends BaseTheme {
  constructor(
    private modeClasses: Record<Mode, string> = ringModeClasses,
    private noRingClasses: Record<Mode, string> = noRingModeClasses,
  ) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    return MODE_KEYS.map(mode => props.noRing
      ? this.noRingClasses[mode]
      : this.modeClasses[mode] || '');
  }
}
