import { FontWeightKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class FontWeightTheme extends BaseTheme implements Record<FontWeightKey, string> {
  /** Thin font weight (100) - lightest weight */
  thin: string = "font-thin";
  /** Extra-light font weight (200) - very light */
  extralight: string = "font-extralight";
  /** Light font weight (300) - lighter than normal */
  light: string = "font-light";
  /** Normal font weight (400) - default font weight */
  normal: string = "font-normal";
  /** Medium font weight (500) - slightly bold */
  medium: string = "font-medium";
  /** Semi-bold font weight (600) - moderately bold */
  semibold: string = "font-semibold";
  /** Bold font weight (700) - standard bold */
  bold: string = "font-bold";
  /** Extra-bold font weight (800) - very bold */
  extrabold: string = "font-extrabold";
  /** Black font weight (900) - heaviest weight */
  black: string = "font-black";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontWeight ? [this[extractedKeys.fontWeight]] : [];
  }
}
