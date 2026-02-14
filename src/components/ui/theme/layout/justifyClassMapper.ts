import { JustifyKey } from "../../props";
import { BaseClassMapper } from "../common";
import type { CategoryProps } from "../../props";

export class JustifyClassMapper extends BaseClassMapper implements Record<JustifyKey, string> {
  /** Pack flex items toward the start of the main axis */
  justifyStart: string = "justify-start";
  /** Pack flex items toward the end of the main axis */
  justifyEnd: string = "justify-end";
  /** Pack flex items around the center of the main axis */
  justifyCenter: string = "justify-center";
  /** Distribute flex items with equal space between them */
  justifyBetween: string = "justify-between";
  /** Distribute flex items with equal space around them */
  justifyAround: string = "justify-around";
  /** Distribute flex items with equal space around them, including edges */
  justifyEvenly: string = "justify-evenly";
  /** Stretch flex items to fill the main axis */
  justifyStretch: string = "justify-stretch";
  /** Align flex items along their baseline on the main axis */
  justifyBaseline: string = "justify-baseline";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.justify ? this[extractedKeys.justify] : ''];
  }
}
