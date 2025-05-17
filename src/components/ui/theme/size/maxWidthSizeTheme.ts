import { BaseTheme } from "../common/baseTheme";
import { Mode } from "../../props/mode";
import { SIZE_KEYS, SizeKey } from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";
import { SizeTheme } from "./sizeTheme";

/**
 * Size theme class for handling size-related CSS classes
 */
export class MaxWidthSizeTheme extends SizeTheme {
  maxW: Partial<Record<SizeKey, Record<Mode, string>>>;

  constructor(
    px?: Record<SizeKey, string>,
    py?: Record<SizeKey, string>,
    text?: Record<SizeKey, string>,
    gap?: Record<SizeKey, string>,
    maxW?: Record<SizeKey, string>,
  ) {
    super(px, py, text, gap);
    this.maxW = maxW ? SizeTheme.makeSizeVariant(maxW) : {};
  }

  /**
   * Get size-related CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const base = super.getClasses(props);

    const classes = [
      base,
      this.maxW[size]?.[mode] || '',
    ];

    return classes.filter(Boolean).join(' ');
  }
}
