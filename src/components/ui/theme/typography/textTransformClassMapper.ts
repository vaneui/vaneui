import { TextTransformKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class TextTransformClassMapper extends BaseClassMapper implements Record<TextTransformKey, string> {
  /** Transform text to UPPERCASE */
  uppercase: string = "uppercase";
  /** Transform text to lowercase */
  lowercase: string = "lowercase";
  /** Capitalize First Letter Of Each Word */
  capitalize: string = "capitalize";
  /** Normal case - no text transformation */
  normalCase: string = "normal-case";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textTransform ? this[extractedKeys.textTransform] : ''];
  }
}
