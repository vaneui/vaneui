import { BaseClassMapper } from "../common";
import type { CategoryProps } from "../../props";

/**
 * Overlay background class mapper.
 * Outputs the overlay background CSS variable by default,
 * but outputs bg-transparent when the transparent prop is set.
 * This allows the transparent boolean prop to properly override the overlay background.
 */
export class OverlayBackgroundClassMapper extends BaseClassMapper {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys.transparent === 'transparent') {
      return ['bg-transparent'];
    }
    return ['bg-(--overlay-bg)'];
  }
}
