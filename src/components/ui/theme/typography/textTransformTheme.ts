import { TextTransformKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextTransformTheme extends BaseTheme implements Record<TextTransformKey, string> {
  uppercase: string = "uppercase";
  lowercase: string = "lowercase";
  capitalize: string = "capitalize";
  normalCase: string = "normal-case";

  constructor(initial?: Partial<Record<TextTransformKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.textTransform.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textTransform ? this[extractedKeys.textTransform] : ''];
  }
}
