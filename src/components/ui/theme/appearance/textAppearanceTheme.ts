import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

/**
 * TextAppearanceTheme class for handling text color CSS classes
 */
export class TextAppearanceTheme extends BaseTheme {
  textColor: Partial<Record<Mode, string>>;

  constructor(textColor: Partial<Record<Mode, string>> = {}) {
    super();
    this.textColor = textColor;
  }

  /**
   * Get text color CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const modeClasses = MODE_KEYS.map(mode => this.textColor[mode] || '');
    return modeClasses.filter(Boolean);
  }
}