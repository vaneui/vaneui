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
  
  private isUIComponent: boolean;

  private constructor(roundedClasses: Record<SizeKey, string>, isUIComponent: boolean = false) {
    super();
    this.rounded = roundedClasses;
    this.isUIComponent = isUIComponent;
  }

  static createUITheme(customRounded?: Record<SizeKey, string>): RadiusTheme {
    const brUnitClasses: Record<SizeKey, string> = {
      xs: '[--br-unit:1]',
      sm: '[--br-unit:2]', 
      md: '[--br-unit:3]',
      lg: '[--br-unit:4]',
      xl: '[--br-unit:5]'
    };
    return new RadiusTheme(customRounded || brUnitClasses, true);
  }

  static createLayoutTheme(): RadiusTheme {
    const brUnitClasses: Record<SizeKey, string> = {
      xs: '[--br-unit:3]',
      sm: '[--br-unit:4]',
      md: '[--br-unit:5]',
      lg: '[--br-unit:6]',
      xl: '[--br-unit:7]'
    };
    return new RadiusTheme(brUnitClasses, false);
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
        const brUnitClass = this.rounded[size];
        const roundedVar = this.isUIComponent ? "rounded-(--ui-br)" : "rounded-(--br)";
        return brUnitClass ? [brUnitClass, roundedVar] : [];
      }
      default:
        return [];
    }
  }
}
