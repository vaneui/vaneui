import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ObjectFitKey } from "../../props";

/**
 * Object fit theme for controlling how replaced elements (images, videos) fit their container.
 */
export class ObjectFitClassMapper extends BaseClassMapper implements Record<ObjectFitKey, string> {
  /** Cover - image covers container, may be cropped */
  objectCover: string = "object-cover";
  /** Contain - image fits inside container, may have letterboxing */
  objectContain: string = "object-contain";
  /** Fill - image stretches to fill container */
  objectFill: string = "object-fill";
  /** None - image displays at natural size */
  objectNone: string = "object-none";
  /** Scale down - like contain, but never scales up */
  objectScaleDown: string = "object-scale-down";

  getClasses(extractedKeys: CategoryProps): string[] {
    const objectFit = extractedKeys?.objectFit;
    return objectFit ? [this[objectFit]] : [];
  }
}
