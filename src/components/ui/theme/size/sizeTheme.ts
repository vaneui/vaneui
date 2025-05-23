import { BaseTheme } from "../common/baseTheme";
import { Mode, MODE_KEYS } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";

/**
 * Size theme class for handling size-related CSS classes
 */
export class SizeTheme extends BaseTheme {
  px: Partial<Record<SizeKey, Record<Mode, string>>>;
  py: Partial<Record<SizeKey, Record<Mode, string>>>;
  text: Partial<Record<SizeKey, Record<Mode, string>>>;
  gap: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(
    px?: Record<SizeKey, string>,
    py?: Record<SizeKey, string>,
    text?: Record<SizeKey, string>,
    gap?: Record<SizeKey, string>
  ) {
    super();
    this.px = px ? SizeTheme.makeSizeVariant(px) : {};
    this.py = py ? SizeTheme.makeSizeVariant(py) : {};
    this.text = text ? SizeTheme.makeSizeVariant(text) :{};
    this.gap = gap ? SizeTheme.makeSizeVariant(gap) : {};
  }

  /**
   * Get size-related CSS classes based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Record<string, any>): string[] {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const modeClasses = MODE_KEYS.flatMap(mode => [
      this.px[size]?.[mode] || '',
      this.py[size]?.[mode] || '',
      this.text[size]?.[mode] || '',
      this.gap[size]?.[mode] || ''
    ]);

    return modeClasses.filter(Boolean);
  }

  /**
   * Create a size variant with the given size map
   * @param sizeMap Map of sizes to CSS classes
   * @returns Record of sizes with modes
   */
  static makeSizeVariant(
    sizeMap: Record<SizeKey, string>
  ): Record<SizeKey, Record<Mode, string>> {
    return SIZE_KEYS.reduce((acc, size) => {
      acc[size] = {
        base: sizeMap[size],
        hover: '',
        active: '',
      };
      return acc;
    }, {} as Record<SizeKey, Record<Mode, string>>);
  }
}
