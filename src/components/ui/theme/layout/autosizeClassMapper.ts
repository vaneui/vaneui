import { BaseClassMapper } from "../common/BaseClassMapper";
import type { AutosizeKey, CategoryProps } from "../../props";

/**
 * Textarea that grows and shrinks with its content (`field-sizing: content`).
 * The component adds a height fallback for browsers without `field-sizing`.
 */
export class AutosizeClassMapper extends BaseClassMapper implements Record<AutosizeKey, string> {
  /** Size the box from its content */
  autosize: string = "field-sizing-content";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.autosize ? [this.autosize] : [];
  }
}
