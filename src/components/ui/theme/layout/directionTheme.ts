import {
  FlexDirectionKey,
  ComponentKeys,
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class DirectionTheme extends BaseTheme implements Record<FlexDirectionKey, string> {
  row: string = "flex-row";
  column: string = "flex-col";
  rowReverse: string = "flex-row-reverse";
  columnReverse: string = "flex-col-reverse";

  constructor(initial?: Partial<Record<FlexDirectionKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.flexDirection.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    let direction = extractedKeys?.flexDirection;
    const reverse = extractedKeys?.reverse;

    if (reverse === 'reverse') {
      switch (direction) {
        case "column": direction = "columnReverse"; break;
        case "row": direction = "rowReverse"; break;
        default: break;
      }
    }

    return direction ? [this[direction]] : [];
  }
}
