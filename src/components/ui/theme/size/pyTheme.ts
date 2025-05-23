import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey, makeSizeVariant } from "../../../utils/componentUtils";

/**
 * PyTheme class for handling vertical padding CSS classes
 */
export class PyTheme extends BaseTheme {
  py: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(py?: Record<SizeKey, string>) {
    super();
    this.py = py ? makeSizeVariant(py) : {};
  }

  /**
   * Get vertical padding CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.map(mode => this.py[size]?.[mode] || '');

    return modeClasses.filter(Boolean);
  }
}
