import { TextTransformKey, TEXT_TRANSFORM_KEYS } from "../../props/keys";
import { textTransformClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class TextTransformTheme extends BaseTheme {
  constructor(private classes: Record<TextTransformKey, string> = textTransformClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, TEXT_TRANSFORM_KEYS);
    return [key ? this.classes[key] : '']; // No default for text transform
  }
}