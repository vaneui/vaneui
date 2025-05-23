import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

/**
 * PxTheme class for handling horizontal padding CSS classes
 */
export class PxTheme extends BaseTheme {
  px: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(px?: Record<SizeKey, string>) {
    super();
    this.px = px ? makeSizeVariant(px) : {};
  }

  /**
   * Get horizontal padding CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.map(mode => this.px[size]?.[mode] || '');

    return modeClasses.filter(Boolean);
  }
}
