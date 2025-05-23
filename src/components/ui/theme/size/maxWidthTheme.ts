import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

/**
 * MaxWidthTheme class for handling max-width CSS classes
 */
export class MaxWidthTheme extends BaseTheme {
  maxWidth: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(maxWidth?: Record<SizeKey, string>) {
    super();
    this.maxWidth = maxWidth ? makeSizeVariant(maxWidth) : {};
  }

  /**
   * Get max-width CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.map(mode => this.maxWidth[size]?.[mode] || '');

    return modeClasses.filter(Boolean);
  }
}