import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

/**
 * RingAppearanceTheme class for handling ring color CSS classes
 */
export class RingAppearanceTheme extends BaseTheme {
  ringColor: Partial<Record<Mode, string>>;

  constructor(ringColor: Partial<Record<Mode, string>> = {}) {
    super();
    this.ringColor = ringColor;
  }

  /**
   * Get ring color CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const modeClasses = MODE_KEYS.map(mode => this.ringColor[mode] || '');
    return modeClasses.filter(Boolean);
  }
}