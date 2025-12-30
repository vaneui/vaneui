import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class RadiusTheme extends BaseTheme {
  /** Pill shape - fully rounded corners */
  pill: string = "rounded-full";
  /** Sharp shape - no rounded corners */
  sharp: string = "rounded-none";
  /** Size-based rounded corners - varies by component size */
  rounded: Record<SizeKey, string>;

  public constructor(roundedClasses: Record<SizeKey, string>) {
    super();
    this.rounded = roundedClasses;
  }

  static createUITheme(): RadiusTheme {
    return new RadiusTheme({
      xs: '[--br-unit:2]',
      sm: '[--br-unit:3]',
      md: '[--br-unit:4]',
      lg: '[--br-unit:5]',
      xl: '[--br-unit:6]'
    });
  }

  static createLayoutTheme(): RadiusTheme {
    return new RadiusTheme({
      xs: '[--br-unit:3]',
      sm: '[--br-unit:4]',
      md: '[--br-unit:5]',
      lg: '[--br-unit:6]',
      xl: '[--br-unit:7]'
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys.size ?? 'md';
    const shape = extractedKeys.shape;

    if(shape){
      switch (shape) {
        case 'pill':
          return [this.pill];
        case 'sharp':
          return [this.sharp];
        case 'rounded': {
          const brUnitClass = this.rounded[size];
          return brUnitClass ? [brUnitClass, "rounded-(--br)"] : [];
        }
        default:
          return [];
      }
    }

    return [];
  }
}
