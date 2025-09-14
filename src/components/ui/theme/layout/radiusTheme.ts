import { SizeKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import {
  uiBorderRadiusClasses,
  layoutBorderRadiusClasses
} from "../../classes/radiusClasses";

export class RadiusTheme extends BaseTheme {
  /** Pill shape - fully rounded corners */
  pill: string = "rounded-full";
  /** Sharp shape - no rounded corners */
  sharp: string = "rounded-none";
  /** Size-based rounded corners - varies by component size */
  rounded: Record<SizeKey, string>;

  private constructor(roundedClasses: Record<SizeKey, string>) {
    super();
    this.rounded = roundedClasses;
  }

  static createUITheme(customRounded?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(customRounded || uiBorderRadiusClasses);
  }

  static createLayoutTheme(): RadiusTheme {
    return new RadiusTheme(layoutBorderRadiusClasses);
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys.size ?? 'md';
    const shape = extractedKeys.shape ?? 'rounded';
    
    switch (shape) {
      case 'pill':
        return [this.pill];
      case 'sharp':
        return [this.sharp];
      case 'rounded': {
        const roundedClass = this.rounded[size];
        return roundedClass ? [roundedClass] : [];
      }
      default:
        return [];
    }
  }
}
