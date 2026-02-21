import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { SizeKey, ComponentKeys } from "../../props";

/**
 * Size theme - can operate in two modes:
 * 1. Default mode: outputs consumer class size-(--size), with CSS variable values set in vars.css
 * 2. Custom mode: outputs custom classes for each size (e.g., max-width classes)
 */
export class SizeClassMapper extends BaseClassMapper implements Record<SizeKey, string> {
  /** Extra-small size variant */
  xs: string = "";
  /** Small size variant */
  sm: string = "";
  /** Medium size variant (default) */
  md: string = "";
  /** Large size variant */
  lg: string = "";
  /** Extra-large size variant */
  xl: string = "";
  /** Consumer class for size (used in default mode) */
  size: string = "size-(--size)";

  private useCustomClasses: boolean;

  constructor(sizeMap?: Record<SizeKey, string>) {
    super();
    this.useCustomClasses = !!sizeMap;
    if (sizeMap) {
      ComponentKeys.size.forEach((key) => {
        this[key] = sizeMap[key] ?? "";
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (this.useCustomClasses) {
      const size = extractedKeys?.size ?? 'md';
      return this[size] ? [this[size]] : [];
    }
    // Default: use CSS variable consumer class
    return [this.size];
  }
}
