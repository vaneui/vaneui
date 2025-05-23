import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

/**
 * BorderAppearanceTheme class for handling border color CSS classes
 */
export class BorderAppearanceTheme extends BaseTheme {
  borderColor: Partial<Record<Mode, string>>;

  constructor(borderColor: Partial<Record<Mode, string>> = {}) {
    super();
    this.borderColor = borderColor;
  }

  /**
   * Get border color CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const modeClasses = MODE_KEYS.map(mode => this.borderColor[mode] || '');
    return modeClasses.filter(Boolean);
  }
}