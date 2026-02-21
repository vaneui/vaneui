import { FontStyleKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class FontStyleClassMapper extends BaseClassMapper implements Record<FontStyleKey, string> {
  /** Italic font style - slanted text */
  italic: string = "italic";
  /** Normal font style - upright text (not italic) */
  notItalic: string = "not-italic";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.fontStyle ? this[extractedKeys.fontStyle] : ''];
  }
}
