import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

/**
 * GapSizeTheme class for handling gap CSS classes
 */
export class GapSizeTheme extends BaseTheme {
  gap: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(gap?: Record<SizeKey, string>) {
    super();
    this.gap = gap ? makeSizeVariant(gap) : {};
  }

  /**
   * Get gap CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.map(mode => this.gap[size]?.[mode] || '');

    return modeClasses.filter(Boolean);
  }
}
