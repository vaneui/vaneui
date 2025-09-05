import { FontWeightKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class FontWeightTheme extends BaseTheme implements Record<FontWeightKey, string> {
  thin: string = "font-thin";
  extralight: string = "font-extralight";
  light: string = "font-light";
  normal: string = "font-normal";
  medium: string = "font-medium";
  semibold: string = "font-semibold";
  bold: string = "font-bold";
  extrabold: string = "font-extrabold";
  black: string = "font-black";

  constructor(initial?: Partial<Record<FontWeightKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.fontWeight.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontWeight ? [this[extractedKeys.fontWeight]] : [];
  }
}
