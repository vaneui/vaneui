import {
  FlexDirectionKey,
  ComponentKeys,
} from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface DirectionTheme extends Record<FlexDirectionKey, string> {
}

export class DirectionTheme extends BaseTheme {
  constructor(initial?: Partial<Record<FlexDirectionKey, string>>) {
    super();
    ComponentKeys.flexDirection.forEach((key) => {
      this[key] = initial?.[key] || {
        row: "flex-row",
        column: "flex-col",
        rowReverse: "flex-row-reverse",
        columnReverse: "flex-col-reverse",
      }[key];
    });
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
