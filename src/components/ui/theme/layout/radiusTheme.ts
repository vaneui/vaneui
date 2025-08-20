import { SizeKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import {
  uiBorderRadiusClasses,
  layoutBorderRadiusClasses
} from "../../classes/radiusClasses";

export interface RadiusTheme {
  pill: string;
  sharp: string;
  rounded: Record<SizeKey, string>;
}

export class RadiusTheme extends BaseTheme {
  pill: string = "rounded-full";
  sharp: string = "rounded-none";
  rounded: Record<SizeKey, string>;

  private constructor(roundedClasses: Record<SizeKey, string>) {
    super();
    this.rounded = roundedClasses;
  }

  static createUITheme(customRounded?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(customRounded || uiBorderRadiusClasses);
  }

  static createLayoutTheme(customRounded?: Record<SizeKey, string>): RadiusTheme {
    return new RadiusTheme(customRounded || layoutBorderRadiusClasses);
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const shape = extractedKeys?.shape ?? 'rounded';
    
    switch (shape) {
      case 'pill':
        return [this.pill];
      case 'sharp':
        return [this.sharp];
      case 'rounded':
        const roundedClass = this.rounded[size];
        return roundedClass ? [roundedClass] : [];
      default:
        return [];
    }
  }
}
