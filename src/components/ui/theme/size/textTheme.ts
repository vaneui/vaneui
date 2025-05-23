import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

/**
 * TextTheme class for handling text size CSS classes
 */
export class TextTheme extends BaseTheme {
  text: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(text?: Record<SizeKey, string>) {
    super();
    this.text = text ? makeSizeVariant(text) : {};
  }

  /**
   * Get text size CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.map(mode => this.text[size]?.[mode] || '');

    return modeClasses.filter(Boolean);
  }
}
