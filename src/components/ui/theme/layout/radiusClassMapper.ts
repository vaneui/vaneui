import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ShapeKey } from "../../props";

/**
 * Border radius theme - outputs consumer class rounded-(--br) for rounded shapes.
 * CSS variable values (--br-unit) are now set via CSS rules
 * in vars.css using semantic classes and data attributes.
 *
 * pill and sharp shapes use fixed Tailwind classes.
 */
export class RadiusClassMapper extends BaseClassMapper implements Record<ShapeKey, string> {
  /** Pill shape - fully rounded corners */
  pill: string = "rounded-full";
  /** Sharp shape - no rounded corners */
  sharp: string = "rounded-none";
  /** Rounded shape - dynamic border radius from CSS variable */
  rounded: string = "rounded-(--br)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const shape = extractedKeys.shape;

    if (shape) {
      switch (shape) {
        case 'pill':
          return [this.pill];
        case 'sharp':
          return [this.sharp];
        case 'rounded':
          return [this.rounded];
        default:
          return [];
      }
    }

    return [];
  }
}
