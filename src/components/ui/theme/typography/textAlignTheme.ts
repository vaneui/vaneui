import { TextAlignKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextAlignTheme extends BaseTheme implements Record<TextAlignKey, string> {
  textLeft: string = "text-left";
  textCenter: string = "text-center";
  textRight: string = "text-right";
  textJustify: string = "text-justify";

  constructor(initial?: Partial<Record<TextAlignKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.textAlign.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.textAlign;
    return [key ? this[key] : '']; // No default for text align
  }
}
