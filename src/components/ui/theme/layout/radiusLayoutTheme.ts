import { Mode } from "../../props/mode";
import {
  SizeKey,
  SHAPE_KEYS, SIZE_KEYS
} from "../../props/propKeys";
import {
  roundedClasses,
} from "../../classes/layoutClasses";
import { pickFirstKey, pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseLayoutTheme } from "./baseLayoutTheme";

export class RadiusLayoutTheme extends BaseLayoutTheme {
  radius?: Partial<Record<SizeKey, string>>;

  constructor(radius: Partial<Record<SizeKey, string>> = roundedClasses) {
    super();
    this.radius = radius;
  }

  /**
   * Get layout-related CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string[] {
    const baseClasses = super.getClasses(props);
    const size = pickFirstKey(props, SIZE_KEYS, 'md');
    const shape = pickFirstKeyOptional(props, SHAPE_KEYS, 'rounded');

    const classes = [
        ...baseClasses,
      shape === 'rounded' && this.radius ? (this.radius[size] ?? '') || '' : '',
      shape === 'pill' ? 'rounded-full' : '',
      shape === 'sharp' ? 'rounded-none' : '',
    ];

    return classes;
  }

  /**
   * Create a new BaseLayoutTheme with default values
   */
  static createBaseLayoutTheme(radius: Partial<Record<SizeKey, string>> = roundedClasses): RadiusLayoutTheme {
    return new RadiusLayoutTheme(radius);
  }
}
