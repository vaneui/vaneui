import { AlignSelfKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class AlignSelfClassMapper extends BaseClassMapper implements Record<AlignSelfKey, string> {
  /** Use the parent's align-items value */
  alignSelfAuto: string = "self-auto";
  /** Align this item to the start of the cross axis */
  alignSelfStart: string = "self-start";
  /** Align this item to the end of the cross axis */
  alignSelfEnd: string = "self-end";
  /** Center this item on the cross axis */
  alignSelfCenter: string = "self-center";
  /** Stretch this item to fill the cross axis */
  alignSelfStretch: string = "self-stretch";
  /** Align this item to its baseline */
  alignSelfBaseline: string = "self-baseline";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.alignSelf && this[extractedKeys.alignSelf] ? this[extractedKeys.alignSelf] : ''];
  }
}
