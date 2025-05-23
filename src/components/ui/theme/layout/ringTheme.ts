import { Mode } from "../../props/mode";
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
    const m = props.mode ?? 'base';
    return props.noRing
      ? [this.noRingClasses[m]]
      : [this.modeClasses[m]];
  }
}
