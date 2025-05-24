import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";

/**
 * BackgroundAppearanceTheme class for handling background color CSS classes
 */
export class BackgroundAppearanceTheme extends BaseTheme {
  backgroundColor: Partial<Record<Mode, string>>;

  constructor(backgroundColor: Partial<Record<Mode, string>> = {}) {
    super();
    this.backgroundColor = backgroundColor;
  }

  /**
   * Get background color CSS classes based on props
   * @param props Component props (only the real props the user passed)
   * @param defaults Component-level defaults
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const modeClasses = MODE_KEYS.map(mode => this.backgroundColor[mode] || '');
    return modeClasses.filter(Boolean);
  }
}
