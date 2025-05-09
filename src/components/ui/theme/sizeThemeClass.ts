import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SIZE_KEYS, SizeKey } from "../props/propKeys";
import { pickFirstKey } from "../../utils/componentUtils";

/**
 * Size theme class for handling size-related CSS classes
 */
export class SizeTheme extends BaseTheme {
  private px: Partial<Record<SizeKey, Record<Mode, string>>>;
  private py: Partial<Record<SizeKey, Record<Mode, string>>>;
  private text: Partial<Record<SizeKey, Record<Mode, string>>>;
  private gap: Partial<Record<SizeKey, Record<Mode, string>>>;

  /**
   * Create a new SizeTheme instance
   * @param px Padding X classes by size and mode
   * @param py Padding Y classes by size and mode
   * @param text Text size classes by size and mode
   * @param gap Gap classes by size and mode
   */
  constructor(
    px?: Record<SizeKey, Record<Mode, string>>,
    py?: Record<SizeKey, Record<Mode, string>>,
    text?: Record<SizeKey, Record<Mode, string>>,
    gap?: Record<SizeKey, Record<Mode, string>>
  ) {
    super();
    this.px = px || {};
    this.py = py || {};
    this.text = text || {};
    this.gap = gap || {};
  }

  /**
   * Get size-related CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');

    const classes = [
      this.px[size]?.[mode] || '',
      this.py[size]?.[mode] || '',
      this.text[size]?.[mode] || '',
      this.gap[size]?.[mode] || ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Get padding X classes for a specific size and mode
   */
  getPxClasses(size: SizeKey, mode: Mode = 'base'): string {
    return this.px[size]?.[mode] || '';
  }

  /**
   * Get padding Y classes for a specific size and mode
   */
  getPyClasses(size: SizeKey, mode: Mode = 'base'): string {
    return this.py[size]?.[mode] || '';
  }

  /**
   * Get text size classes for a specific size and mode
   */
  getTextClasses(size: SizeKey, mode: Mode = 'base'): string {
    return this.text[size]?.[mode] || '';
  }

  /**
   * Get gap classes for a specific size and mode
   */
  getGapClasses(size: SizeKey, mode: Mode = 'base'): string {
    return this.gap[size]?.[mode] || '';
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
