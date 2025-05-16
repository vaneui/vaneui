import { BaseTheme } from "../common/baseTheme";
import { Mode } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";

/**
 * Size theme class for handling size-related CSS classes
 */
export class SizeTheme extends BaseTheme {
  private px: Partial<Record<SizeKey, Record<Mode, string>>>;
  private py: Partial<Record<SizeKey, Record<Mode, string>>>;
  private text: Partial<Record<SizeKey, Record<Mode, string>>>;
  private gap: Partial<Record<SizeKey, Record<Mode, string>>>;

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
