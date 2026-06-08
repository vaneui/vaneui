import { AlignSelfKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class AlignSelfClassMapper extends BaseClassMapper implements Record<AlignSelfKey, string> {
  /** Use the parent's align-items value */
  selfAuto: string = "self-auto";
  /** Align this item to the start of the cross axis */
  selfStart: string = "self-start";
  /** Align this item to the end of the cross axis */
  selfEnd: string = "self-end";
  /** Center this item on the cross axis */
  selfCenter: string = "self-center";
  /** Stretch this item to fill the cross axis */
  selfStretch: string = "self-stretch";
  /** Align this item to its baseline */
  selfBaseline: string = "self-baseline";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.alignSelf && this[extractedKeys.alignSelf] ? this[extractedKeys.alignSelf] : ''];
  }
}
