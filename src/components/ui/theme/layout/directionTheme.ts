import {
  FlexDirectionKey,
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class DirectionTheme extends BaseTheme implements Record<FlexDirectionKey, string> {
  row: string = "flex-row";
  column: string = "flex-col";
  rowReverse: string = "flex-row-reverse";
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
