import { FontStyleKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class FontStyleTheme extends BaseTheme implements Record<FontStyleKey, string> {
  /** Italic font style - slanted text */
  italic: string = "italic";
  /** Normal font style - upright text (not italic) */
  notItalic: string = "not-italic";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.fontStyle ? this[extractedKeys.fontStyle] : ''];
  }
}
