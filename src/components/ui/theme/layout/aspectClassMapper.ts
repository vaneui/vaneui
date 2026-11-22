import { BaseClassMapper } from "../common/BaseClassMapper";
import type { AspectKey, CategoryProps } from "../../props";

/**
 * Fixed aspect ratio of a box: the height follows the width.
 */
export class AspectClassMapper extends BaseClassMapper implements Record<AspectKey, string> {
  /** 1 / 1 */
  aspectSquare: string = "aspect-square";
  /** 16 / 9 */
  aspectVideo: string = "aspect-video";
  /** The content's own ratio */
  aspectAuto: string = "aspect-auto";

  getClasses(extractedKeys: CategoryProps): string[] {
    const aspect = extractedKeys?.aspect;
    return aspect ? [this[aspect]] : [];
  }
}
