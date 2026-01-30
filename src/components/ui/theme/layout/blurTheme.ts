import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Blur theme for backdrop blur effects.
 * Uses CSS variable --overlay-blur for customizable blur amount.
 */
export class BlurTheme extends BaseTheme {
  /** Backdrop blur effect using CSS variable */
  blur: string = "backdrop-blur-(--overlay-blur)";
  /** No blur effect */
  noBlur: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    const blur = extractedKeys?.blur;
    return blur === 'blur' ? [this.blur] : [];
  }
}
