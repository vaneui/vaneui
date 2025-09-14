import {
  FlexDirectionKey,
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class DirectionTheme extends BaseTheme implements Record<FlexDirectionKey, string> {
  /** Horizontal flex direction - items flow left to right */
  row: string = "flex-row";
  /** Vertical flex direction - items flow top to bottom */
  column: string = "flex-col";
  /** Reversed horizontal flex direction - items flow right to left */
  rowReverse: string = "flex-row-reverse";
  /** Reversed vertical flex direction - items flow bottom to top */
  columnReverse: string = "flex-col-reverse";


  getClasses(extractedKeys: CategoryProps): string[] {
    const direction = extractedKeys?.reverse === 'reverse'
      ? (extractedKeys?.flexDirection === "column" ? "columnReverse"
         : extractedKeys?.flexDirection === "row" ? "rowReverse"
         : extractedKeys?.flexDirection)
      : extractedKeys?.flexDirection;

    return direction ? [this[direction]] : [];
  }
}
