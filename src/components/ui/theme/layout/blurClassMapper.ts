import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, BlurKey } from "../../props";

/**
 * Blur theme for backdrop blur effects.
 * Uses CSS variable --overlay-blur for customizable blur amount.
 */
export class BlurClassMapper extends BaseClassMapper implements Record<BlurKey, string> {
  /** Backdrop blur effect using CSS variable */
  backdropBlur: string = "backdrop-blur-(--overlay-blur)";
  /** No blur effect */
  noBackdropBlur: string = "";

  getClasses(extractedKeys: CategoryProps): string[] {
    const blur = extractedKeys?.blur;
    return blur === 'backdropBlur' ? [this.backdropBlur] : [];
  }
}
