import { FontWeightKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class FontWeightClassMapper extends BaseClassMapper implements Record<FontWeightKey, string> {
  /** Thin font weight (100) - lightest weight */
  fontThin: string = "font-thin";
  /** Extra-light font weight (200) - very light */
  fontExtralight: string = "font-extralight";
  /** Light font weight (300) - lighter than normal */
  fontLight: string = "font-light";
  /** Normal font weight (400) - default font weight */
  fontNormal: string = "font-normal";
  /** Medium font weight (500) - slightly bold */
  fontMedium: string = "font-medium";
  /** Semi-bold font weight (600) - moderately bold */
  fontSemibold: string = "font-semibold";
  /** Bold font weight (700) - standard bold */
  fontBold: string = "font-bold";
  /** Extra-bold font weight (800) - very bold */
  fontExtrabold: string = "font-extrabold";
  /** Black font weight (900) - heaviest weight */
  fontBlack: string = "font-black";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontWeight ? [this[extractedKeys.fontWeight]] : [];
  }
}
