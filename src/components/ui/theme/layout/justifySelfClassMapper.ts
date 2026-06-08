import { JustifySelfKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class JustifySelfClassMapper extends BaseClassMapper implements Record<JustifySelfKey, string> {
  /** Use the parent's justify-items value */
  justifySelfAuto: string = "justify-self-auto";
  /** Align this item to the start of the inline axis */
  justifySelfStart: string = "justify-self-start";
  /** Align this item to the end of the inline axis */
  justifySelfEnd: string = "justify-self-end";
  /** Center this item on the inline axis */
  justifySelfCenter: string = "justify-self-center";
  /** Stretch this item to fill the inline axis */
  justifySelfStretch: string = "justify-self-stretch";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.justifySelf && this[extractedKeys.justifySelf] ? this[extractedKeys.justifySelf] : ''];
  }
}
